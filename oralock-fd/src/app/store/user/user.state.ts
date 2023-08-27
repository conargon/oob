import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserStateModel } from './user.model';
import { SetUser, RemoveUser, SetUserData, SetUserToken } from './user.actions';

@State({
  name: 'user',
  defaults: {
    user: {}
  }
})
export class UserState {
  @Selector()
  static getUser(state: UserStateModel) { return state.user; }

  @Action(SetUser)
  add({ getState, patchState }: StateContext<UserStateModel>, { payload }: SetUser) {
    const state = getState();
    patchState({
        user: payload
    });
  }

  @Action(SetUserData)
  changeLang({ getState, patchState }: StateContext<UserStateModel>, { payload }: SetUserData) {
    const state = getState();
    patchState({
        user: {...state.user, data: { ...payload } }
    });
  }

  @Action(SetUserToken)
  setToken({ getState, patchState }: StateContext<UserStateModel>, { payload }: SetUserToken) {
    const state = getState();
    patchState({
        user: {...state.user, token: payload }
    });
  }

  @Action(RemoveUser)
  remove({ getState, patchState }: StateContext<UserStateModel>, { }: RemoveUser) {
    patchState({
      user: undefined
    });
  }
}