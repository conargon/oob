import { AfterViewInit, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { ObjectLog, User } from "../../models"
import { Observable, first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from "src/enviroments/enviroment";
import { Sort } from '@angular/material/sort';
import { ExcelService } from 'src/app/service/excel.service';
import { Store } from '@ngxs/store';
import { DateSpanishPipe } from 'src/app/helpers/dateSpanish.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-log-dialog',
  templateUrl: './log-dialog.component.html',
  styleUrls: ['./log-dialog.component.css']
})
export class LogDialogComponent implements AfterViewInit {

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

  constructor(private store: Store, private http: HttpClient, private translate: TranslateService, private excelService: ExcelService, @Inject(MAT_DIALOG_DATA) public data: {
    owner: string,
    type: string,
    label: string,
    name: string
  },

    private mdDialogRef: MatDialogRef<LogDialogComponent>) {
    mdDialogRef.disableClose = true;
    this.store.select(state => state.user.user).subscribe(res => {
      this.currentUser = res;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = [];
    this.getLogList();
  }

  closeDialog(value: boolean) {
    this.mdDialogRef.close(value);
  }

  close() {
    this.closeDialog(true);
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.closeDialog(false);
  }

  listObjectLog(): Observable<ObjectLog[]> {
    return this.http.get<ObjectLog[]>(`${this.pathApi}/logs?owner=${this.data.owner}&type=${this.data.type}&name=${this.data.name}&sort=${this.currentSort}&dir=${this.currentDir}`, {});
  }

  getLogList() {
    this.loading = true;
    this.listObjectLog().pipe(first()).subscribe(data => {
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

  resize() {
    this.maximized = !this.maximized;
    if (this.maximized) {
      this.mdDialogRef.updateSize('100vw', '100%');
    } else {
      this.mdDialogRef.updateSize('1200px', '76%');
    }
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
      this.excelService.exportAsExcelFile(exportData, `log_${this.data.owner}.${this.data.name}.xlsx`);
      this.loading = false;
    });
  }

}
