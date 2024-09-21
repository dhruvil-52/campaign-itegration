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
  displayedColumns: any = [];

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

  getPagesOfForm() {
    this.cs.getAllLeadsByFormId(this.formId, this.loggedInUserDetails).then((response: any) => {
      console.log("Pages", JSON.stringify(response.Data));
      this.leads = response.Data.map((item: any) => {
        const result: any = {};
        Object.keys(item).forEach(key => {
          if (key !== 'field_data' && key !== 'id') {
            console.log(key)
            let isPresent = this.displayedColumns.includes(key);
            if (!isPresent) {
              this.displayedColumns.push(key);
            }
            result[key] = this.isDateString(item[key]) ? this.datePipe.transform(item[key], 'medium') : item[key];
          }
        });
        item.field_data.forEach((field: any) => {
          let isPresent = this.displayedColumns.includes(field.name);
          if (!isPresent) {
            this.displayedColumns.push(field.name);
          }
          result[field.name] = field.values[0];
        });
        return result;
      });
      console.log("Pages", JSON.stringify(this.leads));
    }).catch((e) => {
      console.log("Error while getting Pages", e)
    })
  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedForm')
  }

}
