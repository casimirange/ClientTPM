import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LignesService} from "../../services/lignes/lignes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ligne} from "../../Models/lignes";
import {Departement} from "../../Models/departement";
import {DepartementsService} from "../../services/departements/departements.service";
import * as _ from 'lodash';
import {forEachComment} from "tslint";
import {variable} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-lignes',
  templateUrl: './lignes.component.html',
  styleUrls: ['./lignes.component.css']
})
export class LignesComponent implements OnInit {
  ligneModel:Ligne;
  public lignes: Ligne[];

  headings = 'Lignes';
  subheadings = 'Chaque département est constitué de ligne au-quelle on attribut des machines';
  icons = 'fa fa-road icon-gradient bg-primary';

  ligneForm: FormGroup;

  operation: string = 'add';

  selectedLigne: Ligne;

  deps: Departement[];
  deps2: Departement[];
  newdep:Departement;
  constructor(private fb: FormBuilder,
              private ligneService: LignesService,
              private depService: DepartementsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.createForm();
    this.ligneModel = new Ligne();
    this.newdep = new Departement();
  }

  createForm() {
    this.ligneForm = this.fb.group({
      nomL: ['', [Validators.required, Validators.minLength(4)]],
      depL: [''],
    });
  }

  ngOnInit() {
    this.loadLignes();
    this.loadDeps();
    this.initLigne();
  }

  loadLignes() {
    this.ligneService.getLignes().subscribe(
        data => {

          this.lignes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des lignes');
          console.log(this.lignes);
          console.log('liste des lignes', this.lignes);
        }
    );
  }

  loadDeps() {
    this.depService.getDepartements().subscribe(
        data => {
          this.deps = data
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des départements');
          console.log(this.deps)
        }
    );
  }

  addLigne() {
      var liste, texte;
      liste = document.getElementById("liste");
      texte = liste.options[liste.selectedIndex].text;
    console.log("model_ligne:"+texte );
        let indexDep = _.findIndex (this.deps ,(o=>{
              return  o.nom == texte;
        }) );

        this.newdep = this.deps[indexDep];
        this.ligneModel.idDepartement = this.newdep.idDepartement;
        this.ligneModel.nomLigne = this.ligneForm.controls['nomL'].value;
        console.log("index",indexDep);
        console.log("model",this.ligneModel);
    //dès qu'on crée la ligne on affiche immédiatement la liste
    this.ligneService.addLigne(this.ligneModel).subscribe(
        res => {
          this.initLigne();
          this.loadLignes();
        }
    );
  }

  updateLigne() {
      var liste, texte;
      liste = document.getElementById("liste");
      texte = liste.options[liste.selectedIndex].text;
      console.log("model_ligne:"+texte );
      let indexDep = _.findIndex (this.deps ,(o=>{
          return  o.nom == texte;
      }) );

      this.newdep = this.deps[indexDep];
      this.ligneModel.idDepartement = this.newdep.idDepartement;
      this.ligneModel.nomLigne = this.ligneForm.controls['nomL'].value;
      console.log("index",indexDep);
      console.log("model",this.ligneModel);
    this.ligneService.updateLigne(this.selectedLigne).subscribe(
        res => {
          this.initLigne();
          this.loadLignes();
        }
    );
  }
    getvalue($e, dep){
      console.log($e, dep)
    }
  initLigne() {
    this.selectedLigne = new Ligne();
    this.createForm();
  }

  deleteLigne() {
    this.ligneService.deleteLigne(this.selectedLigne.idLigne).subscribe(
        res => {
          this.selectedLigne = new Ligne();
          this.loadLignes();
        }
    );
  }
}
