import { ManagerFilter, User } from "src/app/models"
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ManagerFilterStateModel } from './manager-filter.model';
import { SetManagerFilter, ClearManagerFilter, SetUserManagerFilter } from './manager-filter.actions';

@State({
    name: 'filtermanager',
    defaults: {
        filtermanager: {}
    }
})
export class ManagerFilterState {
    @Selector()
    static getManagerFilter(state: ManagerFilterStateModel) { return state.filtermanager; }

    @Action(SetManagerFilter)
    add({ getState, patchState }: StateContext<ManagerFilterStateModel>, { payload }: SetManagerFilter) {
        const state = getState();
        patchState({
            filtermanager: payload
        });
    }

    @Action(SetUserManagerFilter)
    setUser({ getState, patchState }: StateContext<ManagerFilterStateModel>, { user }: SetUserManagerFilter) {
        const state = getState();
        patchState({
            filtermanager: {
                schema: state.filtermanager.schema,
                type: state.filtermanager.type,
                user: user,
                name: state.filtermanager.name
            }
        });
    }

    @Action(ClearManagerFilter)
    remove({ getState, patchState }: StateContext<ManagerFilterStateModel>, { }: ClearManagerFilter) {
        patchState({
            filtermanager: {
                schema: {
                    username: '',
                    isRegistered: false,
                    countLocks: 0
                },
                type: {
                    id: '',
                    classType: '',
                    label: '',
                    order: 0,
                    icon: '',
                    active: false,
                    countLocks: 0
                },
                user: '',
                name: ''
            }
        });
    }
}