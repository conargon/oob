import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/enviroments/enviroment';
import { ObjectLog } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LogListService {

  pathApi = environment._APIUrl;
  
  constructor(private http:HttpClient) { }
  
  list(owner: string, type: string, name: string, sort: string, dir: string): Observable<ObjectLog[]> {
    return this.http.get<ObjectLog[]>(`${this.pathApi}/logs?owner=${owner}&type=${type}&name=${name}&sort=${sort}&dir=${dir}`, {});
  }
}
