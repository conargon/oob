import { Pipe, PipeTransform } from '@angular/core';
import { TranslationDbService } from '../service/translationdb.service';

@Pipe({name: 'translatepluraldb'})
export class TranslatePluralDbPipe implements PipeTransform {
  constructor(private translateDb: TranslationDbService) {}
  transform(id: string): string {
    return this.translateDb.getTranslationPlural(id);
  }
}