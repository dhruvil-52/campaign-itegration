import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ViewLeadDetailsComponent } from './view-lead-details/view-lead-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit, OnDestroy {
  formId: any;
  leads: any = [];
  loggedInUserDetails: any = {};
  formData: any = {};
  displayedColumns: string[] = [
    'CreatedDate',
    'PageName',
    'FormName',
    'CompanyMetaFormName',
    'LeadId',
    'LeadNumber',
    'ClientName',
    'ClientContact',
    'ClientEmail',
    'Success',
    'IsReturned',
    'IsCompleted',
    'Response',
    'Details',
  ];

  constructor(
    private route: ActivatedRoute,
    private cs: ControllerService,
    public dialog: MatDialog,
    private userService: UserService) {
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
    this.cs.getAllLeadsByFormId(this.formId, this.loggedInUserDetails).then((response: any) => {
      console.log("Pages", JSON.stringify(response.Data));
      if (response.Data && response.Data.length) {
        console.log(response.Data);
        this.leads = response.Data
        console.log("Pages", this.leads);
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

  ngOnDestroy(): void {
    localStorage.removeItem(this.formId)
  }

}
