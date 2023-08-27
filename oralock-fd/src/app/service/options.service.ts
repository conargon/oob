import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option, OptionsApp } from 'src/app/models';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  pathApi = environment._APIUrl;

  constructor(private http:HttpClient) { }
  
  save(options: OptionsApp): Observable<void> {
    return this.http.put<void>(`${this.pathApi}/options`, options);
  }
  
}
