import { Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';

import * as personasActions from '../actions';
import { of } from 'rxjs';
import { PersonasService } from '../../services/personas.service'

@Injectable()
export class PersonasEfects {

    cargarPersonas$ = createEffect(() =>
    this.actions$.pipe(
      ofType( personasActions.CARGAR_PERSONAS ),
      tap( () => console.log),
      mergeMap( () =>
        this.personaServ.getPersones().pipe(
          map( (p:any) => new personasActions.CargarPersonasSuccess(p)),
          catchError( err => of(new personasActions.CargarPersonasFail(err)))
        )
      )
    ));

    constructor(
        private actions$: Actions,
        public personaServ: PersonasService
    ) {}

}