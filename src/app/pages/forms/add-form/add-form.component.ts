import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  pages: any[] = [];
  forms: any[] = [];
  campaigns: any[] = [];
  users: any[] = [];
  projects: any[] = [];
  isEditMode: boolean = false;
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
      },
      {
        "CRMKey": "campaign",
        "CRMLabel": "Buildesk Campaign",
        "FBKey": "",
        "FBLabel": "",
        "Type": "campaign"
      },
      {
        "CRMKey": "project",
        "CRMLabel": "Buildesk Project",
        "FBKey": "",
        "FBLabel": "",
        "Type": "project"
      },
      {
        "CRMKey": "remark",
        "CRMLabel": "Remark",
        "FBKey": "",
        "FBLabel": "",
        "Type": "remark"
      },
      {
        "CRMKey": "user",
        "CRMLabel": "Buildesk User",
        "FBKey": "",
        "FBLabel": "",
        "Type": "user"
      }
    ]
  };
  questions: any = [];
  loggedInUserDetails: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: ControllerService,
    private ts: ToastrService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    if (!!this.data) {
      this.isEditMode = true;
      this.cs.getAllLeadsByFormId(this.data).then((res: any) => {
        this.formData = res.Data;
      })
      console.log(this.formData);
    } else {
      this.isEditMode = false;
    }
    if (!!this.userService.user) {
      this.loggedInUserDetails = this.userService.user;
      console.log('loggedInUserDetails', JSON.stringify(this.loggedInUserDetails));
      this.getAllPages();
      this.getAllCampaigns();
      this.getAllUsers();
      this.getAllProjects();
    }
  }

  getAllCampaigns() {
    this.cs.getAllCampaigns().then((response: any) => {
      this.campaigns = response.Data;
      console.log("campaigns", JSON.stringify(this.campaigns));
    }).catch((e) => {
      console.log("Error while getting Pages", e)
    })
  }

  getAllUsers() {
    this.cs.getAllUsers().then((response: any) => {
      this.users = response;
      console.log("users", JSON.stringify(this.users));
    }).catch((e) => {
      console.log("Error while getting Pages", e)
    })
  }

  getAllProjects() {
    this.cs.getAllProjects().then((response: any) => {
      this.projects = response.Data;
      console.log("projects", JSON.stringify(this.projects));
    }).catch((e) => {
      console.log("Error while getting Pages", e)
    })
  }

  getAllPages() {
    this.cs.getAllPages().then((response: any) => {
      this.pages = response.Data;
      console.log("Pages", JSON.stringify(this.pages));
    }).catch((e) => {
      console.log("Error while getting Pages", e)
    })
  }

  reloadPages() {
    this.cs.fetchAllPages().then((response: any) => {
      this.getAllPages();
    }).catch((e) => {
      console.log("Error while fetching Pages", e)
    })
  }

  reloadForms() {
    this.cs.fetchAllForms(this.formData.Page).then((response: any) => {
      this.cs.getAllFormsByPageId(this.formData.Page).then((response: any) => {
        this.forms = response.Data || [];
        console.log("Forms", JSON.stringify(this.forms));
      }).catch((e) => {
        console.log("Error while getting Forms By Page Id", e)
      })
    }).catch((e) => {
      console.log("Error while fetching form", e)
    })
  }

  onPageChange() {
    this.forms = [];
    this.formData.Form = null;
    console.log(this.formData.Page)
    this.cs.subscribePage(this.formData.Page).then((response: any) => {
      console.log("subscribe page", JSON.stringify(response));
    }).catch((e) => {
      console.log("Error while getting Forms By Page Id", e)
    })

    this.cs.getAllFormsByPageId(this.formData.Page).then((response: any) => {
      this.forms = response.Data;
      console.log("Forms", JSON.stringify(this.forms));

      if (!this.forms?.length) {
        this.reloadForms();
      }
    }).catch((e) => {
      console.log("Error while getting Forms By Page Id", e)
    })
  }

  onFormChange() {
    console.log(this.formData.Form)
    this.cs.getFormDataByFormId(this.formData.Form, this.formData.Page).then((response: any) => {
      this.questions = response.Data;
      console.log("Form Data", JSON.stringify(this.questions));
    }).catch((e) => {
      console.log("Error while getting Form Details By form Id", e)
    })
  }

  onFieldSelected(event: any, field: any) {
    field.FBKey = "";
    field.FBLabel = "";
    if (!!event && Object.keys(event).length) {
      let data = JSON.parse(JSON.stringify(event));
      field.FBKey = data.key;
      field.FBLabel = data.label;
    }
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
    } else if (this.checkRequiredQuestionFieldsAreEmpty()) {
      this.ts.error("Please Fill required Form fields");
    } else {
      console.log(JSON.stringify(this.formData))
      let data: any = JSON.parse(JSON.stringify(this.formData));
      data.PageId = data.Page.Id
      data.FormId = data.Form.Id
      data.campaignId = data.questions.find((res: any) => res.campaignId)?.campaignId || null;
      data.projectId = data.questions.find((res: any) => res.projectId)?.projectId || null;
      delete data.Page;
      delete data.Form;
      console.log(JSON.stringify(data))
      if (!this.isEditMode) {
        this.cs.addFromData(data).then((data) => {
          this.ts.success(`Successfully LedGen Form Data Submitted`, 'Success')
          this.dialogRef.close({ data: this.formData });
        }, (error) => {
          this.ts.error(`Error while Submitting LedGen Form Data`, 'Error')
        })
      } else {
        this.cs.updateFromData(data).then((data) => {
          this.ts.success(`Successfully LedGen Form Data Updated`, 'Success')
          this.dialogRef.close({ data: this.formData });
        }, (error) => {
          this.ts.error(`Error while Submitting LedGen Form Data`, 'Error')
        })
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
