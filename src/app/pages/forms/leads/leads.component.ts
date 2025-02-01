import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ViewLeadDetailsComponent } from './view-lead-details/view-lead-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit, AfterViewInit, OnDestroy {
  formId: any;
  leads: any = [];
  loggedInUserDetails: any = {};
  formData: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalRecords: number = 0;
  pageNumber = 1;
  pageSize = 50;
  displayedColumns: string[] = [
    'position',
    'CreatedDate',
    'PageName',
    'FormName',
    'CompanyMetaFormName',
    'LeadId',
    'LeadNumber',
    'ClientName',
    'ClientContact',
    'ClientEmail',
    'IsReturned',
    'Success',
    'Response',
    'Details',
  ];

  constructor(
    private route: ActivatedRoute,
    private cs: ControllerService,
    public dialog: MatDialog,
    private ts: ToastrService,
    private userService: UserService) {
  }

  ngAfterViewInit() {
    this.leads.paginator = this.paginator;
  }

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.formId = + data['id'];
    })
    if (localStorage.getItem(this.formId)) {
      let data: any = localStorage.getItem(this.formId);
      this.formData = JSON.parse(data);
    }
    if (this.formId) {
      if (!!this.userService.user) {
        this.loggedInUserDetails = this.userService.user;
        this.getPagesOfForm();
      }
    }
  }

  getPagesOfForm() {
    this.cs.getAllLeadsByFormId(this.formId, this.loggedInUserDetails, this.pageNumber, this.pageSize).then((response: any) => {
      console.log("Pages", JSON.stringify(response.Data));
      if (response.Data && response.Data.length) {
        this.leads = response.Data;
        this.totalRecords = response.Count;
        const startIndex = (this.pageNumber - 1) * this.pageSize;
        this.leads = this.leads.map((item: any, index: any) => ({
          ...item,
          index: startIndex + index + 1,
        })) || [];
      } else {
        console.log("No leads found");
      }
    }).catch((e) => {
      console.log("Error while getting Pages", e)
    })
  }

  viewDetails(data: any) {
    const dialogRef = this.dialog.open(ViewLeadDetailsComponent, {
      width: '900px',
      data: data.RawContent ? JSON.parse(data.RawContent) : {}
    });

    dialogRef.afterClosed().subscribe((result: any) => { });
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPagesOfForm();
  }

  regenerateLead(id: number) {
    this.cs.regenerateLead(id).then(res => {
      this.ts.success(`Lead Regenerated successfully`, 'Success')
    }, (err) => {
      this.ts.error(`Error while regenerating Lead`, 'Failed')
    })
  }

  ngOnDestroy(): void {
    localStorage.removeItem(this.formId)
  }

}
