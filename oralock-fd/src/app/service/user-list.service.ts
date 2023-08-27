import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UserApp } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  pathApi = environment._APIUrl;

  constructor(private http:HttpClient) { }

  list(search: string, sort: string, dir: string): Observable<UserApp[]> {      
    return this.http.get<UserApp[]>(`${this.pathApi}/users?search=${search}&sort=${sort}&dir=${dir}`, {});         
  }

  edit(dataUser: UserApp): Observable<UserApp> {          
    return this.http.put<UserApp>(`${this.pathApi}/user`, dataUser);
  }

  new(dataUser: UserApp): Observable<UserApp> {          
    return this.http.put<UserApp>(`${this.pathApi}/user`, dataUser);
  }  
  
  disable(id: string): Observable<UserApp> {      
    return this.http.delete<UserApp>(`${this.pathApi}/user/${id}`, {});         
  }  

  enable(id: string): Observable<UserApp> {      
    return this.http.post<UserApp>(`${this.pathApi}/user/${id}`, {});         
  }  

}
