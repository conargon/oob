import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { LoginService } from 'src/app/service/login.service';
import { User, UserFormResult } from 'src/app/models';
import { Router } from '@angular/router';
import { UserFormService } from 'src/app/service/user-form.service';
import { UserListService } from 'src/app/service/user-list.service';
import { OptionsDialogService } from 'src/app/service/options-dialog.service';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { TranslationDbService } from 'src/app/service/translationdb.service';
import { ObjectTypeService } from 'src/app/service/object-type.service';
import { SetUserData } from 'src/app/store/user/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentUser!: User;
  title!: string;

  constructor(private store: Store, private router: Router, private loginService: LoginService, private translate: TranslateService,
    private userFormService: UserFormService, private userListService: UserListService, private optionsDialogService: OptionsDialogService,
    private translateDb: TranslationDbService, private objectTypeService: ObjectTypeService, private _snackBar: MatSnackBar,
    private confirmDialogService: ConfirmDialogService) {
    this.store.select(state => state.user.user).subscribe(res => this.currentUser = res);
    this.store.select(state => state.title).subscribe(res => this.title = res.title);
  }

  logout() {
    this.loginService.logout();
  }

  settings() {
    this.optionsDialogService.open();
  }

  editUser() {
    const options = {
      user: Object.assign({}, this.currentUser.data),
      new: false,
    };
    this.userFormService.open(options);
    this.userFormService.confirmed().subscribe(res => {
      if (res.confirmed == UserFormResult.SAVE) {
        this.userListService.edit(res.user).subscribe({
          next: (data) => {
            if (this.currentUser.data.lang != data.lang) {
              this.translate.use(data.lang);
              this.translateDb.loadStore(data.lang);
              this.objectTypeService.loadStore();
            }
            this.store.dispatch(new SetUserData(data));
            this._snackBar.open(this.translate.instant('user.edit.ok'), "Info");
          },
          error: (e) => {
            console.error(e);
            this.confirmDialogService.showError(this.translate.instant('user.edit.error', { user: this.currentUser.data?.id, error: e.error.message }));
          }
        });
      }
    });
  }

  about() {
    this.confirmDialogService.showMessage(this.translate.instant('btnAbout.hint'), 
        this.translate.instant('app.title') + ' ' + this.translate.instant('about.text', { 'year': new Date().getFullYear() }));
  }

}
