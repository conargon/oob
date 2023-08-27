import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string,
    confirmAction: boolean
  }, 
  
  private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) { 
    mdDialogRef.disableClose = true;
  }

  public cancel() {
    this.close(false);
  }

  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }
  
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

}

