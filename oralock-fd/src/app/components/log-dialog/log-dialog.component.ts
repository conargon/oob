import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ObjectLog, User } from "../../models"
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-log-dialog',
  templateUrl: './log-dialog.component.html',
  styleUrls: ['./log-dialog.component.css']
})
export class LogDialogComponent {

  currentUser!: User;

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data: {
    objectLog: ObjectLog
  },
    private mdDialogRef: MatDialogRef<LogDialogComponent>) {
    mdDialogRef.disableClose = true;
    this.store.select(state => state.user.user).subscribe(res => {
      this.currentUser = res;
    });
  }

  closeDialog() {
    this.mdDialogRef.close();
  }

  close() {
    this.closeDialog();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.closeDialog();
  }

}
