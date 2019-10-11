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
  selector: "app-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.scss"]
})
export class EditarComponent implements OnInit {
  // From
  formEditar: FormGroup;

  ListaPersona: PersonaModel;
  loading: boolean;
  error: any;

  id: string;
  verCodigo: string;

  constructor(
    private store: Store<AppState>,
    private routerAct: ActivatedRoute,
    private serv: PersonasService,
    public router: Router
  ) {}

  ngOnInit() {
    this.RouterActive();
    this.FormInit();
    this.personaId();
  }

  FormInit() {
    this.formEditar = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.pattern("[a-zA-Z ]*")
      ]),
      edad: new FormControl(0, [
        Validators.required,
        Validators.max(90),
        Validators.min(10)
      ]),
      sexo: new FormControl(null),
      codigo: new FormControl(null)
    });
  }

  // Hacer funiones de para validar el input
  get nombre() {
    return this.formEditar.get("nombre");
  }
  get edad() {
    return this.formEditar.get("edad");
  }
  get sexo() {
    return this.formEditar.get("sexo");
  }
  get codigo() {
    return this.formEditar.get("codigo");
  }

  RouterActive() {
    this.routerAct.params.subscribe(params => {
      this.id = params["id"];
      this.store.dispatch(new personaAction.CargarPersona(this.id));
    });
  }

  personaId() {
    this.store.select("persona").subscribe((p: any) => {
      console.log(p);
      if (p.persona) {
        this.formEditar.setValue({
          nombre: p.persona.nombre,
          edad: p.persona.edad,
          codigo: p.persona.codigo,
          sexo: p.persona.sexo
        });
        this.verCodigo = p.persona.codigo;
      } else {
        p.error !== null ? this.SwalError(p.error.message) : undefined;
      }
      // this.ListaPersona = p.personas;
      // this.loading = p.loading;
      // this.error = p.error;
    });
  }

  editar() {
    // console.log(this.formEditar.value);
    // let f = JSON.stringify(this.formEditar.value)
    let f = this.formEditar.value;
    // console.log(f);

    this.serv.EditarPersone(this.id, f).subscribe(
      (x: any) => {
        console.log(x);
        Swal.fire({
          title: "Editado",
          text: "La persona " + x.persona.nombre + " fue editada con éxito",
          type: "success"
        });
      },
      (er: any) => {
        this.SwalError(er.message);
      }
    );

    // this.store.dispatch( new personaAction.EditarPersona(this.id, f) );
    // this.store.select('persona')
    //     .subscribe( (p:any) => {
    //       console.log(p);
    //       // this.personaId()

    //       // if (p.persona){
    //       //   this.formEditar.setValue({
    //       //     nombre: p.persona.nombre,
    //       //     edad: p.persona.edad,
    //       //     codigo: p.persona.codigo,
    //       //     sexo: p.persona.sexo
    //       //   })
    //       // }
    //     });
  }

  eliminar() {
    this.serv.EliminarPersone(this.id).subscribe(
      (x: any) => {
        console.log(x);
        this.router.navigate(["listas"]);
        Swal.fire({
          title: "Eliminado",
          text: "La persona " + x.persona.nombre + " fue eliminada con éxito",
          type: "success"
        });
      },
      (er: any) => {
        console.log(er);

        this.SwalError(er.message);
      }
    );
  }

  nuevoCodigo() {
    this.verCodigo = Math.random()
      .toString(36)
      .slice(2);
    this.formEditar.patchValue({
      codigo: this.verCodigo
    });
  }

  SwalError(mensaje) {
    Swal.fire({
      title: "Oopsi...",
      text: "Error en el sevidor: " + mensaje,
      type: "error"
    });
  }
}
