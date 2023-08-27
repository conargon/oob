import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SchemaStateModel } from './schemas.model';
import { AddSchema, ClearSchemas } from './schemas.actions';

@State({
  name: 'schemas',
  defaults: {
    schemas: []
  }
})
export class SchemaState {
  @Selector()
  static getSchemas(state: SchemaStateModel) { return state.schemas; }

  @Action(AddSchema)
  add({ getState, patchState }: StateContext<SchemaStateModel>, { payload }: AddSchema) {
    const state = getState();
    patchState({
      schemas: [...state.schemas, payload]
    });
  }

  @Action(ClearSchemas)
  remove({ getState, patchState }: StateContext<SchemaStateModel>, { }: ClearSchemas) {
    patchState({
      schemas: []
    });
  }
}