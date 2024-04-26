import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map }  from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

//(mapboxgl as any).accessToken = 'pk.eyJ1IjoibWFyY29zbWRiIiwiYSI6ImNsdmJuOHBtZzA0aXoybG9hejJnN3g1azIifQ.7APxH99ChgluvdEA6TW7SQ';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'Elemento no enocntrado'

    const map = new Map({
      accessToken: 'pk.eyJ1IjoibWFyY29zbWRiIiwiYSI6ImNsdmJuOHBtZzA0aXoybG9hejJnN3g1azIifQ.7APxH99ChgluvdEA6TW7SQ',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-50.5, -30], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }



}
