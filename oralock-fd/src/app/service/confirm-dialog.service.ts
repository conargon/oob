import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private translate: TranslateService, private dialog: MatDialog) { }
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;
  
  public open(options:any) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {    
         data: {
           title: options.title,
           message: options.message,
           cancelText: options.cancelText,
           confirmText: options.confirmText,
           confirmAction: options.confirmAction
         }
    });
  }

  public showMessage(title: string, msg: string) {
    const options = {
      title: title,
      message: msg,
      confirmText: this.translate.instant('ok'),
      confirmAction: false,
    };      
    this.open(options);  
  }

  public showError(msg: string) {
    this.showMessage(this.translate.instant('error'), msg);
  }

  public confirmed(): Observable<any> {    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}