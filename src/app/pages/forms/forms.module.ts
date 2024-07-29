import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms/forms.component';

import { AddFormComponent } from './add-form/add-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ViewFormDetailsComponent } from './view-form-details/view-form-details.component';


@NgModule({
  declarations: [
    FormsComponent,
    AddFormComponent,
    ViewFormDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class LeadFormsModule { }
