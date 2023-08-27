import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/enviroments/enviroment";
import { Translation } from '../models';
import { Store } from '@ngxs/store';
import { AddTranslation, ClearTranslations } from '../store/translations/translations.actions';

@Injectable({
    providedIn: 'root'
  })
  export class TranslationDbService {

    pathApi = environment._APIUrl;
    translations = new Map<string, Translation>();
  
    constructor(private store: Store, private http:HttpClient) { 
        this.store.select(state => state.translations).subscribe(res => this.translations = res.translations);
    }

    loadStore(lang: string) {
        this.store.dispatch(new ClearTranslations());
        this.http.get<Translation[]>(`${this.pathApi}/translations?lang=${lang}`, {})
        .subscribe({
            next: (data) => {
              data.forEach(t => {
                this.store.dispatch(new AddTranslation(t));
              })
            },
            error: error => {
              console.error(error)        
            }
        })
    } 

    getTranslation(id: string): string {
        let res = this.translations.get(id);
        return res !== undefined ? res.text : '';
    }

    getTranslationPlural(id: string): string {
        let res = this.translations.get(id);
        return res !== undefined ? res.textPlural : '';
    }

}