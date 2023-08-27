import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/enviroments/enviroment";
import { ObjectType } from '../models';
import { Store } from '@ngxs/store';
import { AddObjectType, ClearObjectTypes } from '../store/object-types/object-types.actions';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ObjectTypeService {

    pathApi = environment._APIUrl;
  
    constructor(private store: Store, private http:HttpClient) { }

    loadStore() {
        this.store.dispatch(new ClearObjectTypes());
        this.http.get<ObjectType[]>(`${this.pathApi}/objectTypes`, {})
        .subscribe({
            next: (data) => {
              data.forEach(t => {
                this.store.dispatch(new AddObjectType(t));
              })
            },
            error: error => {
              console.error(error)        
            }
        })
    } 

    list(): Observable<ObjectType[]> {
      return this.http.get<ObjectType[]>(`${this.pathApi}/objectTypes`, {})    
    }       
}