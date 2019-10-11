import { PersonaModel } from '../../model/PersonaModel';
import * as fromPersona from '../actions';

export interface PersonaState {
    persona: PersonaModel;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: PersonaState = {
    persona: null,
    loaded: false,
    loading: false,
    error: null
};

export function personaReducer( state = estadoInicial, action: fromPersona.personaActiones ) : PersonaState {
    switch ( action.type ) {

        // CARGAR
        case fromPersona.CARGAR_PERSONA:
            return {
                ...state,
                loading: true,
                error: null
            }
        
        case fromPersona.CARGAR_PERSONA_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                persona: {...action.persona}
            };
        
        case fromPersona.CARGAR_PERSONA_FAIL:
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

        // EDITAR
        case fromPersona.EDITAR_PERSONA:
            return {
                ...state,
                loading: true,
                error: null
            }

        case fromPersona.EDITAR_PERSONA_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                persona: {...action.persona }
            };
        
        case fromPersona.EDITAR_PERSONA_FAIL:
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