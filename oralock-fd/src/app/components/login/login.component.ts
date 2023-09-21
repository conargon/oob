import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../service/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;
  loading = false;
  submitted = false;

  constructor(
         private formBuilder: FormBuilder,
         private loginService: LoginService, 
         private translate: TranslateService,
         private snackBar: MatSnackBar, 
         private route: ActivatedRoute, 
         private router: Router) 
  {     
    // redirect to home if already logged in
    if (this.loginService.isLoggedIn()) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {    
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });   
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

    // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    
    this.loginService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(["lockmanager"])
        },
        error: (e) => {
          console.error(e)
          this.loading = false;  
          if(e.status == 401) {
            this.snackBar.open(this.translate.instant('user.invalid', {error: e.error}), this.translate.instant('error'), { duration: 5000 })
          }  else {
            this.snackBar.open(this.translate.instant('error.msg', {error: e.error}), this.translate.instant('error'), { duration: 5000 })
          }
        },
      //  complete: () => console.info('login complete') 
    })
  }  

}
