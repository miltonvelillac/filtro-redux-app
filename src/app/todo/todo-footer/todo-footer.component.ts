import { Todo } from './../model/todo.model';
import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/fiter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { LimpiarCompletoTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.setFiltroActual();
  }

  setFiltroActual() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todo);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos) {
    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  limpiarTodoCompletos() {
    const accion = new LimpiarCompletoTodoAction();
    this.store.dispatch(accion);
  }
}
