import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { Router  } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(        
            catchError((err: HttpErrorResponse) => {
                /*if (err.status === 401) { // UNAUTHORIZED                    
                    if(this.router.url.startsWith('/login')) {
                        return throwError(() => new Error("Usuario/contraseña incorrectas"));
                    } else {
                        // auto logout if 401 response returned from api
                        this.loginService.logout();
                        return throwError(() => new Error("No autorizado para acceder al recurso"));
                    }
                } else */
                if (err.status === 403) { // FORBIDDEN 
                    return throwError(() => new Error("No tiene permisos para acceder al recurso"));
                } else if (err.status === 800) {                
                    return throwError(() => new Error(err.error.text));
                } else {          
                    console.log("error inesperado");  
                    return throwError(() => new Error(err.message || err.statusText));
                }
            }))
    }
}