import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';
import { ViewFormDetailsComponent } from '../view-form-details/view-form-details.component';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DeleteformsComponent } from '../deleteforms/deleteforms.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'Name', 'FacebookFormName', 'PageName', 'CreatedOn', 'Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  forms: any = [];
  totalRecords: number = 0;
  pageNumber = 1;
  pageSize = 50;

  constructor(
    public dialog: MatDialog,
    private cs: ControllerService,
    private ts: ToastrService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.forms.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllForms();
  }

  getAllForms() {
    this.forms = [];
    this.cs.getAllForms(this.pageNumber, this.pageSize).then((data: any) => {
      console.log("all forms", data)
      if (data.Data && data.Data.length) {
        this.forms = data.Data;
        this.totalRecords = data.Count;
        const startIndex = (this.pageNumber - 1) * this.pageSize;
        this.forms = this.forms.map((item: any, index: any) => ({
          ...item,
          index: startIndex + index + 1,
        })) || [];
      } else {
        console.log("No forms found");
      }
    }, (error) => {
      console.log("Error while getting Forms", error)
      this.ts.error(`Error while getting Forms`, 'Error')
    })
  }

  openAddFormModal(element?: any): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '900px',
      data: element ? element : null
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
    localStorage.setItem(data.Id, JSON.stringify(data));
    this.router.navigate(['leadGen-forms/leads', data.Id]);
  }

  openDeleteFormModal(element: any): void {
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

  deleteLeads(id: any) {
    this.cs.deleteFromData(id).then(res => {
      this.ts.success(`Record deleted successfully`, 'Success')
    }, (err) => {
      this.ts.error(`Error while deleting Record`, 'Failed')
    })
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllForms();
  }
}
