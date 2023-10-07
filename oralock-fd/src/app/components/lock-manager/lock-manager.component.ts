import { Component, AfterContentInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { LockmanagerService } from '../../service/lock-manager.service';
import { Schema, OracleObject, ObjectType, Lock, UserApp, User, ManagerFilter } from '../../models';
import { first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
import { LockDialogService } from '../../service/lock-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { UserListService } from 'src/app/service/user-list.service';
import { TranslationDbService } from 'src/app/service/translationdb.service';
import { SetTitleRoute } from 'src/app/store/title-route/title-route.actions';
import { Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/service/excel.service';
import { DateSpanishDatePipe } from 'src/app/helpers/dateSpanishDate.pipe';
import { SetManagerFilter } from 'src/app/store/manager-filter/manager-filter.actions';

@Component({
  selector: 'app-lockmanager',
  templateUrl: './lock-manager.component.html',
  styleUrls: ['./lock-manager.component.css'],
})

export class LockmanagerComponent implements AfterViewInit, AfterContentInit {

  @ViewChild("paginatorOracleObject") paginatorOracleObject!: MatPaginator;

  schemas$!: Schema[];
  objectTypes$!: ObjectType[];
  displayedColumns: string[] = ['lock', 'object', 'user', 'date', 'comment', 'actions'];
  displayedColumnsMyLocks: string[] = ['object', 'date', 'comment', 'actions'];
  dataSourceOracleObject = new MatTableDataSource<OracleObject>();
  selectedSchema!: Schema;
  selectedType!: ObjectType;
  selectedNombre = '';
  selectedUser = '';
  loading: boolean = false;
  users!: UserApp[];
  currentUser!: User;
  currentSort!: string;
  currentDir!: string;

  constructor(
    private store: Store, 
    private lockmanagerService: LockmanagerService, 
    private confirmDialogService: ConfirmDialogService, 
    private lockDialogService: LockDialogService,
    private route: ActivatedRoute,
    private translate: TranslateService, 
    private translationDbService: TranslationDbService, 
    private userListService: UserListService,
    private snackBarService: MatSnackBar, 
    private router: Router,
    private excelService: ExcelService) {
      this.store.select(state => state.user.user).subscribe(res => {
        this.currentUser = res;
      });
  }
  ngAfterViewInit(): void {
    this.dataSourceOracleObject.paginator = this.paginatorOracleObject;
  }

  ngAfterContentInit() {
    this.store.dispatch(new SetTitleRoute('header.title.locks'));

    this.store.select(state => state.schemas).subscribe(res => {
      this.schemas$ = res.schemas;
      this.schemas$ = this.schemas$.filter(x => x.isRegistered);
    });

    this.store.select(state => state.objecttypes).subscribe(res => {
      this.objectTypes$ = res.objecttypes;
      this.objectTypes$ = this.objectTypes$.filter(x => x.active);
    });

    this.userListService.list('', 'name', 'asc').subscribe(list => this.users = list);
    
    let usrParam = this.route.snapshot.paramMap.get('usr');
    if (usrParam) {
      this.selectedUser = usrParam;
      this.getOracleObjects();
    } else {
      this.store.select(state => state.filtermanager).subscribe(res => {
        this.selectedSchema = res.filtermanager.schema;
        this.selectedType = res.filtermanager.type;
        this.selectedUser = res.filtermanager.user; // ? res.filtermanager.user : this.currentUser.data.id;
        this.selectedNombre = res.filtermanager.name ? res.filtermanager.name : '';
      });
      this.getOracleObjects();
    }
    
  }

  setCurrentFilter() {
    let filter: ManagerFilter = {
      schema: this.selectedSchema,
      type: this.selectedType,
      user: this.selectedUser,
      name: this.selectedNombre
    }
    this.store.dispatch(new SetManagerFilter(filter));
  }

  @HostListener("keydown.enter")
  getOracleObjects() {
    let username = this.selectedSchema ? this.selectedSchema.username : '';
    let type = this.selectedType ? this.selectedType.id : '';
    let name = this.selectedNombre ? this.selectedNombre : '';
    let user = this.selectedUser ? this.selectedUser : '';
    let sort = this.currentSort ? this.currentSort : '';
    let dir = this.currentDir ? this.currentDir : '';
    if(username=='' && type=='' && name=='' && user=='') {
      return;
    }
    this.loading = true;
    this.dataSourceOracleObject.data = [];
    this.lockmanagerService.list(username, type, name, user, sort, dir).pipe(first()).subscribe({
      next: (data) => {
        this.dataSourceOracleObject.data = data;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.confirmDialogService.showError(this.translate.instant('error.msg', { error: e.error }));
      }
    });
  }

  lockObject(event: Event, o: OracleObject) {
    event.stopPropagation();
    const options = {
      objectName: this.translationDbService.getTranslation(o.label) + ` ${o.owner}.${o.name}`,
    };
    this.lockDialogService.open(options);
    this.lockDialogService.confirmed().subscribe(res => {
      if (res.confirmed) {
        let lock: Lock = {
          id: -1,
          owner: o.owner,
          name: o.name,
          type: o.type,
          user: '',
          date: new Date(),
          comment: res.comment,
          ref: res.ref,
          icon: '',
          label: ''
        }
        this.lockmanagerService.lock(lock).subscribe({
          next: (data) => {
            o.isBlocked = true;
            o.lock = data;
            this.snackBarService.open(this.translate.instant('lock.ok', { owner: o.owner, name: o.name }), "Info");
          },
          error: (e) => {
            console.error(e);
            this.confirmDialogService.showError(this.translate.instant('lock.error', { owner: o.owner, name: o.name, error: e.error }));
          }
        });
      }
    });
  }

  unlockObject(event: Event, o: OracleObject) {
    event.stopPropagation();
    const options = {
      title: this.translate.instant('unlock.object'),
      message: o.lock?.user !== this.currentUser.login.toUpperCase()
        ? this.translate.instant('unlock.other-user.question', { 'owner': o.owner, 'name': o.name, 'user': o.lock?.user })
        : this.translate.instant('unlock.question', { 'owner': o.owner, 'name': o.name }),
      cancelText: this.translate.instant('no'),
      confirmText: this.translate.instant('yes'),
      confirmAction: true,
    };
    this.confirmDialogService.open(options);
    this.confirmDialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.lockmanagerService.unlock(o.lock?.id).subscribe({
          next: () => {
            o.isBlocked = false;
            this.snackBarService.open(this.translate.instant('unlock.ok', { owner: o.owner, name: o.name }), "Info");
          },
          error: (e) => {
            console.error(e);
            this.confirmDialogService.showError(this.translate.instant('unlock.error', { owner: o.owner, name: o.name, error: e.error }));
          }
        });
      }
    });
  }

  showLog(o: OracleObject) {
    this.setCurrentFilter();
    this.router.navigateByUrl('/log', { state: o });
  }

  announceSortChange(sortState: Sort) {
    this.currentSort = sortState.active;
    this.currentDir = sortState.direction;
    if (this.currentDir == '') {
      this.currentSort = '';
    }
    this.getOracleObjects();
  }

  excel() {
    let username = this.selectedSchema ? this.selectedSchema.username : '';
    let type = this.selectedType ? this.selectedType.id : '';
    let name = this.selectedNombre ? this.selectedNombre : '';
    let user = this.selectedUser ? this.selectedUser : '';
    let sort = this.currentSort ? this.currentSort : '';
    let dir = this.currentDir ? this.currentDir : '';
    this.loading = true;
    this.lockmanagerService.list(username, type, name, user, sort, dir).pipe(first()).subscribe({
      next: (data) => {
        let exportData = data.map(x => ({
          [this.translate.instant('owner')]: x.owner,
          [this.translate.instant('type')]: x.type,
          [this.translate.instant('name')]: x.name,
          [this.translate.instant('locked')]: x.lock ? this.translate.instant('yes') : this.translate.instant('no'),
          [this.translate.instant('user')]: x.lock?.user,
          [this.translate.instant('date')]: new DateSpanishDatePipe().transform(x.lock?.date as Date, this.currentUser.data.lang),
          [this.translate.instant('ref_its')]: x.lock?.ref,
          [this.translate.instant('comment')]: x.lock?.comment
        }));
        this.excelService.exportAsExcelFile(exportData, `report_`);
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.confirmDialogService.showError(this.translate.instant('error.msg', { error: e.error }));
      }
    });
  }

  clearFilter() {
    this.selectedSchema = {
      username: '',
      isRegistered: false,
      countLocks: 0
    };    
    this.selectedType={
      id: '',
      classType: '',
      label: '',
      order: 0,
      icon: '',
      active: false,
      countLocks: 0
    };
    this.selectedNombre = '';
    this.selectedUser = this.currentUser.data.id;
  }

}