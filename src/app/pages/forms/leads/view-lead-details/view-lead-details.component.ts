import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-lead-details',
  templateUrl: './view-lead-details.component.html',
  styleUrls: ['./view-lead-details.component.scss']
})
export class ViewLeadDetailsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'time', 'changes'];
  leadsDetails = new MatTableDataSource<any>();

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ViewLeadDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data))
    console.log((this.data))
    if (this.data && this.data.entry && this.data.entry.length && this.data.entry[0].time) {
      this.data.entry[0].time = this.datePipe.transform(this.data.entry[0].time, 'medium');
      this.data.entry[0].changes.forEach((change: any) => {
        if (change.value.created_time) {
          change.value.created_time = this.datePipe.transform(change.value.created_time * 1000, 'medium');
        }
      });
    }
  }

  confirmDelete(): void {
    this.dialogRef.close({});
  }
}
