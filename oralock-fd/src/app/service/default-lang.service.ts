import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { TranslateService } from '@ngx-translate/core';
import { Option } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DefaultLangService {

  pathApi = environment._APIUrl;

  constructor(private http: HttpClient, private translate: TranslateService) { }

  load() {
    this.http.get<Option>(`${this.pathApi}/option/default.lang`, {})
      .subscribe({
        next: (data) => {
          this.translate.setDefaultLang(data.value);
        },
        error: error => {
          console.error(error)
        }
      })
  }

}
