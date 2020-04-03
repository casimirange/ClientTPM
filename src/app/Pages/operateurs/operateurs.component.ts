import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Operateur} from "../../Models/operateurs";
import {OperateursService} from "../../services/operateurs/operateurs.service";

@Component({
  selector: 'app-operateurs',
  templateUrl: './operateurs.component.html',
  styleUrls: ['./operateurs.component.css']
})
export class OperateursComponent implements OnInit {

  headings = 'Operateurs';
  subheadings = 'Gérez les opérateurs dans l\'application';
  icons = 'fa fa-user icon-gradient bg-mixed-hopes';

  opForm: FormGroup;

  operation: string = 'add';

  operateurs: Operateur[];

  selectedOp: Operateur;

  constructor(private opService: OperateursService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.opForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      matricule: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadOperateurs();
    this.initOp();

  }

  loadOperateurs() {
    this.opService.getOperateurs().subscribe(
        data => {
          this.operateurs = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens');
          console.log(this.operateurs)
        }
    );
  }

  addOperateur() {
    const o = this.opForm.value;
    console.log(o);

    //dès qu'on crée le département on affiche immédiatement la liste
    this.opService.addOp(o).subscribe(
        res => {
          this.initOp();
          this.loadOperateurs();
        }
    );
  }

  updateOperateur() {
    this.opService.updateOp(this.selectedOp).subscribe(
        res => {
          this.initOp();
          this.loadOperateurs();
        }
    );
  }

  initOp() {
    this.selectedOp= new Operateur();
    this.createForm();
  }

  deleteOperateur() {
    this.opService.deleteOp(this.selectedOp.matricule).subscribe(
        res => {
          this.selectedOp= new Operateur();
          this.loadOperateurs();
        }
    );
  }


}
