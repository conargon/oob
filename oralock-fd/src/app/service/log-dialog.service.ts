import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ObjectLog } from '../models';
import { LogDialogComponent } from '../components/log-dialog/log-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LogDialogService {
  constructor(private dialog: MatDialog) { }
  dialogRef!: MatDialogRef<LogDialogComponent>;
  
  public open(objectLog:ObjectLog) {
    this.dialogRef = this.dialog.open(LogDialogComponent, {    
         data: {
          objectLog: objectLog,
        },          
        width: '800px',
      }
    );
  }

}