import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingEgr from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
    ui: ui.State,
    user: auth.State
    //ingresoEgreso: ingEgr.State
}



export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.loadingReducer,
    user:auth.authReducer,
    //ingresoEgreso:ingEgr.ingresoEgresoReducer
}