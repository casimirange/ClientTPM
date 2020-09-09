import { Component, OnInit } from '@angular/core';
import {Pannes} from "../../../../Models/pannes";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Operateur} from "../../../../Models/operateurs";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PannesService} from "../../../../services/pannes/pannes.service";
import {TechniciensService} from "../../../../services/techniciens/techniciens.service";
import {OperateursService} from "../../../../services/operateurs/operateurs.service";
import {Technicien} from "../../../../Models/techniciens";

@Component({
  selector: 'app-edit-panne',
  templateUrl: './edit-panne.component.html',
  styleUrls: ['./edit-panne.component.scss']
})
export class EditPanneComponent implements OnInit {

  headings = 'Panne N° ';
  subheadings = 'Déclarez les pannes survenues au cours de la journée';
  icons = 'fa fa-wrench icon-gradient bg-heavy-rain';

  suitePanForm: FormGroup;
  operateurs: Operateur[];
  selop: Operateur;
  techniciens: Technicien[];
  panne: Pannes;
  pn: Pannes;
  continuePanne: Pannes;
  unPan: Pannes[];
  closeResult: any;
  Tpannes: Pannes[];

  constructor(private opService: OperateursService,
              private techService: TechniciensService,
              private fb: FormBuilder,
              private panneService: PannesService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private router: Router) {
    this.createForm();
    this.panne = new Pannes();
    this.pn = new Pannes();
    this.continuePanne = new Pannes();
    this.selop = new Operateur();


  }

  createForm() {
    this.suitePanForm = this.fb.group({
      dateP: [''],
      idMachine: ['', [Validators.required]],
      heureArret: ['', [Validators.required]],
      debutInter: ['', [Validators.required]],
      finInter: ['', [Validators.required]],
      idOperateur: ['', [Validators.required]],
      numero: [''],
      idTechnicien: this.fb.array([]),
      description: [''],
      cause: ['', [Validators.required, Validators.minLength(5)]],
      details: ['', [Validators.required, Validators.minLength(5)]],
      outil: [''],
      qte: [''],
      ref: [''],
      pic1: [''],
      etat: [''],
    });


  }

  ngOnInit() {
    this.loadOperateurs();
    this.loadActiveTechniciens();
    this.loadUnfinishedPannes();
    this.loadTechPannes(this.panne);
    this.showPanne();
  }

  dateUpdate(){
    console.log('date')
  }

  causeUpdate(){
    console.log('cause')
  }

  haUpdate(){
    console.log('ha')
  }

  fiUpdate(){
    console.log('fi')
  }

  diUpdate(){
    console.log('di')
  }

  machUpdate(){
    console.log('machine')
  }

  opUpdate(){
    console.log('operateur')
  }

  TecUpdate(){
    console.log('tech')
  }

  DescUpdate(){
    console.log('desc')
  }

  DetUpdate(){
    console.log('detail')
  }

  OutilUpdate(){
    console.log('outil')
  }

