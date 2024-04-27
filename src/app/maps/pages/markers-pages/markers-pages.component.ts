import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker }  from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../../environments/environments';


// En una APP real, las interfaces deberian estar en archivos independientes
// dentro de su carpeta correspondiente a interfaces
interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-pages.component.html',
  styleUrl: './markers-pages.component.css'
})
export class MarkersPagesComponent {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-58.41138795901065, -34.59127494259238);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'Elemento no enocntrado'

    this.map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Marcos Becerra';

    // const marker2 = new Marker({
    //   element: markerHtml
    // })
    // // const marker = new Marker()
    //   .setLngLat( this.currentLngLat).addTo(this.map)
    // }

  }

  createMarker() {

    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();

    this.addMarker( lgnLat, color );
  }


  addMarker( lngLat: LngLat, color: string = 'orange') {

    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat( lngLat )
    .addTo( this.map )

    this.markers.push( { color, marker} );
    this.saveToLocalStorage()

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1);
  }

  flyTo( marker: Marker ){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem( 'plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem( 'plainMarkers' )?? '[]';
    const plainMarkers = JSON.parse( plainMarkersString ); //! OJO con definir el tipo, POTENCIALMENTE INSEGURO

    plainMarkers.forEach( ({ lngLat, color }: PlainMarker ) => {
      const [lng, lat ] = lngLat;
      const coords = new LngLat(lng, lat)

      this.addMarker(coords, color);
    });
  }
}
