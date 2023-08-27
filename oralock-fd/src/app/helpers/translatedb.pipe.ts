import { Pipe, PipeTransform } from '@angular/core';
import { TranslationDbService } from '../service/translationdb.service';

@Pipe({name: 'translatedb'})
export class TranslateDbPipe implements PipeTransform {
  constructor(private translateDb: TranslationDbService) {}
  transform(id: string): string {
    return this.translateDb.getTranslation(id);
  }
}