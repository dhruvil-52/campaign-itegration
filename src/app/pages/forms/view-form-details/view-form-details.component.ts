import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-form-details',
  templateUrl: './view-form-details.component.html',
  styleUrls: ['./view-form-details.component.scss']
})
export class ViewFormDetailsComponent {
  formData: any = {}
  pages: any[] = [];
  forms: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewFormDetailsComponent>,
  ) { }

  onSave(): void {
    this.dialogRef.close({ name: this.formData.name, selectedOption: this.formData.selectedOption });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
