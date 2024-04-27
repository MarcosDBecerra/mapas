import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, MapLayerEventType }  from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../../environments/environments';

@Component({
  templateUrl: './zoom-range.component.html',
  styleUrl: './zoom-range.component.css'
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
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

    this.mapListeners();
  }

  mapListeners(): void{

    if ( !this.map ) throw 'Mapa no inicializado'

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    })

  }


  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {

    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom)

  }

}
