import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map }  from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {


  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?: [number, number];

  ngAfterViewInit(): void {

    if ( !this.divMap?.nativeElement) throw "Map div not found"
    if ( !this.lngLat ) throw "lngLat can't be null";

    const map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false
    });
  }



}
