import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartementsComponent} from "./Pages/departements/departements.component";


const routes: Routes = [
  {path: 'departements', component: DepartementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
