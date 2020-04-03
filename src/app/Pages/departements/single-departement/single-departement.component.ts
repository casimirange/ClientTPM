import { Component, OnInit } from '@angular/core';
import {DepartementsService} from "../../../services/departements/departements.service";
import {Departement} from "../../../Models/departement";
import {Route} from "@angular/compiler/src/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from "@angular/router";
import {formatNumber} from "@angular/common";
import {__param} from "tslib";
import {LignesService} from "../../../services/lignes/lignes.service";
import {Ligne} from "../../../Models/lignes";

@Component({
  selector: 'app-single-departement',
  templateUrl: './single-departement.component.html',
  styleUrls: ['./single-departement.component.css']
})
export class SingleDepartementComponent implements OnInit {

  heading = "dep";
  subheading = 'Gérez les départements dans l\'application';
  icon = 'fa fa-home icon-gradient';

  // departements: Departement[];

  deps: Departement;
  selectedDep: Departement;
  lignes: Ligne[];
  nomMaj:string;

  constructor( private departementService: DepartementsService,
               private ligneService: LignesService,
               private route: ActivatedRoute) {
    this.selectedDep = new Departement();
  }

  ngOnInit() {
    this.showDepartement();
    // this.showLignes();
  }

  showDepartement() {
    this.route.params.subscribe(params => {
      this.departementService.showDep(Number.parseInt(params['id'])).subscribe(
          res => {
            this.selectedDep = res;
            this.nomMaj = this.selectedDep.nom.toUpperCase();
            console.log("liste des lignes1");
            console.log(this.selectedDep);
          }
      )
    })
  }

  // showLignes() {
  //   this.route.params.subscribe(params =>{
  //     this.ligneService.showLigne(Number.parseInt(params['id'])).subscribe(
  //         data => {
  //           this.lignes = data;
  //           console.log("liste des lignes");
  //           console.log(this.lignes);
  //         }
  //     )
  //   })
  // }

}
