import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Role, User, UserApp, UserFormResult } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  pathApi = environment._APIUrl;
  user!: UserApp;
  currentUser!: User;
  userForm!: FormGroup;
  roles!: Role[];
  isNewUser!: boolean;

  constructor(private store: Store, private http: HttpClient, private translate: TranslateService, private confirmDialogService: ConfirmDialogService,
        private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {
    user: UserApp
    new:boolean,
  },   

  private mdDialogRef: MatDialogRef<UserFormComponent>) { 
    mdDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.store.select(state => state.user.user).subscribe(res => this.currentUser = res);
    this.user = this.data.user;
    this.isNewUser = this.data.new;
    this.getRoles();
    this.userForm = new FormGroup({
      id: new FormControl(this.user.id, [Validators.required, Validators.maxLength(30)]),
      name: new FormControl(this.user.name, [Validators.required, Validators.maxLength(250)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(250), Validators.email]),
      role: new FormControl(this.user.role, [Validators.required]),
      lang: new FormControl(this.user.lang, [Validators.required]),
    });
    if(!this.currentUser.data?.roleAdmin) {
      this.userForm.controls['role'].disable();
    }
    if(this.user.disabled!=null) {
      this.userForm.controls['id'].disable();
      this.userForm.controls['name'].disable();
      this.userForm.controls['email'].disable();
      this.userForm.controls['role'].disable();
      this.userForm.controls['lang'].disable();
    }
  }

  getRoles() {      
    this.http.get<Role[]>(`${this.pathApi}/roles`, {})
    .subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: error => {
        console.error(error);
      }
  })            
  }  

  public myError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }  

  public cancel() {
    this.close(UserFormResult.CANCEL);
  }

  public close(value: UserFormResult) {
    this.mdDialogRef.close({confirmed: value, user: this.user});
  }

  public confirm() {
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }    
    this.close(UserFormResult.SAVE);
  }

  enable() {
    const options = {
      title: this.translate.instant('confirm'),
      message: this.translate.instant('user.enable.question', {user: this.user.name}),
      confirmText: this.translate.instant('yes'),
      cancelText: this.translate.instant('no'),
      confirmAction: true,
    };
    this.confirmDialogService.open(options);
    this.confirmDialogService.confirmed().subscribe(confirmed => {
      if(confirmed) {
        this.close(UserFormResult.ENABLE);          
      }
    });
  
  }  

  disable() {
    const options = {
      title: this.translate.instant('confirm'),
      message: this.translate.instant('user.disable.question', {user: this.user.name}),
      confirmText: this.translate.instant('yes'),
      cancelText: this.translate.instant('no'),
      confirmAction: true,
    };
    this.confirmDialogService.open(options);
    this.confirmDialogService.confirmed().subscribe(confirmed => {
      if(confirmed) {    
        this.close(UserFormResult.DISABLE);  
      }
    });
  }  
  
  @HostListener("keydown.esc")
  public onEsc() {
    this.cancel();
  }  

}
