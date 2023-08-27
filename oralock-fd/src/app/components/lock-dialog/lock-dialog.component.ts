import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-lock-dialog',
  templateUrl: './lock-dialog.component.html',
  styleUrls: ['./lock-dialog.component.css']
})
export class LockDialogComponent implements OnInit {

  comment = '';
  ref = '';
  lockForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {
    objectName: string
  }, 
  
  private mdDialogRef: MatDialogRef<LockDialogComponent>) { 
    mdDialogRef.disableClose = true;
  }
  ngOnInit(): void { 
    this.lockForm = new FormGroup({
      ref: new FormControl('', [Validators.maxLength(30)]),
      comment: new FormControl('', [Validators.required, Validators.minLength(15)])
    });
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.lockForm.controls[controlName].hasError(errorName);
  }  

  public cancel() {
    this.close(false);
  }

  public close(value: boolean) {
    this.mdDialogRef.close({confirmed: value, ref: this.ref, comment: this.comment});
  }

  public confirm() {
    // stop here if form is invalid
    if (this.lockForm.invalid) {
        return;
    }    
    this.close(true);
  }
  
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

}

