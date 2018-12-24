import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');
const todo3 = new Todo('Tomar cocacola');

todo2.completado = true;
const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            // state.push(todo); esto no es correcto, ya que se trabaja por referencia de objetos,
            // no se podria rastrear los cambios en las acciones
            // la idea es siempre regresar un nuevo estado
            return [...state, todo];
        case fromTodo.TOGGLE_TODO:
        // El map del array retorna un nuevo array, es decir un array con una referencia nueva
            return state.map( todoEdit => {
                if (todoEdit.id === action.id) {
                    // return !todo.completado; esto no es correcto porque, a pesar que map retorna un nuevo arreglo
                    // los items dentro del arreglo son pasados por referencia, asi que tendriamos la misma referencia para cada item
                    // lo correcto aqui es retornar un nuevo objeto de tipo todo, porque de lo contrario no podriamos dar seguimiento
                    // a los cambios de estado
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    // En este caso si se puede retornar el mismo elemento ya que no va a cambair
                    return todoEdit;
                }
            });

        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });
        case fromTodo.BORRAR_TODO:
        // filter al igual que map retorna un nuevo arreglo (nueva referencia)
            return state.filter(todoEdit => todoEdit.id !== action.id);
        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });
        case fromTodo.LIMPIAR_COMPLETOS:
            return state.filter(todoEdit => !todoEdit.completado);
        default:
            return state;
    }
}
