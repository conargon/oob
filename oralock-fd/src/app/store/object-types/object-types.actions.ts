import { ObjectType } from "src/app/models"

export class AddObjectType {
  static readonly type = '[ObjectType] Add';
  constructor( public payload: ObjectType ) {}
}
export class ClearObjectTypes {
  static readonly type = '[ObjectType] Clear';
  constructor() {}
}