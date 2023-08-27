import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TitleRouteModel } from './title-route.model';
import { SetTitleRoute } from './title-route.actions';

@State({
  name: 'title',
  defaults: {
    title: ''
  }
})
export class TitleRouteState {
  @Selector()
  static getTitleRoute(state: TitleRouteModel) { return state.title; }

  @Action(SetTitleRoute)
  add({ getState, patchState }: StateContext<TitleRouteModel>, { payload }: SetTitleRoute) {
    const state = getState();
    patchState({
        title: payload
    });
  }
}