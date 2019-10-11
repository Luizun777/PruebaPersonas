import { Action } from '@ngrx/store';
import { PersonaModel } from '../../model/PersonaModel'

export const CARGAR_PERSONAS = '[Personas] Cargar usuarios';
export const CARGAR_PERSONAS_FAIL = '[Personas] Cargar usuarios FAIOL';
export const CARGAR_PERSONAS_SUCCESS = '[Personas] Cargar usuarios SUCCESS';

export class CargarPersonas implements Action {
    readonly type = CARGAR_PERSONAS;
}

export class CargarPersonasFail implements Action {
    readonly type = CARGAR_PERSONAS_FAIL;

    constructor( public payload: any ) {}
}

export class CargarPersonasSuccess implements Action {
    readonly type = CARGAR_PERSONAS_SUCCESS;
    
    constructor( public personas: PersonaModel[] ) {}
}

export type personasActiones = CargarPersonas | CargarPersonasFail | CargarPersonasSuccess