import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  formId: any;
  leads: any = [];
  loggedInUserDetails: any = {};
  formData: any = {};
  displayedColumns: any = [];

  constructor(
    private route: ActivatedRoute,
    private cs: ControllerService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      this.formId = + data['id'];
    })
    if (localStorage.getItem('selectedForm')) {
      let data: any = localStorage.getItem('selectedForm');
      this.formData = JSON.parse(data);
    }
    if (this.formId) {
      if (localStorage.getItem('loggedInUserDetails')) {
        let data: any = localStorage.getItem('loggedInUserDetails');
        this.loggedInUserDetails = JSON.parse(data);
        this.loggedInUserDetails.authToken = environment.authToken;
        this.getPagesOfForm();
      }
      this.loggedInUserDetails.authToken = environment.authToken;
      this.getPagesOfForm();
    }
  }

  isDateString(value: any) {
    return !isNaN(Date.parse(value));
  }

  getPagesOfForm() {
    this.cs.getAllLeadsByFormId(this.formId, this.loggedInUserDetails).then((response: any) => {
      console.log("Pages", JSON.stringify(response.data));
      this.leads = response.data.map((item: any) => {
        const result: any = {};
        Object.keys(item).forEach(key => {
          if (key !== 'field_data' && key !== 'id') {
            this.displayedColumns.push(key);
            result[key] = this.isDateString(item[key]) ? this.datePipe.transform(item[key], 'medium') : item[key];
          }
        });
        item.field_data.forEach((field: any) => {
          this.displayedColumns.push(field.name);
          result[field.name] = field.values[0];
        });
        return result;
      });
      console.log("Pages", JSON.stringify(this.leads));
    }).catch((e) => {
      console.log("Error while getting Pages", e)
    })
  }


}
