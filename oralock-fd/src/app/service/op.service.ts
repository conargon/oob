import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/enviroments/enviroment";
import { Op } from '../models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class OpService {

    pathApi = environment._APIUrl;
  
    constructor(private http:HttpClient) { }

    list(): Observable<Op[]> {
      return this.http.get<Op[]>(`${this.pathApi}/ops`, {})    
    }       
}