import { User, UserApp } from "src/app/models"

export class SetUser {
  static readonly type = '[USER] Set';
  constructor( public payload: User ) {}
}

export class SetUserData {
  static readonly type = '[USER] SetUserData';
  constructor( public payload: UserApp ) {}
}

export class SetUserToken {
  static readonly type = '[USER] SetUserToken';
  constructor( public payload: string ) {}
}

export class RemoveUser {
  static readonly type = '[USER] Remove';
  constructor() {}
}