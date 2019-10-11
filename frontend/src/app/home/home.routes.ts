import { Routes } from "@angular/router";
import { CrearComponent } from "./crear/crear.component";
import { ListaComponent } from "./lista/lista.component";
import { EditarComponent } from "./editar/editar.component";

export const homeRoutes: Routes = [
  { path: 'listas', component: ListaComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'editar/:id', component: EditarComponent },
];
