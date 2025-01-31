import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';
import { ViewFormDetailsComponent } from '../view-form-details/view-form-details.component';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DeleteformsComponent } from '../deleteforms/deleteforms.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'FacebookFormName', 'PageName', 'CreatedOn', 'Action'];
  forms = [
  ];

  constructor(
    public dialog: MatDialog,
    private cs: ControllerService,
    private ts: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllForms();
  }

  getAllForms() {
    console.log("28");
    this.forms = [];
    this.cs.getAllForms().then((data: any) => {
      console.log("all forms", data)
      this.forms = data;
    }, (error) => {
      console.log("Error while getting Forms", error)
      this.ts.error(`Error while getting Forms`, 'Error')
    })
  }

  openAddFormModal(element?: any): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '900px',
      data: element ? element  : null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', JSON.stringify(result));
      if (result && result.data) {
        this.getAllForms();
      }
    });
  }

  openViewFormDetailsModal(): void {
    const dialogRef = this.dialog.open(ViewFormDetailsComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  viewLeads(data: any) {
    console.log(data)
    localStorage.setItem('selectedForm', JSON.stringify(data));
    this.router.navigate(['leadGen-forms/leads', data.Id]);
  }

  openDeleteFormModal(element:any): void {
    const dialogRef = this.dialog.open(DeleteformsComponent, {
      width: '400px',
      data: { id: element.Id, fileName: element.Name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLeads(result.id);
      }
    });
  }

  deleteLeads(id:any) {
    this.cs.deleteFromData(id).then(res =>{
      this.ts.success(`Deleted Successfully`, 'Success')
    })
  }
}
