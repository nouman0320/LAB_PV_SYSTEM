import { Component, OnInit } from '@angular/core';
import { ViewChild, TemplateRef, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LabMachineInfo } from 'src/app/models/lab-machine-info';
import { PVInfo } from 'src/app/models/model.pv-info';
import { EGCR_Info } from 'src/app/models/model.egcr-info';
import { DataService } from 'src/app/serrvices/data.service';


@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.css']
})
export class MapPanelComponent implements OnInit {

  
  @Input() isMobile: Boolean = false;


  @ViewChild('optionTemplate') optionTemplate: any; // for option modal
  @ViewChild('infoTemplate') infoTemplate: any; // for info modal
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map // map reference for later

  // DEFAULT LAT LON OF CITY Los Angeles if no param is given
  Lat: number = 34.0482809;
  Lon: number = -118.2437;
  Zoom: number = 12;

  //

  pollTime: number = 10; // time in seconds to sync with db


  // Data Arrays
  labMachineInfo: LabMachineInfo [] = [];
  pvInfo: PVInfo [] = [];
  egcrInfo: EGCR_Info[] = [];

  // markers on the map
  labMachineInfoMarkers: google.maps.Marker [] = [];
  pvInfoMarkers: google.maps.Marker [] = [];
  egcrInfoMarkers: google.maps.Marker [] = [];

  // from pv to labs arrows --->
  arrowPolylines: google.maps.Polyline [] = [];

  // location circle for mobile
  locationCircle: google.maps.Circle;

  //

  modalRef: BsModalRef;


  constructor(private modalService: BsModalService, public route: ActivatedRoute, public dataService: DataService) {

    //getting lat, lon and zoom from parameters if present
    this.route.params.subscribe(params => {
      if(params['lat']){
        if(params['lon']){
          this.Lat = Number(params['lat']);
          this.Lon = Number(params['lon']);
          //console.log(this.lat);
        }
        if(params['zoom']){
          this.Zoom = Number(params['zoom']);
          //console.log("zoom: "+this.Zoom);
        } 
      }
    });
  }

  ngOnInit(){}

