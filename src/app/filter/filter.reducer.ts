import * as fromFiltro from './fiter.actions';

const estadoInicial: fromFiltro.filtrosValidos = 'todos';

export function filtroReducer(state = estadoInicial,
                              action: fromFiltro.acciones): fromFiltro.filtrosValidos {
    switch (action.type) {
        case fromFiltro.SET_FILTRO:
        // un string es considerado un tipo de dato primitivo, en este caso podriamos retornar un string
        // sin ningun problema ya que se crearia otra referencia
            return action.filtro;
        default:
            return state;
    }
}
