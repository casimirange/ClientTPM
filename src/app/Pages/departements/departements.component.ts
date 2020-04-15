import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Departement} from '../../Models/departement';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartementsService} from "../../services/departements/departements.service";
import {ActivatedRoute, Router} from "@angular/router";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-departements',
    templateUrl: './departements.component.html',
    styleUrls: ['./departements.component.css']
})
export class DepartementsComponent implements OnInit {

    departements: Departement[];

    heading = 'Départements';
    subheading = 'Gérez les départements dans l\'application';
    icon = 'fa fa-home icon-gradient bg-mixed-hopes';

    depForm: FormGroup;

    centres: any = ['B300', 'B304', 'B470', 'B510', 'B330'];

    operation: string = 'add';

    selectedDep: Departement;
    newDep: Departement;

    closeResult: string;

    constructor(private fb: FormBuilder, private departementService: DepartementsService, private route: ActivatedRoute, private router: Router, ) {
        this.createForm();
        this.newDep = new Departement();
    }

    createForm() {
        this.depForm = this.fb.group({
            nom: ['', [Validators.required]],
            centre_cout: ['', [Validators.required]],
            responsable: ['', [Validators.required]]
        });
    }

    // open(content) {
    //     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //         this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    // }
    //
    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return  `with: ${reason}`;
    //     }
    // }


    ngOnInit() {
        this.loadDepartements();
        this.initDep();
         // this.departements = this.route.snapshot.data.departements;
    }

    loadDepartements() {
        this.departementService.getDepartements().subscribe(
            data => {
                this.departements = data
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des départements');
                console.log(this.departements)
            }
        );
    }

    addDepartement() {
        const d = this.depForm.value;
        console.log(d);
        var liste, texte;
        liste = document.getElementById("cc");
        texte = liste.options[liste.selectedIndex].text;
        console.log("centre_de_cout:"+texte );
        this.newDep.nom = this.depForm.controls['nom'].value;
        this.newDep.responsable = this.depForm.controls['responsable'].value;
        this.newDep.centre_cout = texte;
        console.log("model",this.newDep);

        //dès qu'on crée le département on affiche immédiatement la liste
        this.departementService.addDep(this.newDep).subscribe(
            res => {
                this.initDep();
                this.loadDepartements();
            }
        );
    }

    updateDepartement() {
        var liste, texte;
        liste = document.getElementById("cc");
        texte = liste.options[liste.selectedIndex].text;
        console.log("centre_de_cout:"+texte );
        this.selectedDep.nom = this.depForm.controls['nom'].value;
        this.selectedDep.responsable = this.depForm.controls['responsable'].value;
        this.selectedDep.centre_cout = texte;
        console.log("model",this.newDep);
        this.departementService.updateDep(this.selectedDep).subscribe(
            res => {
                this.initDep();
                this.loadDepartements();
            }
        );
    }

    initDep() {
        this.selectedDep = new Departement();
        this.createForm();
    }

    deleteDepartement() {
        this.departementService.deleteDep(this.selectedDep.idDepartement).subscribe(
            res => {
                this.selectedDep = new Departement();
                this.loadDepartements();
            }
        );
    }



}
