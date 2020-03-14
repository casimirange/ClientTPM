import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartementsComponent } from './Pages/departements/departements.component';
import { DepartementMockService } from './services/departement.mock.service';
import { MachinesComponent } from './Pages/machines/machines.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { ParamsComponent } from './layout/params/params.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { Erreur404Component } from './layout/erreur404/erreur404.component';
import { NewMachineComponent } from './Pages/machines/new-machine/new-machine.component';
import { SingleMachineComponent } from './Pages/machines/single-machine/single-machine.component';
import { SingleDepartementComponent } from './Pages/departements/single-departement/single-departement.component';
import { PannesComponent } from './Pages/arrets/pannes/pannes.component';
import { SinglePanneComponent } from './Pages/arrets/pannes/single-panne/single-panne.component';
import { NewPanneComponent } from './Pages/arrets/pannes/new-panne/new-panne.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { DepartementsService } from "./services/departements/departements.service";
import { LignesComponent } from './Pages/lignes/lignes.component';
import { SingleLigneComponent } from './Pages/lignes/single-ligne/single-ligne.component';
import { LignesService } from "./services/lignes/lignes.service";
import { TechniciensComponent } from './Pages/technicien/techniciens.component';
import { SingleTechnicienComponent } from './Pages/technicien/single-technicien/single-technicien.component';
import {TechniciensService} from "./services/techniciens/techniciens.service";
import { SingleOperateurComponent } from './Pages/operateurs/single-operateur/single-operateur.component';
import { OperateursComponent } from './Pages/operateurs/operateurs.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartementsComponent,
    MachinesComponent,
    SidebarComponent,
    HeaderComponent,
    ParamsComponent,
    FooterComponent,
    PageTitleComponent,
    Erreur404Component,
    NewMachineComponent,
    SingleMachineComponent,
    SingleDepartementComponent,
    PannesComponent,
    SinglePanneComponent,
    NewPanneComponent,
    BaseLayoutComponent,
    LignesComponent,
    SingleLigneComponent,
    TechniciensComponent,
    SingleTechnicienComponent,
    SingleOperateurComponent,
    OperateursComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    DepartementMockService,
    DepartementsService,
    LignesService,
    TechniciensService
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
