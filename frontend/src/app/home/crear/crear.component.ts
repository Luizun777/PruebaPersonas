import { Component, OnInit } from '@angular/core';
import * as personaAction from '../../store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { PersonaModel } from '../../model/PersonaModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import Swal from 'sweetalert2'

@Component({
  selector: "app-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.scss"]
})
export class CrearComponent implements OnInit {
  // From
  formCrear: FormGroup;

  constructor(
    private store: Store<AppState>,
    private routerAct: ActivatedRoute,
    private serv: PersonasService,
    public router: Router
  ) {}

  ngOnInit() {
    this.FormInit();
  }

  FormInit() {
    this.formCrear = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.pattern("[a-zA-Z ]*")
      ]),
      edad: new FormControl(null, [
        Validators.required,
        Validators.max(90),
        Validators.min(10)
      ]),
      sexo: new FormControl("No binario"),
      codigo: new FormControl(
        Math.random()
          .toString(36)
          .slice(2)
      )
    });
  }

  // Hacer funiones de para validar el input
  get nombre() {
    return this.formCrear.get("nombre");
  }
  get edad() {
    return this.formCrear.get("edad");
  }
  get sexo() {
    return this.formCrear.get("sexo");
  }
  get codigo() {
    return this.formCrear.get("codigo");
  }

  crear() {
    let f = this.formCrear.value;
    console.log(f);

    this.serv.CrearPersone(f).subscribe(
      (x: any) => {
        console.log(x);
        Swal.fire({
          title: "Creado",
          text: "La persona " + x.persona.nombre + " fue creada con éxito",
          type: "success"
        });
        this.formCrear.reset({
          nombre: "",
          edad: null,
          sexo: "No binario",
          codigo: Math.random()
            .toString(36)
            .slice(2)
        });
      },
      (error: any) => {
        Swal.fire({
          title: "Oopsi...",
          text: "Error en el sevidor",
          type: "error"
        });
      }
    );
  }
}
