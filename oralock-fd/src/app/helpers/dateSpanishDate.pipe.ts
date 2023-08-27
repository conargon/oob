import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateSpanishDate' })
export class DateSpanishDatePipe implements PipeTransform {

  transform(d: Date, lang: string): string {
    if (d) {
      let dx = new Date(d);
      let code = lang == 'en' ? 'en-En' : 'es-Es';
      return dx.toLocaleString(code, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return '';
    }
  }
}