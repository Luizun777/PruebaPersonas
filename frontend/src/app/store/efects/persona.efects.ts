import { Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap, exhaustMap,tap } from 'rxjs/operators';

import * as personaAction from '../actions';
import { of } from 'rxjs';
import { PersonasService } from '../../services/personas.service'

@Injectable()
export class PersonaEfects {

    cargarPersona$ = createEffect(() =>
    this.actions$.pipe(
      ofType( personaAction.CARGAR_PERSONA ),
      tap( () => console.log),
      exhaustMap( (x) => 
        this.personaServ.getPersoneId(x['id']).pipe(
          map( (p:any) => new personaAction.CargarPersonaSuccess(p)),
          catchError( err => of(new personaAction.CargarPersonaFail(err)))
        )
      )
    ));


    editarPersona$ = createEffect(() =>
    this.actions$.pipe(
      ofType( personaAction.EDITAR_PERSONA ),
      tap( () => console.log),
      exhaustMap( (x) => 
        this.personaServ.EditarPersone( x['id'],x['persona'] ).pipe(
          map( (p:any) => new personaAction.EditarPersonaSuccess(p)),
          catchError( err => of(new personaAction.EditarPersonaFail(err)))
        )
      )
    ));

    constructor(
        private actions$: Actions,
        public personaServ: PersonasService
    ) {}

}

