import { ManagerFilter } from "src/app/models"

export class SetManagerFilter {
  static readonly type = '[ManagerFilter] Set';
  constructor( public payload: ManagerFilter ) {}
}
export class SetUserManagerFilter {
  static readonly type = '[ManagerFilter] SetUser';
  constructor( public user: string ) {}
}
export class ClearManagerFilter {
  static readonly type = '[ManagerFilter] Clear';
  constructor() {}
}