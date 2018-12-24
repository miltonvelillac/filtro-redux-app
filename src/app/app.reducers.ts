import { Todo } from './todo/model/todo.model';
import { ActionReducerMap } from '@ngrx/store';

import * as fromTodo from './todo/todo.reducer';
import * as fromFiltro from './filter/filter.reducer';
import { filtrosValidos } from './filter/fiter.actions';

// Este archivo sirve para unificar todos los reducers de la aplicacion
export interface AppState {
    todo: Todo[];
    filtro: filtrosValidos;
}

// Esta sera la convinacion de todos los reducers que use la aplicacion
export const appReducers: ActionReducerMap<AppState> = {
    todo: fromTodo.todoReducer,
    filtro: fromFiltro.filtroReducer
};
