import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { UserService } from 'src/app/shared/services/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private cs: ControllerService,
    private datePipe: DatePipe,
    private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.formId = + data['id'];
    })
    if (localStorage.getItem('selectedForm')) {
      let data: any = localStorage.getItem('selectedForm');
      this.formData = JSON.parse(data);
    }
    if (this.formId) {
      if (!!this.userService.user) {
        this.loggedInUserDetails = this.userService.user;
        this.getPagesOfForm();
      }
    }
  }

  isDateString(value: any) {
    return !isNaN(Date.parse(value));
  }

  displayedColumns: string[] = [
    'CreatedDate',
    'PageName',
    'FormName',
    'LeadId',
    'LeadNumber',
    'ClientName',
    'ClientContact',
    'ClientEmail',
    'Success',
    'IsReturned',
    'Response',
    'RawContent',
  ];


  getPagesOfForm() {
    this.cs.getAllLeadsByFormId1(this.formId, this.loggedInUserDetails).then((response: any) => {
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

  ngOnDestroy(): void {
    localStorage.removeItem('selectedForm')
  }

}
