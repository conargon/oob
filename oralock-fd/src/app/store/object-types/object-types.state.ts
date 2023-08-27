import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ObjectTypeStateModel } from './object-types.model';
import { AddObjectType, ClearObjectTypes } from './object-types.actions';

@State({
  name: 'objecttypes',
  defaults: {
    objecttypes: []
  }
})
export class ObjectTypeState {
  @Selector()
  static getObjectTypes(state: ObjectTypeStateModel) { return state.objecttypes; }

  @Action(AddObjectType)
  add({ getState, patchState }: StateContext<ObjectTypeStateModel>, { payload }: AddObjectType) {
    const state = getState();
    patchState({
      objecttypes: [...state.objecttypes, payload]
    });
  }

  @Action(ClearObjectTypes)
  remove({ getState, patchState }: StateContext<ObjectTypeStateModel>, { }: ClearObjectTypes) {
    patchState({
      objecttypes: []
    });
  }
}