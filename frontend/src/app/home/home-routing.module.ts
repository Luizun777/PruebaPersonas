import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { homeRoutes } from "./home.routes";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: homeRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class HomeRoutingModule {}
