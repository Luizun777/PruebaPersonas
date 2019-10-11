import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../model/UsuarioModel';
import Swal from 'sweetalert2'

import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioModel;
  token: string;
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  getUsuario( user:UsuarioModel ){
    let url = environment.Urls+'login'
    return this.http.post( url, user ).subscribe( (z:any) => {
      Swal.fire({
        title: 'Cuenta creada con éxito',
        text: 'Espere correo de verificación',
        type: 'success'
      });
      this.router.navigate(['']);
      console.log(z);
      this.token = z.token
      this.usuario = z.usuario.usuario
      localStorage.setItem('token', JSON.stringify( this.token )  );
      localStorage.setItem('user', JSON.stringify( this.usuario )  );
    })
                
  }

}
