import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { DateSpanishPipe } from './helpers/dateSpanish.pipe';
import { DateSpanishDatePipe } from './helpers/dateSpanishDate.pipe';
import { TranslateDbPipe } from './helpers/translatedb.pipe';
import { TranslatePluralDbPipe } from './helpers/translatepluraldb.pipe';
import { LapseTimePipe } from './helpers/lapse-time.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LockDialogComponent } from './components/lock-dialog/lock-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LockmanagerComponent } from './components/lock-manager/lock-manager.component';
import { LoginService } from './service/login.service';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LogDialogComponent } from './components/log-dialog/log-dialog.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { UserState } from './store/user/user.state';
import { TranslationState } from './store/translations/translations.state';
import { environment } from "src/enviroments/enviroment";
import { HeaderComponent } from './components/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { ObjectTypeState } from './store/object-types/object-types.state';
import { SchemaState } from './store/schemas/schemas.state';
import { MatPaginatorTranslator } from './service/mat-paginator-i18n.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { OptionsDialogComponent } from './components/options-dialog/options-dialog.component';
import { TitleRouteState } from './store/title-route/title-route.state';
import { ExcelService } from './service/excel.service';


const routes: Routes = [
  { path: "lockmanager/:usr", component: LockmanagerComponent, canActivate: [AuthGuard], data: { animation: 'One' } },
  { path: 'lockmanager', redirectTo: 'lockmanager/', pathMatch: 'full' },
  { path: "login", component: LoginComponent, data: { animation: 'Two' } },
  { path: "users", component: UserListComponent, canActivate: [AuthGuard], data: { animation: 'Three' }},
  { path: '', redirectTo: 'lockmanager/', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    DateSpanishPipe,
    DateSpanishDatePipe,
    TranslateDbPipe,
    TranslatePluralDbPipe,
    LapseTimePipe,
    ConfirmDialogComponent,
    LockDialogComponent,
    LoginComponent,
    LockmanagerComponent,
    LogDialogComponent,
    HeaderComponent,
    UserListComponent,
    UserFormComponent,
    OptionsDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTabsModule,
    MatRippleModule,
    MatDialogModule,
    MatInputModule,
    TextFieldModule,
    MatMenuModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,    
    TranslateModule.forRoot({ 
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
    }),    
    NgxsModule.forRoot([UserState, ObjectTypeState, SchemaState, TranslationState, TitleRouteState],
      { developmentMode: !environment.production }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    })    
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorTranslator},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
   /* {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},*/
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
    LoginService,
    ExcelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
