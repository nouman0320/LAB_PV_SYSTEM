import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.css']
})
export class MapPanelComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map // map reference for later

  // DEFAULT LAT LON OF CITY Los Angeles if no param is given
  Lat: number = 34.0482809;
  Lon: number = -118.2437;
  Zoom: number = 12;


  // markers on the map
  mapMarkers: any = [];

  constructor() { }

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
  }

  createMarkers(){
    var blue_marker = new google.maps.Marker({
      position: {lat: 34.0482809, lng: -118.2437},
      icon:'assets/icons/blue_star.png',
      map: this.map,
      title: 'markers'
    });

    var red_marker = new google.maps.Marker({
      position: {lat: 34.0559814, lng: -118.2996067},
      icon:{
        url: 'assets/icons/red_star.png',
        anchor: new google.maps.Point(20, 20)
      },
      map: this.map,
      title: 'markers'
    });

    var red_triangle_marker = new google.maps.Marker({
      position: {lat: 34.0339814, lng: -118.2196067},
      icon:{
        url: 'assets/icons/red_triangle.png',
        anchor: new google.maps.Point(20, 20)
      },
      map: this.map,
      title: 'markers'
    });

    var blue_triangle_marker = new google.maps.Marker({
      position: {lat: 34.0319814, lng: -118.2396067},
      icon:'assets/icons/blue_triangle.png',
      map: this.map,
      title: 'markers'
    });


    var rectangle_marker = new google.maps.Marker({
      position: {lat: 34.0369814, lng: -118.2896067},
      icon:'assets/icons/rectangle.png',
      map: this.map,
      title: 'markers'
    });

    // line
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      strokeColor: '#700',
      fillColor: '#700',
      scale: 2
    };

    var line = new google.maps.Polyline({
      path: [{lat: 34.0339814, lng: -118.2196067}, {lat: 34.0559814, lng: -118.2996067}],
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
  }

}
