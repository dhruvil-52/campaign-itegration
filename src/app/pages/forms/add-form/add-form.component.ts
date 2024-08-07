import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  pages: any[] = [];
  forms: any[] = [];
  formData: any = {};
  loggedInUserDetails: any = {};
  requiredFields: any = [
    { RequiredField: "First Name*" },
    { RequiredField: "Last Name" },
    { RequiredField: "Phone*" },
    { RequiredField: "Email" }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    private cs: ControllerService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('loggedInUserDetails')) {
      let data: any = localStorage.getItem('loggedInUserDetails');
      this.loggedInUserDetails = JSON.parse(data);
      console.log("loggedInUserDetails", JSON.stringify(this.loggedInUserDetails));
      this.cs.getAllPages(this.loggedInUserDetails).then((response: any) => {
        this.pages = response.data;
        console.log("Pages", JSON.stringify(this.pages));
      }).catch((e) => {
        console.log("Error while getting Pages", e)
      })
    }
  }

  onPageChange() {
    console.log(this.formData.Page)
    this.cs.subscribePage(this.formData.Page).then((response: any) => {
      console.log("subscrib page", JSON.stringify(response));
    }).catch((e) => {
      console.log("Error while getting Forms By Page Id", e)
    })

    this.cs.getAllFormsByPageId(this.formData.Page).then((response: any) => {
      this.forms = response.data;
      console.log("Forms", JSON.stringify(this.forms));
    }).catch((e) => {
      console.log("Error while getting Forms By Page Id", e)
    })
  }

  onFormChange() {
    console.log(this.formData.Form)
    this.cs.getFormDataByFormId(this.formData.Form, this.formData.Page).then((response: any) => {
      this.formData.questions = response.questions;
      console.log("Form Data", JSON.stringify(this.formData));
    }).catch((e) => {
      console.log("Error while getting Form Details By form Id", e)
    })
  }

  onSave(): void {
    console.log(JSON.stringify(this.formData))
    this.dialogRef.close({ data: this.formData });
  }

  onCancel(): void {
    this.dialogRef.close({ data: {} });
  }
}
