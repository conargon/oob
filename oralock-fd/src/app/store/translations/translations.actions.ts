import { Translation } from "src/app/models"

export class AddTranslation {
  static readonly type = '[Translation] Add';
  constructor( public payload: Translation ) {}
}
export class ClearTranslations {
  static readonly type = '[Translation] Clear';
  constructor() {}
}