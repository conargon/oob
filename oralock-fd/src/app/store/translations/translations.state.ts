import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TranslationStateModel } from './translations.model';
import { AddTranslation, ClearTranslations } from './translations.actions';
import { Translation } from 'src/app/models';

@State({
  name: 'translations',
  defaults: {
    translations:new Map<string, Translation>()
  }
})
export class TranslationState {
  @Selector()
  static getTranslations(state: TranslationStateModel) { return state.translations; }

  @Action(AddTranslation)
  add({ getState, patchState }: StateContext<TranslationStateModel>, { payload }: AddTranslation) {
    const state = getState();
    patchState({
       translations: state.translations.set(payload.id, payload)
    });
  }

  @Action(ClearTranslations)
  remove({ getState, patchState }: StateContext<TranslationStateModel>, { }: ClearTranslations) {
    patchState({
       translations: new Map<string, Translation>()
    });
  }
}