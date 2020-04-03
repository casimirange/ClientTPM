import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {PannesService} from "../../../services/pannes/pannes.service";
import {Pannes} from "../../../Models/pannes";
import {AgGridAngular} from "ag-grid-angular"
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";

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


  @ViewChild('agGrid', {static: false }) agGrid: AgGridAngular;

  columnDefs = [
    {headerName: 'Date',
     field: 'date',
     sortable: true,
     filter: 'agDateColumnFilter',
     checkboxSelection: true
    },
    {headerName: 'Cause', field: 'cause', sortable: true, filter: true , cacheQuickFilter: true},
    {headerName: 'Détails', field: 'détails', sortable: true, filter: true},
    {headerName: 'Price', field: 'numero', sortable: true, filter: 'agNumberColumnFilter',
      aggFunc: 'sum',},
    {headerName: 'Machines', field: 'idMachine' , sortable: true, filter: 'agNumberColumnFilter',
      aggFunc: 'sum',}
  ];

  rowData: any;
  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private machineService: MachinesService) { }

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
    this.panneService.getPannes().subscribe(
        data => {
          this.pannes = data;
          this.machines = this.pannes.map(node => node.machine);
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

}
