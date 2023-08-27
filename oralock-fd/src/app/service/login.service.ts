import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { SetUser, RemoveUser, SetUserToken } from '../store/user/user.actions';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../models';
import { Router } from '@angular/router';
import { environment } from "src/enviroments/enviroment";
import { TranslationDbService } from './translationdb.service';
import { ObjectTypeService } from './object-type.service';
import { SchemaService } from './schema.service';
import { TranslateService } from '@ngx-translate/core';
import { DefaultLangService } from './default-lang.service';

@Injectable()
export class LoginService {

  pathApi = environment._APIUrl;
  private currentUser!: User;  

  constructor(private store: Store, private http: HttpClient, private router: Router, private translateDb: TranslationDbService, 
    private translate: TranslateService, private objectTypeService: ObjectTypeService, private schemaService: SchemaService, private defaultLangService: DefaultLangService) {
    this.store.select(state => state.user.user).subscribe(res => this.currentUser = res);
  }

  login(username: string, password: string) {

    return this.http.post<any>(`${this.pathApi}/login`, { username: username, password: password })
      .pipe(map(resp => {
        if (resp) {
          let user: User = {
            login: username,
            password: password,
            token: resp.token,
            refreshToken: resp.refreshToken,
            data: {
              id: resp.user.id,
              name: resp.user.name,
              email: resp.user.email,
              enabled: resp.user.enabled,
              disabled: resp.user.disabled,
              role: resp.user.role,
              lang: resp.user.lang,
              roleLabel: resp.user.roleLabel,
              roleAdmin: resp.user.roleAdmin,  
              countLocks: resp.user.countLocks           
            }
          }                   
          this.store.dispatch(new SetUser(user));
          this.translate.use(resp.user.lang); 
          this.translateDb.loadStore(resp.user.lang);
          this.defaultLangService.load();
          this.objectTypeService.loadStore();
          this.schemaService.loadStore();
          return true;
        }
        return throwError(() => new Error("Servicio de login no disponible"));
      }),
      catchError((error) => {
        console.error("login error " + error.status);
        return throwError(() => error);
      })      
    );      
  }

  //<a href="https://www.freepik.com/icon/locked-database_909">Icon by Freepik</a>

  refreshToken(): Observable<string> {
    return this.http.post<any>(`${this.pathApi}/refreshtoken`,  this.currentUserValue.refreshToken )
      .pipe(
        map((resp) => {
          // Actualizar el token 
          // Guardar los cambios en el almacenamiento local
          this.store.dispatch(new SetUserToken(resp.token));
          // Devolver el nuevo token
          return resp.token;
        }),        
        catchError((error) => {
          console.error(error);
          this.logout();
          return throwError(() => error);
        })
      );                  
  }  

  public get currentUserValue(): User {
    return this.currentUser;
  }

  public set currentUserValue(user: User) {
    this.store.dispatch(new SetUser(user));
  }

  public logout() {
    this.store.dispatch(new RemoveUser());
    this.router.navigate(['/login']);
  }

  public isLoggedIn() {
    return this.currentUser && this.currentUser.login;
  }

}