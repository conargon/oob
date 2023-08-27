import { AfterContentInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DateSpanishDatePipe } from 'src/app/helpers/dateSpanishDate.pipe';
import { User, UserApp, UserFormResult } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { ExcelService } from 'src/app/service/excel.service';
import { ObjectTypeService } from 'src/app/service/object-type.service';
import { TranslationDbService } from 'src/app/service/translationdb.service';
import { UserFormService } from 'src/app/service/user-form.service';
import { UserListService } from 'src/app/service/user-list.service';
import { SetTitleRoute } from 'src/app/store/title-route/title-route.actions';
import { SetUserData } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit, AfterContentInit {

  @ViewChild("paginatorUsers") paginatorUsers!: MatPaginator;

  displayedColumns: string[] = ['name', 'id', 'email', 'role', 'enabled', 'disabled', 'countLocks'];
  dataSourceUsers = new MatTableDataSource<UserApp>();
  loading: boolean = false;
  search: string = '';
  currentUser!: User;
  currentSort!: string;
  currentDir!: string;

  constructor(private store: Store, private userListService: UserListService, private userFormService: UserFormService, private translate: TranslateService, private _snackBar: MatSnackBar,
    private translateDb: TranslationDbService, private objectTypeService: ObjectTypeService, private confirmDialogService: ConfirmDialogService, private excelService: ExcelService) {
    this.store.select(state => state.user.user).subscribe(res => this.currentUser = res);
  }
  ngAfterViewInit(): void {
    this.dataSourceUsers.paginator = this.paginatorUsers;
  }

  ngAfterContentInit(): void {
    this.store.dispatch(new SetTitleRoute(this.translate.instant('header.title.users')));
    this.getUsers('');
  }

  getUsers(search: string) {
    this.loading = true;
    this.userListService.list(search, this.currentSort, this.currentDir).subscribe({
      next: (data) => {
        this.dataSourceUsers.data = data;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.confirmDialogService.showError(this.translate.instant('error.msg', { error: e.error }));
      }
    });
  }

  edit(user: UserApp) {
    const options = {
      user: Object.assign({}, user),
      new: false,
    };
    this.userFormService.open(options);
    this.userFormService.confirmed().subscribe(res => {
      switch (res.confirmed) {
        case UserFormResult.SAVE: {
          this.userListService.edit(res.user).subscribe({
            next: (data) => {
              user.name = data.name;
              user.role = data.role;
              user.email = data.email;
              user.lang = data.lang;
              user.roleLabel = data.roleLabel;
              user.roleAdmin = data.roleAdmin;
              user.disabled = data.disabled;
              user.enabled = data.enabled;
              if (this.currentUser.data.id == data.id && this.currentUser.data != data) {
                if (this.currentUser.data.lang != data.lang) {
                  this.translate.use(data.lang);
                  this.translateDb.loadStore(data.lang);
                  this.objectTypeService.loadStore();
                }
                this.store.dispatch(new SetUserData(data));
              }
              this._snackBar.open(this.translate.instant('user.edit.ok'), "Info");
            },
            error: (e) => {
              console.error(e);
              this.confirmDialogService.showError(this.translate.instant('user.edit.error', { user: user?.id, error: e.error.message }));
            }
          });
          break;
        }
        case UserFormResult.ENABLE: {
          this.userListService.enable(user.id).subscribe({
            next: (data) => {
              user.disabled = data.disabled;
              this._snackBar.open(this.translate.instant('user.enabled.ok'), "Info");
            },
            error: (e) => {
              console.error(e);
              this.confirmDialogService.showError(this.translate.instant('error.msg', { error: e.error }));
            }
          });
          break;
        }
        case UserFormResult.DISABLE: {
          this.userListService.disable(user.id).subscribe({
            next: (data) => {
              user.disabled = data.disabled;
              this._snackBar.open(this.translate.instant('user.disabled.ok'), "Info");
            },
            error: (e) => {
              console.error(e);
              this.confirmDialogService.showError(this.translate.instant('error.msg', { error: e.error }));
            }
          });
          break;
        }
      }
    });
  }

  create() {
    const options = {
      user: {
        id: null,
        name: null,
        email: null,
        enabled: null,
        disabled: null,
        role: null,
        lang: this.translate.defaultLang,
      },
      new: true,
    };
    this.userFormService.open(options);
    this.userFormService.confirmed().subscribe(res => {
      if (res.confirmed == UserFormResult.SAVE) {
        this.search = '';
        this.userListService.new(res.user).subscribe({
          next: () => {
            this.getUsers('');
            this._snackBar.open(this.translate.instant('user.new.ok'), "Info");
          },
          error: error => {
            console.error(error);
            this.confirmDialogService.showError(this.translate.instant('user.new.error', { user: res.user.id, error: error.error.message }));
          }
        });
      }
    });
  }

  announceSortChange(sortState: Sort) {
    this.currentSort = sortState.active;
    this.currentDir = sortState.direction;
    if (this.currentDir == '') {
      this.currentSort = '';
    }
    this.getUsers('');
  }

  excel() {
    this.loading = true;
    this.userListService.list(this.search, this.currentSort, this.currentDir).subscribe({
      next: (data) => {
        let exportData = data.map(x => ({
          [this.translate.instant('user-list.id')]: x.id,
          [this.translate.instant('user-list.name')]: x.name,
          [this.translate.instant('user-list.email')]: x.email,
          [this.translate.instant('user-list.active')]: x.disabled ? this.translate.instant('no') : this.translate.instant('yes'),
          [this.translate.instant('user-list.role')]: this.translateDb.getTranslation(x.roleLabel),
          [this.translate.instant('user-list.enabled')]: new DateSpanishDatePipe().transform(x.enabled, this.currentUser.data.lang),
          [this.translate.instant('user-list.disabled')]: new DateSpanishDatePipe().transform(x.disabled, this.currentUser.data.lang),
          [this.translate.instant('user-list.countLocks')]: x.countLocks,
        }));
        this.excelService.exportAsExcelFile(exportData, `users_`);
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.confirmDialogService.showError(this.translate.instant('error.msg', { error: e.error }));
      }
    });
  }

}
