import { Component, OnInit } from '@angular/core';
import {TechniciensService} from "../../services/techniciens/techniciens.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Technicien} from "../../Models/techniciens";

@Component({
  selector: 'app-techniciens',
  templateUrl: './techniciens.component.html',
  styleUrls: ['./techniciens.component.css']
})
export class TechniciensComponent implements OnInit {

  headings = 'Techniciens';
  subheadings = 'Gérez les techniciens dans l\'application';
  icons = 'fa fa-user icon-gradient bg-mixed-hopes';

  techForm: FormGroup;

  operation: string = 'add';

  techniciens: Technicien[];

  selectedTech: Technicien;

  constructor(private techService: TechniciensService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.techForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      matricule: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadTechniciens();
    this.initTech();
  }

  loadTechniciens() {
    this.techService.getTechniciens().subscribe(
        data => {
          this.techniciens = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens');
          console.log(this.techniciens)
        }
    );
  }

  addTechnicien() {
    const t = this.techForm.value;
    console.log(t);

    //dès qu'on crée le département on affiche immédiatement la liste
    this.techService.addTech(t).subscribe(
        res => {
          this.initTech();
          this.loadTechniciens();
        }
    );
  }

  updateTechnicien() {
    this.techService.updateTech(this.selectedTech).subscribe(
        res => {
          this.initTech();
          this.loadTechniciens();
        }
    );
  }

  initTech() {
    this.selectedTech = new Technicien();
    this.createForm();
  }

  deleteTechnicien() {
    this.techService.deleteTech(this.selectedTech.idTechnicien).subscribe(
        res => {
          this.selectedTech = new Technicien();
          this.loadTechniciens();
        }
    );
  }

}
