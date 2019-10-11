import { Action } from '@ngrx/store';
import { PersonaModel } from '../../model/PersonaModel'

export const CARGAR_PERSONA = '[Persona] Cargar usuario';
export const CARGAR_PERSONA_FAIL = '[Persona] Cargar usuario FAIL';
export const CARGAR_PERSONA_SUCCESS = '[Persona] Cargar usuario SUCCESS';

export const EDITAR_PERSONA = '[Persona] Editar usuario';
export const EDITAR_PERSONA_FAIL = '[Persona] Editar usuario FAIL';
export const EDITAR_PERSONA_SUCCESS = '[Persona] Editar usuario SUCCESS';

// ======================
// Crear
// ======================
export class CargarPersona implements Action {
    readonly type = CARGAR_PERSONA;
    constructor( public id:string ) { }
}

export class CargarPersonaFail implements Action {
    readonly type = CARGAR_PERSONA_FAIL;

    constructor( public payload: any ) {}
}

export class CargarPersonaSuccess implements Action {
    readonly type = CARGAR_PERSONA_SUCCESS;
    
    constructor( public persona: PersonaModel ) {}
}

// ======================
// Editar
// ======================
export class EditarPersona implements Action {
    readonly type = EDITAR_PERSONA;
    constructor( public id:string, public persona: any ) { }
}

export class EditarPersonaFail implements Action {
    readonly type = EDITAR_PERSONA_FAIL;

    constructor( public payload: any ) {}
}

export class EditarPersonaSuccess implements Action {
    readonly type = EDITAR_PERSONA_SUCCESS;
    
    constructor( public persona: PersonaModel ) {}
}

export type personaActiones =   CargarPersona | 
                                CargarPersonaFail | 
                                CargarPersonaSuccess |
                                EditarPersona |
                                EditarPersonaFail |
                                EditarPersonaSuccess
