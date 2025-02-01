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
    questions: this.getQuestionDataForForm()
  };

  getQuestionDataForForm() {
    return [
      {
        "CRMKey": "firstname",
        "CRMLabel": "First Name",
        "IsRequired": true,
        "FBKey": null,
        "FBLabel": null
      },
      {
        "CRMKey": "lastname",
        "CRMLabel": "Last Name",
        "FBKey": null,
        "FBLabel": null
      },
      {
        "CRMKey": "mobile",
        "CRMLabel": "Mobile",
        "IsRequired": true,
        "FBKey": null,
        "FBLabel": null
      },
      {
        "CRMKey": "email",
        "CRMLabel": "Email",
        "FBKey": null,
        "FBLabel": null
      },
      {
        "CRMKey": "remark",
        "CRMLabel": "Remark",
        "FBKey": null,
        "FBLabel": null
      }
    ]
  };
  questions: any = [];
  loggedInUserDetails: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private cs: ControllerService,
    private ts: ToastrService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.getLookUpData();
    if (!!this.id) {
      this.isEditMode = true;
      this.cs.getFormDataById(this.id).then((res: any) => {
        if (res.Data) {
          this.formData.name = res.Data.Name;
          this.formData.campaignId = res.Data.CampaignId;
          this.formData.projectId = res.Data.ProjectId;
          this.formData.userId = res.Data.UserId;
          this.setEditData(res.Data)
        } else {
          this.formData = {};
          console.log("Form data not coming by formId")
        }
      })
      console.log(this.formData);
    } else {
      console.log("Id not found");
    }
  }

  getLookUpData() {
    if (!!this.userService.user) {
      this.loggedInUserDetails = this.userService.user;
      console.log('loggedInUserDetails', JSON.stringify(this.loggedInUserDetails));
      if (!this.isEditMode) {
        this.getAllPages();
      }
      this.getAllCampaigns();
      this.getAllUsers();
      this.getAllProjects();
    }
  }

  setEditData(data: any) {
    if (!this.userService.user) return;
    this.loggedInUserDetails = this.userService.user;
    console.log('loggedInUserDetails', JSON.stringify(this.loggedInUserDetails));

    // Fetch all pages
    this.cs.getAllPages().then((response: any) => {
      this.pages = response.Data;
      console.log("Pages", JSON.stringify(this.pages));

      if (!data.PageId) return;
      this.formData.Page = this.pages.find((e) => e.Id === data.PageId) || {};
      this.forms = [];
      this.formData.Form = null;
      console.log(this.formData.Page);

      // Subscribe to the page
      this.cs.subscribePage(this.formData.Page).then((response: any) => {
        console.log("subscribe page", JSON.stringify(response));
      }).catch((e) => {
        console.log("Error while subscribing to page", e);
      });

      // Fetch forms for the page
      this.cs.getAllFormsByPageId(this.formData.Page).then((response: any) => {
        this.forms = response.Data;
        console.log("Forms", JSON.stringify(this.forms));
        if (!this.forms?.length) {
          this.fetchFormsAndProcess(data);
        } else {
          this.processFormData(data);
        }
      }).catch((e) => {
        console.log("Error while getting Forms By Page Id", e);
      });
    }).catch((e) => {
      console.log("Error while getting Pages", e);
    });
  }

  fetchFormsAndProcess(data: any) {
    this.cs.fetchAllForms(this.formData.Page).then(() => {
      this.cs.getAllFormsByPageId(this.formData.Page).then((response: any) => {
        this.forms = response.Data || [];
        this.processFormData(data);
      }).catch((e) => {
        console.log("Error while getting Forms By Page Id", e);
      });
    }).catch((e) => {
      console.log("Error while fetching forms", e);
    });
  }

  processFormData(data: any) {
    if (!data.Form_Id) return;
    this.formData.Form = this.forms.find((e) => e.Id === data.Form_Id) || {};
    this.formData.questions = this.getQuestionDataForForm();
    this.cs.getFormDataByFormId(this.formData.Form, this.formData.Page).then((response: any) => {
      this.questions = response.Data;
      this.formData.questions = data.MetaFormKeyValues;
      console.log("Form Data", JSON.stringify(this.questions));
    }).catch((e) => {
      console.log("Error while getting Form Details By form Id", e);
    });
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
    this.formData.questions = this.getQuestionDataForForm();
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
      delete data.Page;
      delete data.Form;
      console.log(JSON.stringify(data))
      if (!this.isEditMode) {
        this.cs.addFromData(data).then((resp: any) => {
          this.dialogRef.close({ data: this.formData });
          if (resp.Success) {
            this.ts.success(`Successfully Form Data Submitted`, 'Success')
          } else {
            this.ts.error(resp.Message, 'Failed')
          }
        }, (error) => {
          this.ts.error(`Error while Submitting Form Data`, 'Error')
        })
      } else {
        data.Id = this.id;
        this.cs.updateFromData(data).then((resp: any) => {
          this.dialogRef.close({ data: this.formData });
          if (resp.Success) {
            this.ts.success(`Successfully Form Data Updated`, 'Success')
          } else {
            this.ts.error(resp.Message, 'Failed')
          }
        }, (error) => {
          this.ts.error(`Error while Submitting Form Data`, 'Error')
        })
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
