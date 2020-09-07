import { createReducer, on } from '@ngrx/store';
import { unSetItems, setItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[]; 
}

export interface AppStatewithIngreso extends AppState{
    ingresoEgreso:State
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(unSetItems,  state => ({ ...state, items:[]})),
    on(setItems, (state,{items})=> ({items: [...items]})),
    

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}