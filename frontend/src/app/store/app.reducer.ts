import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers'

export interface AppState {
    personas: reducers.PersonasState;
    persona: reducers.PersonaState;
}

export const appReducers: ActionReducerMap<AppState> = {
    personas: reducers.personasReducer,
    persona: reducers.personaReducer,
}