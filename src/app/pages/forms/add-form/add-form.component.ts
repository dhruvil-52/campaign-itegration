import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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
    { RequiredField: "Name" },
    { RequiredField: "ClientContact" },
    { RequiredField: "ClientEmail" }
  ];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddFormComponent>) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('loggedInUserDetails')) {
      let data: any = localStorage.getItem('loggedInUserDetails');
      this.loggedInUserDetails = JSON.parse(data);
      console.log("loggedInUserDetails", JSON.stringify(this.loggedInUserDetails));
      this.http.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${this.loggedInUserDetails.authToken}`).subscribe((response: any) => {
        this.pages = response.data;
        console.log("Pages", JSON.stringify(this.pages));
      })
    }
  }

  onPageChange() {
    console.log(this.formData.Page)
    this.http.get(`https://graph.facebook.com/v17.0/${this.formData.Page.id}/leadgen_forms?access_token=${this.formData.Page.access_token}`).subscribe((response: any) => {
      this.forms = response.data;
      console.log("Forms", JSON.stringify(this.forms));
    })
  }

  onFormChange() {
    console.log(this.formData.Form)
    this.http.get(`https://graph.facebook.com/v17.0/${this.formData.Form.id}?access_token=${this.formData.Page.access_token}&fields=questions`).subscribe((response: any) => {
      this.formData.questions = response.questions;
      console.log("Form Data", JSON.stringify(this.formData));
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
