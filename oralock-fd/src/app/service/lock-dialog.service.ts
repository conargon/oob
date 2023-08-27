import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LockDialogComponent } from '../components/lock-dialog/lock-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LockDialogService {
  dialogRef!: MatDialogRef<LockDialogComponent>;  

  constructor(private dialog: MatDialog) { }
  
  public open(options:any) {
    this.dialogRef = this.dialog.open(LockDialogComponent, {    
         data: {
          objectName: options.objectName,
         }
    });
  }
  public confirmed(): Observable<any> {    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}