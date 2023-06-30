import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration/integration.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IntegrationComponent
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule,
    SharedModule
  ]
})
export class IntegrationModule { }
