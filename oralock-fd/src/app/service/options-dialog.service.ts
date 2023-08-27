import { Injectable } from '@angular/core';
import { OptionsDialogComponent } from '../components/options-dialog/options-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class OptionsDialogService {

  dialogRef!: MatDialogRef<OptionsDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public open() {
    this.dialogRef = this.dialog.open(OptionsDialogComponent);
  }

}
