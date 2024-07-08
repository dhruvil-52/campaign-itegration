import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TablerIconsModule.pick(TablerIcons),
    MaterialModule
  ],
  exports: [
    TablerIconsModule,
    MaterialModule
  ]
})
export class SharedModule { }
