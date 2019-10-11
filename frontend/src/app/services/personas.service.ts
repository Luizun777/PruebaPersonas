import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../model/UsuarioModel';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

    getPersones(){
      let url = environment.Urls+'persona'
      // console.log(url);

      return this.http.get( url )
        .pipe(
          map( (z) => z['personas'])
        )
    }

    getPersoneId( id:string ){
      let url = environment.Urls+'persona/'+id
      // console.log(url);
      
      return this.http.get( url )
        .pipe(
          map( (z) => z['persona'])
        )
    }

    EditarPersone( id:string, persona:any ){
      console.log(id);
      console.log(persona);
      let url = environment.Urls+'persona/'+id
      return this.http.put( url, {...persona} )
        // .pipe(
        //   map( (z) => z )
        // )
    }

    EliminarPersone( id:string ){
      let url = environment.Urls+'persona/'+id
      return this.http.delete( url )
        // .pipe(
        //   map( (z) => z )
        // )
    }

    CrearPersone( persona:any ){
      let url = environment.Urls+'persona'
      return this.http.post( url, {...persona} )
        // .pipe(
        //   map( (z) => z )
        // )
    }

}
