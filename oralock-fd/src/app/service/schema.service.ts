import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/enviroments/enviroment";
import { Schema } from '../models';
import { Store } from '@ngxs/store';
import { AddSchema, ClearSchemas } from '../store/schemas/schemas.actions';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SchemaService {

    pathApi = environment._APIUrl;
  
    constructor(private store: Store, private http:HttpClient) { }

    loadStore() {
        this.store.dispatch(new ClearSchemas());
        this.http.get<Schema[]>(`${this.pathApi}/schemas`, {})
        .subscribe({
            next: (data) => {
              data.forEach(t => {
                this.store.dispatch(new AddSchema(t));
              })
            },
            error: error => {
              console.error(error)        
            }
        })
    } 

    list(): Observable<Schema[]> {
      return this.http.get<Schema[]>(`${this.pathApi}/schemas`, {})    
    }     
}