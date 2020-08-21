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
// import {LoginComponent} from "./Pages/auth/logins/logins.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
 import {UserComponent} from "./users/user.component";
import {PaddingLayoutComponent} from "./layout/base-layout/padding-layout/padding-layout.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {SinglePanneComponent} from "./Pages/arrets/pannes/single-panne/single-panne.component";
import {DashboardComponent} from "./Pages/dashboard/dashboard.component";
import {ArretsComponent} from "./Pages/arrets/arrets/arrets.component";
import {HeuresMachinesComponent} from "./Pages/heures/heures-machines/heures-machines.component";
import {StatsGlobalComponent} from "./Pages/stats-global/stats-global.component";

import {PmComponent} from "./pm/pm.component";
import {AdminComponent} from "./admin/admin.component";
import {RegisterComponent} from "./register/register.component";

import {LoginComponent} from "./logins/logins.component";
import {HomeComponent} from "./home/home.component";
import {RadialBarComponent} from "./dashboard/radial-bar/radial-bar.component";
import {ApexComponent} from "./dashboard/apexchart/apex.component";

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'chart',
    component: RadialBarComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },


  {
    path: '',
    component: BaseLayoutComponent,
    children: [

  {path: 'departements', canActivate:[AuthGuardService], component: DepartementsComponent },
  // {path: 'homes', component: HomeComponent, canActivate:[AuthGuardService] },
  {path: 'departements/:id', canActivate:[AuthGuardService], component: SingleDepartementComponent },
  {path: 'lignes', canActivate:[AuthGuardService], component: LignesComponent },
  // {path: 'lignes/:id', canActivate:[AuthGuardService], component: SingleLigneComponent },
  {path: 'techniciens', canActivate:[AuthGuardService], component: TechniciensComponent },
  // {path: 'techniciens/:id', canActivate:[AuthGuardService], component: SingleTechnicienComponent },
  {path: 'operateurs', canActivate:[AuthGuardService], component: OperateursComponent },
  // {path: 'operateurs/:id', canActivate:[AuthGuardService], component: SingleOperateurComponent },
  {path: 'machines', canActivate:[AuthGuardService], component: MachinesComponent },
  {path: 'machines/:id', canActivate:[AuthGuardService], component: SingleMachineComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
  {path: 'pannes', canActivate:[AuthGuardService], component: PannesComponent },
  {path: 'arrets', canActivate:[AuthGuardService], component: ArretsComponent },
  {path: 'utilisateurs', canActivate:[AuthGuardService], component: UserComponent },
  {path: 'statistiques/alpicam', canActivate:[AuthGuardService], component: StatsGlobalComponent }

    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [

  // {path: 'logins', component: LoginComponent },
  {path: 'erreur', component: Erreur404Component }

    ]
  },
  {
    path: '',
    component: PaddingLayoutComponent,
    children: [

  {path: 'new-panne', canActivate:[AuthGuardService], component: NewPanneComponent },
  {path: 'new-panne/:numero', canActivate:[AuthGuardService], component: SinglePanneComponent },
  {path: 'tempsMachine', canActivate:[AuthGuardService], component: HeuresMachinesComponent },
    ]
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/erreur'}
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
