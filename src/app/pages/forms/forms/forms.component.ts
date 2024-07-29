import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  displayedColumns: string[] = ['Name', 'CreatedOn'];
  dataSource = [
  ];

  constructor(public dialog: MatDialog) { }

  openAddFormModal(): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
