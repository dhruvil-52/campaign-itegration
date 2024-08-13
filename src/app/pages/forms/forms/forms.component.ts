import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';
import { ViewFormDetailsComponent } from '../view-form-details/view-form-details.component';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'PageName', 'CreatedOn'];
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

  openAddFormModal(): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '900px',
      data: {}
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

  openLeadPage(data: any) {
    console.log(data)
    localStorage.setItem('selectedForm', JSON.stringify(data));
    this.router.navigate(['leadGen-forms/leads', data.FormRefId]);
  }
}
