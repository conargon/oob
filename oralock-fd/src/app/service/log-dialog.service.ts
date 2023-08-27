import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LogDialogComponent } from '../components/log-dialog/log-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LogDialogService {
  constructor(private dialog: MatDialog) { }
  dialogRef!: MatDialogRef<LogDialogComponent>;
  
  public open(options:any) {
    this.dialogRef = this.dialog.open(LogDialogComponent, {    
         data: {
          owner: options.owner,
          type: options.type,
          name: options.name
        },          
        width: '1200px',
        maxWidth: '100vw',
      }
    );
  }
  public confirmed(): Observable<any> {    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}