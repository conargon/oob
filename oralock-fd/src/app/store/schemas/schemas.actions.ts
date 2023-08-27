import { Schema } from "src/app/models"

export class AddSchema {
  static readonly type = '[Schema] Add';
  constructor( public payload: Schema ) {}
}
export class ClearSchemas {
  static readonly type = '[Schema] Clear';
  constructor() {}
}