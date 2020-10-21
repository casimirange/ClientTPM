import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

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
import {OperateursService} from "./services/operateurs/operateurs.service";
import {MachinesService} from "./services/machines/machines.service";
import { AgGridModule } from 'ag-grid-angular';
import {NgxPaginationModule} from "ngx-pagination";
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
// import {XhrInterceptor} from "./xhr.interceptor";
import {StoreModule} from "@ngrx/store";
// import {principalReducer} from "./Models/principal.reducer";
import {AuthService} from "./services/auth/auth.service";
import {UserService} from "./services/user/user.service";
import {DepartementResolver} from "./Pages/departements/departement.resolver";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {RoleService} from "./services/role/role.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { PaddingLayoutComponent } from './layout/base-layout/padding-layout/padding-layout.component';
import { TitleComponent } from './layout/page-title/title/title.component';
// import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartModule} from "angular2-chartjs";
import { MyChartComponent } from './my-chart/my-chart.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import {NgxDonutChartModule} from "ngx-doughnut-chart";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardService} from "./services/dashboard/dashboard.service";
import {ChartsModule} from "ng2-charts";
import { ChartComponent } from './dashboard/chart/chart.component';
import {ArretsService} from "./services/arrets/arrets.service";
import { ArretsComponent } from './Pages/arrets/arrets/arrets.component';
import { HeuresMachinesComponent } from './Pages/heures/heures-machines/heures-machines.component';
import {HeuresService} from "./services/heures/heures.service";
import {NgApexchartsModule} from "ng-apexcharts";
import { ApexComponent } from './dashboard/apexchart/apex.component';
import { StatsGlobalComponent } from './Pages/stats-global/stats-global.component';
import { DoughnutChartComponent } from './dashboard/doughnut-chart/doughnut-chart.component';
import {AuthInterceptor, httpInterceptorProviders} from "./services/auth/auth-interceptor";
// import { RegisterComponent } from './Pages/auth/register/register.component';
// import { HomeComponent } from './Pages/home/home/homes.component';
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {TokenStorageService} from "./services/auth/token storage/token-storage.service";
import {AdminComponent} from "./admin/admin.component";
import {PmComponent} from "./pm/pm.component";
import {LoginComponent} from "./logins/logins.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./users/user.component";
import { PdfComponent } from './pdfMake/pdf/pdf.component';
import {jqxGridModule} from "jqwidgets-ng/jqxgrid";
// import { FilterPipe } from './filter.pipe';
import { SearchComponent } from './search/search/search.component';
import {DatePipe} from "@angular/common";
import { RadialBarComponent } from './dashboard/radial-bar/radial-bar.component';
import { EditPanneComponent } from './Pages/arrets/pannes/edit-panne/edit-panne.component';
import {RapportService} from "./services/rapport/rapport.service";
import { DashCartComponent } from './dashboard/dash-cart/dash-cart.component';
// import {ClientSideRowModel} from "ag-grid";
// import {NgScrollbarModule} from "ngx-scrollbar";
// import {IgxGridModule} from "igniteui-angular";



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
    AuthLayoutComponent,
    // LoginComponent,
    // UserComponent,
    PaddingLayoutComponent,
    TitleComponent,
    MyChartComponent,
    DashboardComponent,
    ChartComponent,
    ArretsComponent,
    HeuresMachinesComponent,
    ApexComponent,
    StatsGlobalComponent,
    DoughnutChartComponent,
    // RegisterComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    PdfComponent,
    // FilterPipe,
    SearchComponent,
    RadialBarComponent,
    EditPanneComponent,
    DashCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    NgxPaginationModule,
    // StoreModule.forRoot({principal: principalReducer}),
    SweetAlert2Module.forRoot(),
    NgbModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    ChartModule,
    NgxDonutChartModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgApexchartsModule,
    jqxGridModule,
    // IgxGridModule
    // NgScrollbarModule
    // DpDatePickerModule,
    // AmazingTimePickerModule,
  ],
  providers: [
    // {
    // provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    DepartementMockService,
    DepartementsService,
    DepartementResolver,
    LignesService,
    TechniciensService,
    OperateursService,
    MachinesService,
    // {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
    CookieService,
    AuthService,
    UserService,
    RoleService,
    AuthGuardService,
    DashboardService,
    DatePipe,
    ArretsService,
    HeuresService,
    RapportService,
    // AuthInterceptor,
    // TokenStorageService
    httpInterceptorProviders,
  // SweetAlert2LoaderService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
