import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartementsComponent} from "./Pages/departements/departements.component";
import {PannesComponent} from "./Pages/arrets/pannes/pannes.component";
import {NewPanneComponent} from "./Pages/arrets/pannes/new-panne/new-panne.component";
import {Erreur404Component} from "./layout/erreur404/erreur404.component";
import {AppComponent} from "./app.component";
import {SingleDepartementComponent} from "./Pages/departements/single-departement/single-departement.component";
import {DepartementResolver} from "./Pages/departements/departement.resolver";
import {LignesComponent} from "./Pages/lignes/lignes.component";
import {SingleLigneComponent} from "./Pages/lignes/single-ligne/single-ligne.component";
import {TechniciensComponent} from "./Pages/technicien/techniciens.component";
import {SingleTechnicienComponent} from "./Pages/technicien/single-technicien/single-technicien.component";
import {MachinesComponent} from "./Pages/machines/machines.component";
import {SingleMachineComponent} from "./Pages/machines/single-machine/single-machine.component";
import {OperateursComponent} from "./Pages/operateurs/operateurs.component";
import {SingleOperateurComponent} from "./Pages/operateurs/single-operateur/single-operateur.component";
import {BaseLayoutComponent} from "./layout/base-layout/base-layout.component";
import {LoginComponent} from "./Pages/auth/login/login.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {UserComponent} from "./Pages/user/user.component";
import {PaddingLayoutComponent} from "./layout/base-layout/padding-layout/padding-layout.component";


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

  {path: 'departements', component: DepartementsComponent },
  {path: 'departements/:id', component: SingleDepartementComponent },
  {path: 'lignes', component: LignesComponent },
  {path: 'lignes/:id', component: SingleLigneComponent },
  {path: 'techniciens', component: TechniciensComponent },
  {path: 'techniciens/:id', component: SingleTechnicienComponent },
  {path: 'operateurs', component: OperateursComponent },
  {path: 'operateurs/:id', component: SingleOperateurComponent },
  {path: 'machines', component: MachinesComponent },
  {path: 'machines/:id', component: SingleMachineComponent },
  {path: 'dashboard', component: DepartementsComponent },
  {path: 'pannes', component: PannesComponent },
  {path: 'utilisateurs', component: UserComponent }

    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [

  {path: 'login', component: LoginComponent },
  {path: 'erreur', component: Erreur404Component }

    ]
  },
  {
    path: '',
    component: PaddingLayoutComponent,
    children: [

  {path: 'new-panne', component: NewPanneComponent }

    ]
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'erreur'}
];

@NgModule({
  imports: [RouterModule.forRoot(
      routes,
      {
        enableTracing: false,
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      } //pour avoir le suivi des routes dans la console
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
