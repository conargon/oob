import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith("/login")) {
      return next.handle(request);
    }
    // add authorization header with jwt token if available
    let currentUser = this.loginService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = this.addToken(request, currentUser.token);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    // Llamar a refreshToken() para obtener un nuevo token de acceso
    return this.loginService.refreshToken().pipe(
      switchMap((token: any) => {
        // Si la actualización del token fue exitosa, agregamos el nuevo token a la solicitud original
        return next.handle(this.addToken(request, token));
      }),
      catchError((error) => {
        console.log("handle401Error error")
        // Si ocurrió un error durante la actualización del token o la solicitud original, manejamos el error aquí
        console.error(error);

        // Si el error es un error de autenticación, cerramos la sesión del user
        if (error.status === 401) {
          this.loginService.logout();
        }

        // Devolvemos el error para que el observable de la solicitud original lo maneje
        return throwError(() => error);
      })
    );
  }


}