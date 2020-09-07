import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso';

export const unSetItems = createAction('[IngresoEgreso] Unset Items');

export const setItems = createAction('[IngresoEgresos] Set Items',
    props<{items:IngresoEgreso[]}>()
    );
