import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MaterialModule } from './material.module';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TablerIconsModule.pick(TablerIcons),
    MaterialModule,
    NgApexchartsModule
  ],
  exports: [
    TablerIconsModule,
    MaterialModule,
    NgApexchartsModule
  ]
})
export class SharedModule { }
