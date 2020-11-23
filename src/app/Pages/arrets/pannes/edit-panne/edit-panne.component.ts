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
import {MachinesService} from "../../../../services/machines/machines.service";
import {Machine} from "../../../../Models/machines";
import DateTimeFormat = Intl.DateTimeFormat;
import {Location} from "@angular/common";
import {TokenStorageService} from "../../../../auth/token-storage.service";

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
  tecForm: FormGroup;
  operateurs: Operateur[];
  selop: Operateur;
  techniciens: Technicien[];
  panne: Pannes;
  pn: Pannes;
  continuePanne: Pannes;
  unPan: Pannes[];
  closeResult: any;
  Tpannes: Pannes[];
  machines: Machine[];
  Detailspannes: any[];
  cause1: string;
  details1: string;
  desc1: string;
  cause2: string;
  details2: string;
  desc2: string;
  ha1: any;
  di1: any;
  fi1: any;
  ha2: any;
  di2: any;
  fi2: any;
  outil1: any;
  qte1: any;
  ref1: any;
  outil2: any;
  qte2: any;
  ref2: any;
  OP1: any;
  OP2: any;
  Hpannes: any[];
  Opannes: any[];
  Outilpannes: any[];
  techs: any[];
  TEC1: any[] = [];
  TEC2: any[] = [];
  term: string;
  p: number;
  f: Date;
  d: Date;
  dat: Date;
  ha: DateTimeFormat;
  fi: DateTimeFormat;
  di: DateTimeFormat;
  piece: string;
  periode: string;
  periodde: string;
  machsss: string;
  ops: string;
  technis: string;

  caus: string;
  det: string;
  ou: string;
  ajout: boolean = false;

  private roles: string[];
  public authority: string;

  constructor(private opService: OperateursService,
              private techService: TechniciensService,
              private machineService: MachinesService,
              private fb: FormBuilder,
              private panneService: PannesService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private router: Router, private _location: Location) {
    this.createForm();
    this.createsForm();
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
      idtec: ['', [Validators.required]],
      description: [''],
      cause: ['', [Validators.required, Validators.minLength(5)]],
      details: ['', [Validators.required, Validators.minLength(5)]],
      outil: [''],
      qte: [''],
      ref: [''],
      pic1: [''],
      etat: [''],
      qrt: [''],
    });


  }

  createsForm() {
    this.tecForm = this.fb.group({
      idTech: ['', [Validators.required]],
    });


  }
  test(){
    this.TEC2 = [];
    this.TEC1 = [];
    this.panneService.getTechPannes(this.continuePanne.numero).subscribe(
        data => {
          this.techs = data;

          let x, y;
          for (let pain of data){
            if(pain.quart == 1){
              x = pain;
              this.TEC1.push(x);
            }else{
              y = pain;
              this.TEC2.push(y);
            }
          }
          console.log('quart 1: ')
          console.log(this.TEC1)
          console.log('quart 2:')
          console.log(this.TEC2)
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens de la panne N°'+this.continuePanne.numero);
          console.log(this.techs);
        }
    );
  }


  ngOnInit() {
    this.loadOperateurs();
    this.loadActiveTechniciens();
    this.loadUnfinishedPannes();
    this.loadTechPannes(this.panne);
    this.showPanne();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        // 'ROLE_USER_ALPI,,,,,,,'
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          return false;
        } else if (role === 'ROLE_USER_MINDOUROU') {
          this.authority = 'user_mind';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_PLACAGE') {
          this.authority = 'resp_pla';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_SCIERIE') {
          this.authority = 'resp_sci';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_BRAZIL') {
          this.authority = 'resp_bra';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_CP') {
          this.authority = 'resp_cp';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_MAINTENANCE') {
          this.authority = 'resp_maint';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_MINDOUROU') {
          this.authority = 'resp_mind';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;

        }
        this.authority = 'user_alpi';
        const Swal = require('sweetalert2');
          var content = document.createElement('div');
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
        return true;
      });
    }
  }

  dateUpdate(){
    console.log('date')

    this.panneService.updateDate(this.continuePanne.numero, this.suitePanForm.controls['dateP'].value).subscribe(
        res => {
          this.router.navigateByUrl('/pannes')
          console.log('Date modifiée')
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

  swl(pan: Pannes){
    console.log('l\'ID de la panne est:'+ pan.id_panne);
    const Swal = require('sweetalert2');
    var content = document.createElement('div');
    content.innerHTML = 'Voulez-vous vraiment supprimer ce technicien <strong>' + pan.nomTec.toString()+' '+pan.preTec.toString()+ '</strong> à la ligne <b>'+pan.id_panne+'</b> ?';
    Swal.fire({
      title: 'Suppression',
      html: content,
      icon: 'error',
      footer: '<a >Cette action est irréversible</a>',

      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: true,
      focusConfirm: false,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.panneService.deleteTechPannes(pan.id_panne).subscribe(
            res => {
              console.log('technicien Supprimé!!')
            }
        );
        Swal.fire({
          title: 'Suppression !',
          text: "le technicien a été supprimé avec succès!",
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    })
  }

  updateTec(pan: Pannes){
    console.log('l\'ID de la panne est:'+ pan.id_panne);
    const Swal = require('sweetalert2');
    var content = document.createElement('div');
    content.innerHTML = 'Voulez-vous vraiment le remplacer par ce technicien <strong>' + pan.nomTec.toString()+' '+pan.preTec.toString()+ '</strong> à la ligne <b>'+pan.id_panne+'</b> ?';
    Swal.fire({
      title: 'Modification',
      html: content,
      icon: 'warning',
      footer: '<a >Cette action est irréversible</a>',

      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: true,
      focusConfirm: false,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.panneService.updateTechPannes(pan.id_panne).subscribe(
            res => {
              console.log('technicien Modifié!!')
            }
        );
        Swal.fire({
          title: 'Suppression !',
          text: "le technicien a été modifié avec succès!",
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    })
  }

  infoPanne(){
    this.panneService.getDetailsPannes(this.continuePanne.numero).subscribe(
        data => {
          this.Detailspannes = data;

          this.cause1 = data[0].cause;
          this.desc1 = data[0].description;
          this.details1 = data[0].details;
          this.cause2 = data[1].cause;
          this.desc2 = data[1].description;
          this.details2 = data[1].details;

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des details');
          console.log(this.Detailspannes);
        }
    );

    this.panneService.getHeurePannes(this.continuePanne.numero).subscribe(
        data => {
          this.Hpannes = data;

          this.ha1 = data[0].heure_arret;
          this.di1 = data[0].debut_inter;
          this.fi1 = data[0].fin_inter;
          this.ha2 = data[1].heure_arret;
          this.di2 = data[1].debut_inter;
          this.fi2 = data[1].fin_inter;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des heures');
          console.log(this.Hpannes);
        }
    );

    this.panneService.getOpPannes(this.continuePanne.numero).subscribe(
        data => {
          this.Opannes = data;
          this.OP1 = data[0];
          this.OP2 = data[1];
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes Operateur');
          console.log(this.Opannes);
        }
    );

    this.panneService.getOutilsPannes(this.continuePanne.numero).subscribe(
        data => {
          this.Outilpannes = data;
          this.outil1 = data[0].outil;
          this.qte1 = data[0].qte;
          this.ref1 = data[0].ref;
          this.outil2 = data[1].outil;
          this.qte2 = data[1].qte;
          this.ref2 = data[1].ref;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des outils');
          console.log(this.Outilpannes);
        }
    );

    this.panneService.getTechPannes(this.continuePanne.numero).subscribe(
        data => {
          this.techs = data;
          for (let pain of data){
            if(pain.quart == 1){
              this.TEC1.push(pain);
              console.log('quart 1: \n'+ this.TEC1)
            }else{
              this.TEC2.push(pain);
              console.log('quart 2: \n'+ this.TEC2)
            }
          }
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens de la panne N°'+this.continuePanne.numero);
          console.log(this.techs);
        }
    );
  }


  causeUpdate(){
    console.log('cause');
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panneService.updateCause(this.continuePanne.numero, quart, this.suitePanForm.controls['cause'].value).subscribe(
        res => {
          this.createForm();
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
      title: 'Cause modifiée !'
    });

  }

  haUpdate(){
    console.log('ha')
    console.log('ha1: ' + this.continuePanne.heure_arret);
    this.panne =  this.continuePanne;
    this.panne.heure_arret =  this.suitePanForm.controls['heureArret'].value;
    this.panne.debut_inter =  this.suitePanForm.controls['debutInter'].value;
    this.panne.fin_inter =  this.suitePanForm.controls['finInter'].value;
    console.log('ha2: ' + this.panne.heure_arret);
    console.log('ha3: ' + this.continuePanne.heure_arret);
    console.log('hf: ' + this.panne.fin_inter);
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panneService.updateHeureArret(this.continuePanne.numero, quart, this.panne.heure_arret, this.panne.debut_inter, this.panne.fin_inter).subscribe(
        res => {
          this.createForm();
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
      title: 'Période modifiée !'
    });

  }

  fiUpdate(){
    console.log('fi')
  }

  diUpdate(){
    console.log('di')
  }

  machUpdate(){
    console.log('machine')
    this.panneService.updateMachine(this.continuePanne.numero, this.suitePanForm.controls['idMachine'].value).subscribe(
        res => {
          this.createForm();
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
      title: 'Machine modifiée !'
    });
  }

  opUpdate(){
    console.log('operateur')
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panne = this.continuePanne
    console.log('operateur: '+ this.continuePanne.idOperateur);
    console.log('operateur2: '+ this.suitePanForm.controls['idOperateur'].value);
    this.panneService.updateOperateur(this.continuePanne.numero, quart, this.suitePanForm.controls['idOperateur'].value).subscribe(
        res => {
          this.createForm();
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
      title: 'OPérateur modifié !'
    });
  }

  addTec(){
    console.log('operateur')
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panne = this.continuePanne
    console.log('tech: '+ this.suitePanForm.controls['idtec'].value);
    // console.log('operateur2: '+ this.suitePanForm.controls['idOperateur'].value);
    this.panneService.addTech(this.continuePanne.numero, quart, this.suitePanForm.controls['idtec'].value).subscribe(
        res => {
          this.createForm();
        }
    );
  }

  TecUpdate(){
    console.log('tech')
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panneService.updateDetails(this.continuePanne.numero, quart, this.suitePanForm.controls['details'].value).subscribe(
        res => {
          this.createForm();
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
      title: 'Détails d\'intervention modifié !'
    });
  }

  DescUpdate(){
    console.log('desc');
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panneService.updateDescription(this.continuePanne.numero, this.suitePanForm.controls['description'].value).subscribe(
        res => {
          this.createForm();
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
      title: 'Description modifiée !'
    });
  }

  DetUpdate(){
    console.log('detail');
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panneService.updateDetails(this.continuePanne.numero, quart, this.suitePanForm.controls['details'].value).subscribe(
        res => {
          this.createForm();
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
      title: 'Détails d\'intervention modifié !'
    });
  }

  OutilUpdate(){
    console.log('outil')
    console.log('ha1: ' + this.continuePanne.heure_arret);
    this.panne =  this.continuePanne;
    this.panne.outil =  this.suitePanForm.controls['outil'].value;
    this.panne.qte =  this.suitePanForm.controls['qte'].value;
    this.panne.ref =  this.suitePanForm.controls['ref'].value;
    const quart = (this.continuePanne.cont == false && this.continuePanne.etat == true) ? this.suitePanForm.controls['qrt'].value : 1;
    console.log('quart: '+quart);
    this.panneService.updateOutils(this.continuePanne.numero, quart, this.panne.outil, this.panne.qte, this.panne.ref).subscribe(
        res => {
          this.createForm();
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
      title: 'Outil modifié !'
    });
  }

  EtatUpdate(){
    console.log('etat')
    this.panneService.updateEtat(this.continuePanne.numero).subscribe(
        res => {
          this.router.navigateByUrl('/pannes')
          console.log('Etat modifié!')
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
    this.opService.getActiveOperateurs().subscribe(
        data => {
          this.operateurs = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des opérateurs');
          console.log(this.operateurs)
        }
    );
    this.machineService.getActiveMachines().subscribe(
        data => {
          this.machines = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des opérateurs');
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
    this.ajout = true;
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
        }, (reason) =>{

        }
    );
  }

  loadTechPannes(pan: Pannes){

    // this.panneService.getTechPannes(pan.numero).subscribe(
    //     data => {
    //       this.Tpannes = data;
    //     },
    //     error => {
    //       console.log('une erreur a été détectée!')
    //     },
    //     () => {
    //       console.log('chargement des pannes Techniques');
    //       console.log(this.Tpannes);
    //     }
    // );
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
