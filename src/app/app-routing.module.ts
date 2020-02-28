import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartementsComponent} from "./Pages/departements/departements.component";
import {PannesComponent} from "./Pages/arrets/pannes/pannes.component";
import {NewPanneComponent} from "./Pages/arrets/pannes/new-panne/new-panne.component";
import {Erreur404Component} from "./layout/erreur404/erreur404.component";
import {AppComponent} from "./app.component";


const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [

  {path: 'departements', component: DepartementsComponent },
  {path: 'dashboard', component: DepartementsComponent },
  {path: 'pannes', component: PannesComponent },
  {path: 'new-panne', component: NewPanneComponent },
  {path: 'erreur', component: Erreur404Component },

  //   ]
  // },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'erreur'},
];

@NgModule({
  imports: [RouterModule.forRoot(
      routes,
      {enableTracing: true} //pour avoir le suivi des routes dans la console
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
