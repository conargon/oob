export class SetTitleRoute {
    static readonly type = '[TitleRoute] Set';
    constructor( public payload: string ) {}
  }