  EtatUpdate(){
    console.log('etat')
    this.panneService.activePanne(this.suitePanForm.controls['numero'].value).subscribe(
        res => {
          this.router.navigateByUrl('/pannes')
          console.log('panne modifiée')
        }
    );

    const Swal = require('sweetalert2');
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Panne Modifiée'
    });
  }

  endPanne() {
    const dates = new Date(this.suitePanForm.controls['heureArret'].value).toLocaleTimeString().slice(0,5);
    const dates1 = new Date(this.suitePanForm.controls['heureArret'].value).toISOString().slice(0,10);
    // dates = this.suitePanForm.controls['heureArret'].value;
    console.log('date :' +this.suitePanForm.controls['dateP'].value);
    console.log('aret :' +this.suitePanForm.controls['heureArret'].value);
    console.log('aret2 : ' +dates1+'T'+dates);
    console.log('di :' +this.suitePanForm.controls['debutInter'].value);
    console.log('operateur :' +this.suitePanForm.controls['idOperateur'].value);

    // this.panne.idT = this.suitePanForm.controls['idTechnicien'].value ? this.suitePanForm.controls['idTechnicien'].value : [];
    //
    // //ici je parcours la liste des utilisateurs ajoutés puis j'insère
    //
    // for (let x = 0; x < this.panne.idT.length; x++) {
    //   console.log('nbre enrg ' + x);
    //   console.log(this.panne.idT[x]);
    //   console.log('hum ' + this.suitePanForm.controls['idTechnicien'].value[x]);
    //   this.pn.date = this.suitePanForm.controls['dateP'].value;
    //   this.pn.idMachine = this.suitePanForm.controls['idMachine'].value;
    //   this.pn.heureArret = this.suitePanForm.controls['heureArret'].value.toString();
    //   this.pn.debutInter = this.suitePanForm.controls['debutInter'].value.toString();
    //   this.pn.finInter = this.suitePanForm.controls['finInter'].value.toString();
    //   this.pn.idOperateur = this.suitePanForm.controls['idOperateur'].value;
    //   this.pn.idTechnicien = this.suitePanForm.controls['idTechnicien'].value[x];
    //   this.pn.description = this.suitePanForm.controls['description'].value;
    //   this.pn.cause = this.suitePanForm.controls['cause'].value;
    //   this.pn.details = this.suitePanForm.controls['details'].value;
    //   this.pn.outil = this.suitePanForm.controls['outil'].value;
    //   this.pn.qte = this.suitePanForm.controls['qte'].value;
    //   this.pn.ref = this.suitePanForm.controls['ref'].value;
    //   this.pn.etat = true;
    //   this.pn.numero = this.suitePanForm.controls['numero'].value;
    //   this.pn.cont = false;
    //   this.pn.quart = 2;
    //
    //   // this.panneService.activePanne(this.pn.numero).subscribe(
    //   //     res => {
    //   //       console.log('panne terminée')
    //   //     }
    //   // );
    //   //
    //   console.log("panne end");
    //   console.log(this.pn);
    //
    //   this.panneService.addPannes(this.pn).subscribe(
    //       res => {
    //
    //         this.router.navigateByUrl('/pannes')
    //
    //       }
    //   );
    // }
    //
    // const Swal = require('sweetalert2');
    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 5000,
    //   timerProgressBar: true,
    //   onOpen: (toast) => {
    //     toast.addEventListener('mouseenter', Swal.stopTimer);
    //     toast.addEventListener('mouseleave', Swal.resumeTimer);
    //   }
    // });
    //
    // Toast.fire({
    //   icon: 'success',
    //   title: 'Panne Achevée'
    // });

  }

  initPanne(){
    this.panne = new Pannes();
    this.pn = new Pannes();
    // this.createForm();
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

  loadActiveTechniciens() {
    this.techService.getActiveTechniciens().subscribe(
        data => {
          this.techniciens = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
          console.log(this.techniciens)
        }
    );
  }

  loadUnfinishedPannes() {
    this.panneService.getUnfinishedPannes().subscribe(
        data => {
          this.unPan = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
          console.log(this.unPan)
        }
    );
  }

  getTechni() {
    return this.suitePanForm.get('idTechnicien') as FormArray;
  }

  onAddTech() {
    const newControl = this.fb.control('', Validators.required);
    this.getTechni().push(newControl);
  }

  onMoveTech(i: number) {
    const newControl = this.fb.control('', Validators.required);
    this.getTechni().removeAt(i);
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
        }, (reason) =>{

        }
    );
  }

  loadTechPannes(pan: Pannes){

    this.panneService.getTechPannes(pan.numero).subscribe(
        data => {
          this.Tpannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes Techniques');
          console.log(this.Tpannes);
        }
    );
  }


  showPanne() {
    this.route.params.subscribe(params => {
      this.panneService.showPannes(params['numero']).subscribe(
          res => {
            this.continuePanne = res;
            // headings = this.continuePanne.machine;
            console.log("Panne");
            console.log(this.continuePanne);
            console.log("Panne Num");
            console.log(this.continuePanne.numero);
          }
      )
    })
  }

  resetState(){

  }

}
