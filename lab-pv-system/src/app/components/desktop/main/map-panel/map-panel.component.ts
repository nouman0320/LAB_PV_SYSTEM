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

  constructor() { }

  ngOnInit(){}

  ngAfterViewInit() {
    //console.log(this.gmapElement);
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
