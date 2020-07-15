import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LignesService} from "../../services/lignes/lignes.service";
import {MachinesService} from "../../services/machines/machines.service";
import {Ligne} from "../../Models/lignes";
import {Machine} from "../../Models/machines";
import * as _ from 'lodash';
import {forEachComment} from "tslint";
import {variable} from "@angular/compiler/src/output/output_ast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  
  headings = 'Machines';
  subheadings = 'Chaque machine appartient obligatoirement à une ligne';
  icons = 'fa fa-road icon-gradient bg-primary';

  machineModel: Machine;
  machines: Machine[];
  machineForm: FormGroup;

  operation: string = 'add';

  selectedMachine: Machine;

  ligns: Ligne[];
  ligns2: Ligne[];
  newligne: Ligne;

  constructor(private fb: FormBuilder, private ligneService: LignesService,
              private router: Router,
              private machineService: MachinesService)
      {
        this.createForm();
        this.machineModel = new Machine();
        this.newligne= new Ligne();
      }

  createForm() {
    this.machineForm = this.fb.group({
      nom: ['', [Validators.required]],
      cc: ['', [Validators.required]],
      code: ['', [Validators.required]],
      label: ['', [Validators.required]],
      depL: ['']
    });
  }

  ngOnInit() {
    this.loadMachines();
    this.loadligns();
    this.initMachine();
  }

  loadMachines() {
    this.machineService.getMachines().subscribe(
        data => {

          this.machines = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des lignes');
          console.log(this.machines);
          console.log('liste des lignes', this.machines);
        }
    );
  }

  loadligns() {
    this.ligneService.getAllLignes().subscribe(
        data => {
          this.ligns = data
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des départements');
          console.log(this.ligns)
        }
    );
  }

  addMachine() {
    var liste, texte;
    liste = document.getElementById("liste");
    texte = liste.options[liste.selectedIndex].text;
    console.log("model_ligne:" + texte);
    let indexDep = _.findIndex(this.ligns, (o => {
      return o.nomLigne == texte;
    }));

    this.newligne = this.ligns[indexDep];
    this.machineModel.idLigne = this.newligne.idLigne;
    this.machineModel.nom = this.machineForm.controls['nom'].value;
    this.machineModel.code = this.machineForm.controls['code'].value;
    this.machineModel.centreCout = this.machineForm.controls['cc'].value;
    this.machineModel.label = this.machineForm.controls['label'].value;
    console.log("index", indexDep);
    console.log("model", this.machineModel);

    console.log("ligne :" + this.newligne.idLigne);
    console.log("nom :" + this.machineForm.controls['nom'].value);
    console.log("code :" + this.machineForm.controls['code'].value);
    console.log("cc :" + this.machineForm.controls['cc'].value);
    console.log("label :" + this.machineForm.controls['label'].value);



    //dès qu'on crée la ligne on affiche immédiatement la liste
    this.machineService.addMachine(this.machineModel).subscribe(
        res => {
          this.initMachine();
          this.loadMachines();
        }
    );
  }

  updateMachine() {
    var liste, texte;
    liste = document.getElementById("liste");
    texte = liste.options[liste.selectedIndex].text;
    console.log("model_ligne:" + texte);
    let indexDep = _.findIndex(this.ligns, (o => {
      return o.nomLigne == texte;
    }));

    this.newligne = this.ligns[indexDep];
    this.machineModel.idLigne = this.newligne.idLigne;
    this.machineModel.nom = this.machineForm.controls['nom'].value;
    this.machineModel.code = this.machineForm.controls['code'].value;
    this.machineModel.centreCout = this.machineForm.controls['cc'].value;
    this.machineModel.label = this.machineForm.controls['label'].value;
    console.log("index", indexDep);
    console.log("model", this.machineModel);

    console.log("ligne :" + this.newligne.idLigne);
    console.log("nom :" + this.machineForm.controls['nom'].value)
    console.log("code :" + this.machineForm.controls['code'].value)
    console.log("cc :" + this.machineForm.controls['cc'].value)
    console.log("label :" + this.machineForm.controls['label'].value)
    this.machineService.updateMachine(this.selectedMachine).subscribe(
        res => {
          this.initMachine();
          this.loadMachines();
        }
    );
  }

  initMachine() {
    this.selectedMachine = new Machine();
    this.createForm();
  }

  deleteMachine() {
    this.machineService.deleteMachine(this.selectedMachine.idMachine).subscribe(
        res => {
          this.selectedMachine = new Machine();
          this.loadMachines();
        }
    );
  }

  showMachine(m: Machine){
    let url = btoa(m.idMachine.toString());
    this.router.navigateByUrl("machines/"+url);
  }

}
