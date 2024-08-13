import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { LeadsComponent } from './leads/leads.component';

const routes: Routes = [
  {
    path: '', component: FormsComponent
  },
  {
    path: 'leads/:id', component: LeadsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
