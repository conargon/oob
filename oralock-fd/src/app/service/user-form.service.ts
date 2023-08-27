import { Injectable } from '@angular/core';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  dialogRef!: MatDialogRef<UserFormComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options:any) {
    this.dialogRef = this.dialog.open(UserFormComponent, {    
         data: {
          user: options.user,
          new: options.new,
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
