import { Component, OnInit } from '@angular/core';
import {TechniciensService} from "../../services/techniciens/techniciens.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Technicien} from "../../Models/techniciens";
import  Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'

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
  ActiveTec: Technicien[];
  DesactiveTec: Technicien[];

  selectedTech: Technicien;



  constructor(private techService: TechniciensService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.techForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      matricule: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadTechniciens();
    this.initTech();
    this.loadActiveTechniciens();
    this.loadDesactiveTechniciens();
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

    loadActiveTechniciens() {
        this.techService.getActiveTechniciens().subscribe(
            data => {
                this.ActiveTec = data

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des techniciens actifs');
                console.log(this.ActiveTec)
            }
        );
    }

    loadDesactiveTechniciens() {
        this.techService.getDesactiveTechniciens().subscribe(
            data => {
                this.DesactiveTec = data

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des techniciens actifs');
                console.log(this.DesactiveTec)
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
          this.loadActiveTechniciens();
          this.loadDesactiveTechniciens();
        }
    );

  }





  updateTechnicien() {
    this.techService.updateTech(this.selectedTech).subscribe(
        res => {
          this.initTech();
            this.loadTechniciens();
            this.loadActiveTechniciens();
            this.loadDesactiveTechniciens();
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
            this.loadActiveTechniciens();
            this.loadDesactiveTechniciens();
        }
    );
  }

  activeTechnicien(){
      this.techService.activeTech(this.selectedTech.matricule).subscribe(
          res => {
              this.initTech();
              this.loadActiveTechniciens();
              this.loadDesactiveTechniciens();
          }
      );
  }

    swl(tec: Technicien){
        Swal.fire({
            title: 'Activation',
            text: "Voulez-vous activer/désactiver " + tec.nom.toUpperCase().bold(),
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#00ace6',
            cancelButtonColor: '#f65656',
            confirmButtonText: 'OUI',
            cancelButtonText: 'Annuler',
            allowOutsideClick: false,
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                this.activeTechnicien();
                Swal.fire({
                    title: 'Activation',
                    text: "Utilisateur " + tec.nom.toUpperCase().bold() + " bien activé/désactivé!",
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            }
        })
    }

}
