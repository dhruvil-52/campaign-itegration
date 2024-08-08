import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  pages: any[] = [];
  forms: any[] = [];
  formData: any = {
    questions: [
      {
        "CRMKey": "firstname",
        "CRMLabel": "First Name",
        "IsRequired": true,
        "FBKey": "",
        "FBLabel": ""
      },
      {
        "CRMKey": "lastname",
        "CRMLabel": "Last Name",
        "FBKey": "",
        "FBLabel": ""
      },
      {
        "CRMKey": "mobile",
        "CRMLabel": "Mobile",
        "IsRequired": true,
        "FBKey": "",
        "FBLabel": ""
      },
      {
        "CRMKey": "email",
        "CRMLabel": "Email",
        "FBKey": "",
        "FBLabel": ""
      }
    ]
  };
  questions: any = [];
  loggedInUserDetails: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    private cs: ControllerService,
    private ts: ToastrService) {
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
      this.questions = response.questions;
      console.log("Form Data", JSON.stringify(this.questions));
    }).catch((e) => {
      console.log("Error while getting Form Details By form Id", e)
    })
  }

  onFieldSelected(event: any, field: any) {
    let data = JSON.parse(JSON.stringify(event.value));
    field.FBKey = data.key
    field.FBLabel = data.label
  }

  checkRequiredQuestionFieldsAreEmpty() {
    return this.formData.questions.some((e: any) => e.IsRequired && !e.FBKey)
  }

  onSave(): void {
    console.log(JSON.stringify(this.formData))
    if (!this.formData.name) {
      this.ts.error("Please Enter Name");
    } else if (!this.formData.Page) {
      this.ts.error("Please select Page");
    } else if (!this.formData.Form) {
      this.ts.error("Please select Form");
    } else if (!this.formData.Form) {
      this.ts.error("Please select Form");
    } else if (this.checkRequiredQuestionFieldsAreEmpty()) {
      this.ts.error("Please Fill required Form fields");
    } else {
      this.cs.addFromData(this.formData).then((data) => {
        this.ts.success(`Successfully LedGen Form Data Submitted`, 'Error')
        this.dialogRef.close({ data: this.formData });
      }, (error) => {
        this.ts.error(`Error while Submitting LedGen Form Data`, 'Error')
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close({ data: {} });
  }
}
