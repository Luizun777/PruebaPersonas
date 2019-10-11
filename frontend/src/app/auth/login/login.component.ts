import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../model/UsuarioModel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit() {
    this.FormInit();
  }

  FormInit(){
    this.formLogin = new FormGroup({
      usuario: new FormControl( null , Validators.required ),
      password: new FormControl( null , Validators.required ),
    });

    this.formLogin.setValue({
      usuario:'Matts777',
      password:'123'
    })
  }

  Iniciar(){
    let usuario = new UsuarioModel(
      this.formLogin.value.usuario,
      this.formLogin.value.password
    );      
    console.log(usuario);
    
    this.authServ.getUsuario(usuario)
  }

}
