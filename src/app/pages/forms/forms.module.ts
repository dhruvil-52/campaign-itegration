import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms/forms.component';

import { AddFormComponent } from './add-form/add-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ViewFormDetailsComponent } from './view-form-details/view-form-details.component';
import { LeadsComponent } from './leads/leads.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FormsComponent,
    AddFormComponent,
    ViewFormDetailsComponent,
    LeadsComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    MaterialModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    DatePipe
  ]
})
export class LeadFormsModule { }
