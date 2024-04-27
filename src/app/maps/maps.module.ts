import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPagesComponent } from './pages/markers-pages/markers-pages.component';
import { PropertisPageComponent } from './pages/propertis-page/propertis-page.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPagesComponent,
    PropertisPageComponent,
    ZoomRangeComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,
    SideMenuComponent
  ]
})
export class MapsModule { }
