import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateSpanish'})
export class DateSpanishPipe implements PipeTransform {
  transform(d: string, lang: string): string {
    let dx = new Date(d);
    let code = lang == 'en' ? 'en-En' : 'es-Es';
    return dx.toLocaleString(code, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
  }
}