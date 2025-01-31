import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteforms',
  templateUrl: './deleteforms.component.html',
  styleUrls: ['./deleteforms.component.scss']
})
export class DeleteformsComponent implements OnInit {

  id: any;
  fileName: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteformsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.id = this.data.id;
      this.fileName = this.data.fileName || 'this';
    }
  }

  confirmDelete(): void {
    this.dialogRef.close({ id: this.id });
  }

}
