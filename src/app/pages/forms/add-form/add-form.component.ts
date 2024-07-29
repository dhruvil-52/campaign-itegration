import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {
  formData: any = {}
  pages: any[] = [];
  forms: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
  ) { }

  onSave(): void {
    this.dialogRef.close({ name: this.formData.name, selectedOption: this.formData.selectedOption });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