  ngAfterViewInit() {
    //console.log(this.gmapElement);
    

    var mapProp = {
      center: new google.maps.LatLng(this.Lat, this.Lon),
      zoom: this.Zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
    this.createMarkers();


    // getting data from webService
    this.getData();
    this.dataPoll();
  }

  dataPoll(){
    //console.log("pv assign: "+this.dataService.pvAssignInProgress);
    
    if(!this.dataService.pvAssignInProgress){
      this.getData();
    }
    setTimeout(this.dataPoll.bind(this), this.pollTime*1000);
  }

  clearData(){
    this.labMachineInfo = [];
    this.pvInfo = [];
    this.egcrInfo = [];
    this.refreshMarkers();
  }

  getData(){

    this.clearData();

    //in this method we'll get data from webService from database but now I'm hard coding it for testing

    // adding to labMachineInfo Array

    /*
    this.labMachineInfo.push(new LabMachineInfo(6548265, 34.0507194, -118.2688471, "Los Angeles", "1331", "W", "7", "", "12", "1st", 0, 0, 0, 0, 0));
    this.labMachineInfo.push(new LabMachineInfo(6548266, 34.0575725, -118.2659292, "Los Angeles", "430", "S-Grand", "7", "", "142", "2nd", 1, 0, 0, 0, 0));
    this.labMachineInfo.push(new LabMachineInfo(6548267, 34.0485144, -118.2696499, "Los Angeles", "214", "Albany", "7", "", "10", "Ground", 1, 1, 1, 0, 0));
    this.labMachineInfo.push(new LabMachineInfo(6548268, 34.0444611, -118.2636114, "Los Angeles", "245", "Fifth Area", "7", "", "12", "4th", 1, 0, 1, 1, 0));*/

    this.dataService.getLabInfo().subscribe(
      data=>{
        const tempLab = data.data;
        this.dataService.getMachineInfo().subscribe(
          d => {
            const tempMachine = d.data;
            tempLab.forEach(lab => {
              tempMachine.forEach(machine => {
                //console.log(machine);
                if(lab.lab_id == machine.lab_id){
                  this.labMachineInfo.push(new LabMachineInfo(lab.lab_id, lab.lat, lab.lon, lab.city, lab.area, lab.phase, lab.st, lab.s_st, lab.building, lab.floor, machine.pr1, machine.pr2, machine.dr1, machine.dr2, machine.ss));
                  //console.log("found_labmachine");
                  this.refreshMarkers();
                }
              });
            });

          }
        );
      },
      err=>{
        console.log(err);
      },
      ()=>{

      }
    );


    // adding to pvInfo array 
    /*
    this.pvInfo.push(new PVInfo(90, 34.0494611, -118.2636114, 0, "CCR"));
    this.pvInfo.push(new PVInfo(91, 34.0359263, -118.2479044, 0, "CCR"));
    this.pvInfo.push(new PVInfo(92, 33.9903218, -118.2764002, 6548266, "Self"));*/

    this.dataService.getPvInfo().subscribe(
      data=>{
        const pvs = data.data;
        pvs.forEach(pv => {
          this.pvInfo.push(new PVInfo(pv.pv_id, pv.lat, pv.lon, pv.lab_id, pv.lab_order));
          this.refreshMarkers();
        });
      },
      err=>{
        console.log(err);
      }
    );
    

    // adding to egcrInfo array
    /*
    this.egcrInfo.push(new EGCR_Info(50, 34.0367087, -118.163447));
    */

    this.dataService.getEgcrInfo().subscribe(
      data=>{
        const egcrs = data.data;

        egcrs.forEach(egcr => {
          this.egcrInfo.push(new EGCR_Info(egcr.egcr_id, egcr.lat, egcr.lon));
          this.refreshMarkers();
        });
      }, err=>{

      }
    );


    if(this.dataService.infoPresent){

      this.labMachineInfo.forEach((lm)=>{
        if(this.dataService.selectedLabMachine != null && lm.LAB_ID == this.dataService.selectedLabMachine.LAB_ID){
          this.dataService.selectedLabMachine = lm;
        }
      });

      this.pvInfo.forEach((pv)=>{
        if(this.dataService.selectedPv != null && pv.PV_ID == this.dataService.selectedPv.PV_ID){
          this.dataService.selectedPv = pv;
        }
      });

    }

  }


  createArrowPolylines(originLat: Number, originLon: Number, desLat: Number, desLon: Number){
    // line
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      strokeColor: '#700',
      fillColor: '#700',
      scale: 2
    };

    var line = new google.maps.Polyline({
      path: [{lat: originLat.valueOf(), lng: originLon.valueOf()}, {lat: desLat.valueOf(), lng: desLon.valueOf()}],
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '8px',
      }, {
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: "red",
          anchor: new google.maps.Point(0, -5),
          fillOpacity: 1,
          strokeOpacity: 1,
        }
      }],
      map: this.map
    });

    this.arrowPolylines.push(line);
  }


  createLabMachineInfoMarkers(){
    this.labMachineInfo.forEach((record)=>{
      var assigned = false;
      if(record.PR1 == 1 || record.PR2 == 1 || record.DR1 == 1 || record.DR2 == 1 || record.SS == 1){
        assigned = true;
      }


      var iconCfg;
      if(assigned){
        // creating red star
        iconCfg = {
          url: 'assets/icons/red_star.png',
          anchor: new google.maps.Point(20, 20)
        };
      } else {
        // creating blue star
        iconCfg = {
          url: 'assets/icons/blue_star.png',
          anchor: new google.maps.Point(20, 20)
        };
      }


      var newCreatedMarker = new google.maps.Marker({
        position: {lat: record.Lat.valueOf(), lng: record.Lon.valueOf()},
        icon: iconCfg,
        cursor: 'help',
        map: this.map,
        title: record.LAB_ID.toString()
      });

      /*
      // adding right click if it's desktop
      if(!this.isMobile){
        newCreatedMarker.addListener('rightclick', (ev)=> {
          this.openModal(this.optionTemplate);
          ev.stop();
        });
      }
      */
      
      newCreatedMarker.addListener('click', (ev)=> {

        if(this.dataService.pvAssignInProgress){
          this.assignPvToLab(this.dataService.pvAssignId, parseInt(newCreatedMarker.getTitle().toString()), "CCR");
          return;
        }
      
        var labMachineId = parseInt(newCreatedMarker.getTitle().toString());

        this.labMachineInfo.forEach((checkRec)=>{
          if(checkRec.LAB_ID.valueOf() == labMachineId){
            this.dataService.infoPresent = true;
            this.dataService.pvInfo = false;
            this.dataService.labMachineInfo = true;
            this.dataService.selectedLabMachine = checkRec;

            //console.log("found record");
          }
        })

        if(this.isMobile){
          // if it's mobile then showing info in model 
          this.openModal(this.infoTemplate);
        } 
        
        ev.stop();
      });


      this.labMachineInfoMarkers.push(newCreatedMarker);

    });
  }


  createPvInfoMarkers(){

    this.pvInfo.forEach((record)=>{

      var assigned = true;
      if(record.LAB_ID.valueOf() == 0){
        assigned = false;
        //console.log("assigned = false");
      }

      var iconCfg;

      if(assigned){
        // creating red triangle marker
        iconCfg = {
          url: 'assets/icons/red_triangle.png',
          anchor: new google.maps.Point(20, 20)
        };

        // now creating arrow from pv to lab
        this.labMachineInfo.forEach((labMachine)=>{
          if(record.LAB_ID == labMachine.LAB_ID){
            this.createArrowPolylines(record.Lat, record.Lon, labMachine.Lat, labMachine.Lon);
          }
        });

      } else {
        // creating blue triangle marker
        iconCfg = {
          url: 'assets/icons/blue_triangle.png',
          anchor: new google.maps.Point(20, 20)
        };
      }

      var newCreatedMarker = new google.maps.Marker({
        position: {lat: record.Lat.valueOf(), lng: record.Lon.valueOf()},
        icon: iconCfg,
        cursor: 'help',
        map: this.map,
        title: record.PV_ID.toString()
      });

      if(!this.isMobile){
        // for right click if not mobile for options on PV
        newCreatedMarker.addListener('rightclick', (ev)=> {
          this.dataService.pvAssignId = parseInt(newCreatedMarker.getTitle().toString());
          this.openModal(this.optionTemplate);
          ev.stop();
        });
      }

      newCreatedMarker.addListener('click', (ev)=> {

        if(this.dataService.pvAssignInProgress){
          alert("Unabled to select PV due to assignment in progress");
          return;
        }
      
        var pvId = parseInt(newCreatedMarker.getTitle().toString());

        this.pvInfo.forEach((checkRec)=>{
          if(checkRec.PV_ID.valueOf() == pvId){
            this.dataService.infoPresent = true;
            this.dataService.labMachineInfo = false;
            this.dataService.pvInfo = true;
            this.dataService.selectedPv = checkRec;

            //console.log("found record");
          }
        })

        if(this.isMobile){
          // if it's mobile then showing info in model 
          this.openModal(this.infoTemplate);
        } 
        
        ev.stop();
      });


      this.pvInfoMarkers.push(newCreatedMarker);
    });

  }

  createEgcrInfoMarkers(){

    this.egcrInfo.forEach((record)=>{
      var rectangle_marker = new google.maps.Marker({
        position: {lat: record.Lat.valueOf(), lng: record.Lon.valueOf()},
        icon:'assets/icons/rectangle.png',
        map: this.map,
        cursor: 'help',
        title: record.EGCR_ID.toString()
      });
      this.egcrInfoMarkers.push(rectangle_marker);
    })

  }


  createLocationCircle(){
    var locationCircle = new google.maps.Circle({
      strokeColor: "#003399",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#003399",
      fillOpacity: 0.35,
      map: this.map,
      center: {
        lat: this.Lat,
        lng: this.Lon
      },
      radius: 1000 * 0.7
    });
    this.map.fitBounds(locationCircle.getBounds());

    this.locationCircle = locationCircle;

  }

  createMarkers(){

    //this.createLabMachineInfoMarkers();
    //this.createPvInfoMarkers();
    this.createEgcrInfoMarkers();

    if(this.isMobile){
      this.createLocationCircle();
    }
  }


  refreshMarkers(){
    //removing old markers
    this.labMachineInfoMarkers.forEach((e)=>{
      e.setMap(null);
    });

    this.pvInfoMarkers.forEach((e)=>{
      e.setMap(null);
    });

    this.egcrInfoMarkers.forEach((e)=>{
      e.setMap(null);
    });

    this.arrowPolylines.forEach((e)=>{
      e.setMap(null);
    });

    // creating updated ones
    this.createLabMachineInfoMarkers();
    this.createPvInfoMarkers();
    this.createEgcrInfoMarkers();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  onAssignButtonClick(){
    //console.log(this.dataService.pvAssignId);
    this.modalRef.hide();

    this.pvInfo.forEach((e)=>{
      if(e.PV_ID == this.dataService.pvAssignId && e.LAB_ID != 0){
        // already assigned
        //alert("This PV is already assigned");
       // return;
       this.dataService.pvAssignInProgress = true;
      }
      else if(e.PV_ID == this.dataService.pvAssignId){
        this.dataService.pvAssignInProgress = true;
      }
    })
  }


  assignPvToLab(PV_ID: Number, LAB_ID: Number, Mode: String){

    var tempPV;
    var tempLab;

    this.pvInfo.forEach((e)=>{
      if(e.PV_ID == PV_ID){
        e.LAB_ID = LAB_ID;
        e.LAB_order = Mode;
        tempPV = e;
        //console.log(e);

        this.dataService.updatePvInfo({
          pv_id: e.PV_ID,
          lab_order: e.LAB_order,
          lab_id: e.LAB_ID,
          lat: e.Lat,
          lon: e.Lon
        }).subscribe();
      }
    });

    this.labMachineInfo.forEach((e)=>{
      if(e.LAB_ID == LAB_ID){
        tempLab = e;
      }
    });

    this.pvInfoMarkers.forEach((e)=>{
      if(parseInt(e.getTitle().toString()) == PV_ID.valueOf()){
        e.setIcon({
            url: 'assets/icons/red_triangle.png',
            anchor: new google.maps.Point(20, 20)
        });
        this.createArrowPolylines(tempPV.Lat, tempPV.Lon, tempLab.Lat, tempLab.Lon);   
      }
    })



    
    //alert("Assigned");
    this.refreshMarkers();
    this.dataService.pvAssignInProgress = false;
  }



  // method to calculate distance
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  assignLabToMe(lab: LabMachineInfo){
    // now need to get PV from location of the user

    this.pvInfo.forEach((e)=>{
      if(this.getDistanceFromLatLonInKm(e.Lat.valueOf(), e.Lon.valueOf(), this.Lat.valueOf(), this.Lon.valueOf()) < 0.5){
        this.assignPvToLab(e.PV_ID, lab.LAB_ID, "Self");
        this.modalRef.hide();
        return;
      }
    });
  }

}
