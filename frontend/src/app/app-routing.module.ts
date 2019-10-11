import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: '',
    loadChildren: './admin/admim.module#AdminModule'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
