import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable, first } from 'rxjs';
import { DateSpanishPipe } from 'src/app/helpers/dateSpanish.pipe';
import { ObjectLog, OracleObject, User } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { ExcelService } from 'src/app/service/excel.service';
import { LogDialogService } from 'src/app/service/log-dialog.service';
import { LogListService } from 'src/app/service/log-list.service';
import { SetTitleRoute } from 'src/app/store/title-route/title-route.actions';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements AfterViewInit, AfterContentInit  {

  @ViewChild("paginator") paginator!: MatPaginator;

  pathApi = environment._APIUrl;
  displayedColumns: string[] = ['op', 'username', 'date', 'ref_its', 'comment'];
  dataSource = new MatTableDataSource<ObjectLog>();
  loading: boolean = false;
  currentSort!: string;
  currentDir!: string;
  maximized: boolean = false;
  currentUser!: User;
  countLocks = 0;
  countCompiles = 0;
  countFails = 0;
  
  object!: OracleObject;

  constructor(
    private store: Store, 
    private confirmDialogService: ConfirmDialogService,
    private logService: LogListService, 
    private translate: TranslateService, 
    private logDialogService: LogDialogService,
    private router: Router,
    private excelService: ExcelService) {
      this.store.select(state => state.user.user).subscribe(res => {
        this.currentUser = res;
      });
      this.object = this.router.getCurrentNavigation()?.extras.state as OracleObject;
  }

  ngAfterContentInit(): void {
    this.store.dispatch(new SetTitleRoute('header.title.log'));
    this.getLogList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private listObjectLog(): Observable<ObjectLog[]> {
    return this.logService.list(this.object.owner, this.object.type, this.object.name, this.currentSort, this.currentDir);
  } 

  getLogList() {
    this.loading = true;
    this.dataSource.data = [];
    this.listObjectLog()
    .subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.countLocks = 0;
        this.countCompiles = 0;
        this.countFails = 0;
        this.dataSource.data.filter(x => {
          switch (x.op) {
            case 'LOCK':
              this.countLocks++;
              break;
            case 'COMPILE':
              this.countCompiles++;
              break;
            case 'COMPILE-ERROR':
              this.countFails++;
              break;
          }
        })
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.confirmDialogService.showError(this.translate.instant('error.msg', { error: e.error }));
      }
    });
  }

  announceSortChange(sortState: Sort) {
    this.currentSort = sortState.active;
    this.currentDir = sortState.direction;
    if (this.currentDir == '') {
      this.currentSort = '';
    }
    this.getLogList();
  }

  excel() {
    this.loading = true;
    this.listObjectLog().pipe(first()).subscribe(data => {
      let exportData = data.map(x => ({
        [this.translate.instant('owner')]: x.owner,
        [this.translate.instant('type')]: x.type,
        [this.translate.instant('name')]: x.name,
        [this.translate.instant('user')]: x.user,
        [this.translate.instant('date')]: new DateSpanishPipe().transform(x.date, this.currentUser.data.lang),
        [this.translate.instant('ref_its')]: x.ref,
        [this.translate.instant('comment')]: x.comment
      }));
      this.excelService.exportAsExcelFile(exportData, `log_${this.object.owner}.${this.object.name}.xlsx`);
      this.loading = false;
    });
  }

  showLog(o: ObjectLog) {
    this.logDialogService.open(o);
  }

  volver() {
    this.router.navigate(["lockmanager"])
  }

}
