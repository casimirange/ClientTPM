import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {PannesService} from "../../../services/pannes/pannes.service";
import {Pannes} from "../../../Models/pannes";
import {AgGridAngular} from "ag-grid-angular"
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
// import  Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pannes',
  templateUrl: './pannes.component.html',
  styleUrls: ['./pannes.component.css']
})
export class PannesComponent implements OnInit {

  headings = 'Pannes';
  subheadings = 'Consultez la liste des pannes survenues';
  icons = 'fa fa-cog icon-gradient bg-primary';

  pannes: Pannes[];
  selectedPanne: Pannes;

  machines: Machine[];
    closeResult: any;

  rowData: any;
  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private machineService: MachinesService,
              private modalService: NgbModal  ) { }

  ngOnInit() {
    this.loadPannes();
  }

  // getSelectionRow(){
  //   const selectedNodes = this.pannes;
  //   const selectedData = selectedNodes.map(node => node.cause);
  //   const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(", ");
  //   alert(`Selected Node: ${selectedDataStringPresentation}`);
  // }

  loadPannes(){
    this.panneService.getAllPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes');
          console.log(this.pannes);
        }
    );
  }

  open(content){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
      }, (reason) =>{

          }
      );
  }

}
