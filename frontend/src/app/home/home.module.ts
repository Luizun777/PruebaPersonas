import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Router
import { HomeRoutingModule } from './home-routing.module';

// Forms
import { ReactiveFormsModule } from '@angular/forms';

// componentes
import { HomeComponent } from './home.component';
import { CrearComponent } from './crear/crear.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    CrearComponent,
    ListaComponent,
    EditarComponent
  ]
})
export class HomeModule { }
