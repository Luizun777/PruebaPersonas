import { PersonaModel } from '../../model/PersonaModel';
import * as fromPersonas from '../actions';

export interface PersonasState {
    personas: PersonaModel[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: PersonasState = {
    personas: [],
    loaded: false,
    loading: false,
    error: null
};

export function personasReducer( state = estadoInicial, action: fromPersonas.personasActiones ) : PersonasState {
    switch ( action.type ) {

        case fromPersonas.CARGAR_PERSONAS:
            return {
                ...state,
                loading: true,
                error: null
            }
        
        case fromPersonas.CARGAR_PERSONAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                personas: [...action.personas]
            };
        
        case fromPersonas.CARGAR_PERSONAS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                    }
            };

        default:
            return state;
    }
}