import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OracleObject, Lock } from '../models';
import { environment } from "src/enviroments/enviroment";

@Injectable({
    providedIn: 'root'
  })
  export class LockmanagerService {

    pathApi = environment._APIUrl;
  
    constructor(private http:HttpClient) { }

    list(owner: string, type: string, name: string, user: string, sort: string, dir: string): Observable<OracleObject[]> {      
      return this.http.get<OracleObject[]>(`${this.pathApi}/objects?owner=${owner}&type=${type}&name=${name}&user=${user}&sort=${sort}&dir=${dir}`, {});         
    }

    lock(lock: Lock): Observable<Lock> {
      return this.http.put<Lock>(`${this.pathApi}/locks`, lock);    
    }

    unlock(id?: number): Observable<void> {
      return this.http.delete<void>(`${this.pathApi}/locks/${id}`);
    }    
    
  }
  