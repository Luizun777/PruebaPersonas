import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { PersonaModel } from '../../model/PersonaModel';
import * as personasActions from '../../store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  ListaPersona:PersonaModel[] = [];
  ListaTodes:PersonaModel[] = [];
  loading: boolean;
  error: any;

  constructor(
    private store: Store<AppState>,
    public router: Router
  ) { }

  ngOnInit() {
    this.listPersonas()
  }

  listPersonas(){

    this.store.select('personas')
        .subscribe( (p:any) => {
          // console.log(p.personas);
          this.ListaPersona = p.personas;
          this.ListaTodes = p.personas;
          this.loading = p.loading;
          this.error = p.error;
        });

    this.store.dispatch( new personasActions.CargarPersonas() );

  }

  Editar( id ){
    console.log(id);
    this.router.navigate(['editar',id]);    
  }

  filtroGenero( gen ){
    gen !== 'Todes' ? this.ListaPersona = this.ListaTodes.filter( x => x.sexo === gen) : this.ListaPersona = this.ListaTodes
  }


}
