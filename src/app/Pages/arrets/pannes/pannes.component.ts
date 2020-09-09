import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PannesService} from "../../../services/pannes/pannes.service";
import {Pannes} from "../../../Models/pannes";
import {AgGridAngular} from "ag-grid-angular"
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
// import  Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import jsPDF from 'jspdf';
import {Router} from "@angular/router";

import  * as html2canvas from "html2canvas";
import * as html2pdf from 'html2pdf.js';
// import {content} from "html2canvas/dist/types/src/css";
// import {content} from "html2canvas/dist/types/css";

@Component({
  selector: 'app-pannes',
  templateUrl: './pannes.component.html',
  styleUrls: ['./pannes.component.css']
})
export class PannesComponent implements OnInit {
  headings = 'Pannes';
  subheadings = 'Consultez la liste des pannes survenues';
  icons = 'pe-7s-tools icon-gradient bg-heavy-rain';

  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  rangeForm: FormGroup;
  pannes: Pannes[];
  cpannes: Pannes[];
  Tpannes: Pannes[];
  Opannes: Pannes[];
  Detailspannes: Pannes[];
  Outilpannes: Pannes[];
  Hpannes: Pannes[];
  times: Pannes[];
  selectedPanne: Pannes;
  tail: number;
  tails: number;
  count: number;
  ranger: string = "false";
  pages: number = 7;

  @ViewChild('htmlData', {static: false}) htmlData: ElementRef;

  machines: Machine[];
    closeResult: any;

  dataPanne = {
      labels: [],
      datasets: []
  };



  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private machineService: MachinesService,
              private router: Router,
              private modalService: NgbModal  ) {
      this.createForm();
      this.createForms();
      this.rangeForms();
      this.pageForms();

  }

  ngOnInit() {
    this.loadPannes();
    this.countAllPannes();
    this.loadTimePannes();
    // this.loadTechPannes();
    // this.TodayPannes();
    this.selectedPanne = new Pannes();
    this.getChart();
    // this.loadHeurePannes(this.selectedPanne);
    // this.wt();
  }

  onExport(){

      // var data = document.getElementById('element-pannes');
      //
      // html2canvas(data).then(canvas => {
      //    var imgWidth = 186;
      //    var pageHeight = 295;
      //    var imgHeight = canvas.height * imgWidth/canvas.width;
      //    // var imgHeight = 400;
      //    // var heightLeft = imgHeight;
      //
      //    const contentDataURL = canvas.toDataURL('image/png');
      //    let pdf = new jsPDF('p', 'mm', 'a4'); //orientation(portrait, landscape), unité(cm, mm, m...), format(A0, A2, A3, A4, A5...)
      //    var position  = 10;
      //    // pdf.text('ceci est du texte');
      //
      //    pdf.addImage(contentDataURL, 'PNG', 12, position, imgWidth, imgHeight);
      //
      //
      //    pdf.save('BI Alpicams');
      // });

      html2pdf(html2canvas, {
          margin: 10,
          filename: "my.pdf",
          image: {type: 'jpeg', quality: 1},
          html2canvas: {dpi: 72, letterRendering: true},
          jsPDF: {unit: 'mm', format: 'a4', orientation: 'landscape'},
          pdfCallback: pdfCallback
      })

      function pdfCallback(pdfObject) {
          var number_of_pages = pdfObject.internal.getNumberOfPages();
          var pdf_pages = pdfObject.internal.pages
          var myFooter = "Footer info"
          for (var i = 1; i < pdf_pages.length; i++) {
              // We are telling our pdfObject that we are now working on this page
              pdfObject.setPage(i)
              // The 10,200 value is only for A4 landscape. You need to define your own for other page sizes
              pdfObject.text(myFooter, 10, 200);
              pdfObject.text("my header text", 10, 10);
          }
      }

      // const options = {
      //     filename: 'BI Alpicam',
      //     image: {type: 'jpeg'},
      //     html2canvas: {},
      //     jsPDF: {orientation: 'landscape'}
      // };
      //
      // const content: Element = document.getElementById('element-pannes');
      //
      // html2pdf().from(content).set(options).save();
  }



    public openPDF():void {
        let DATA = this.htmlData.nativeElement;
        let doc = new jsPDF('p','pt', 'a4');

        let handleElement = {
            '#element-pannes':function(element,renderer){
                return true;
            }
        };
        doc.fromHTML(DATA.innerHTML,15,15,{
            'width': 200,
            'elementHandlers': handleElement
        });

        doc.open('angular-demo.pdf');
    }

    createForm() {
        this.searchPanForm = this.fb.group({
            search: [''],
        });
    }

    createForms() {
        this.selectPanForm = this.fb.group({
            periode: ['']
        });
    }

    pageForms() {
        this.pageForm = this.fb.group({
            page: ['']
        });
    }

    rangeForms() {
        this.rangeForm = this.fb.group({
            date1: [''],
            date2: ['']
        });
    }

  loadPannes(){

    this.panneService.getAllPannes().subscribe(
        data => {
          this.pannes = data;
            for (let pin of data){
                this.selectedPanne.numero = pin.numero;
            }
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

  countAllPannes(){

      this.panneService.getCountThisPannes().subscribe(
          data => {
              this.cpannes = data;
              this.count = 0;
              for (let pin of this.cpannes){
                      this.count = this.count + pin.nbre;
              }

          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('Total');
              console.log(this.count);
          }
      );
  }

  countTodayPannes(){

      this.panneService.getCountTodayPannes().subscribe(
          data => {
              this.cpannes = data;
              this.count = 0;
              for (let pin of this.cpannes){
                      this.count = this.count + pin.nbre;
              }
          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('Total');
              console.log(this.count);
          }
      );
  }

  loadTimePannes(){
      this.panneService.getTimePannes().subscribe(
          data => {
              this.times = data;
              this.tails = this.times.length;
              for (let pin of data){
                  this.selectedPanne.heureArret = pin.heureArret;
              }

          }
      );
  }

  loadTechPannes(){

    this.panneService.getTechPannes(this.selectedPanne.numero).subscribe(
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

    this.panneService.getOpPannes(this.selectedPanne.numero).subscribe(
        data => {
          this.Opannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes Techniques');
          console.log(this.Opannes);
        }
    );

    this.panneService.getDetailsPannes(this.selectedPanne.numero).subscribe(
        data => {
          this.Detailspannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes Techniques');
          console.log(this.Detailspannes);
        }
    );

    this.panneService.getOutilsPannes(this.selectedPanne.numero).subscribe(
        data => {
          this.Outilpannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des outils');
          console.log(this.Outilpannes);
        }
    );

      this.panneService.getHeurePannes(this.selectedPanne.numero).subscribe(
          data => {
              this.Hpannes = data;
              this.tail = this.Hpannes.length;
          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('chargement des heures');
              console.log(this.Hpannes);
              console.log('longueur');
              console.log(this.tail);
          }
      );
  }

  TodayPannes(){

    this.panneService.getTodayPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  HierPannes(){

    this.panneService.getHierPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne hier');
          console.log(this.pannes);
        }
    );
  }

  ThisWeekPannes(){

    this.panneService.getThisWeekPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne cette semaine');
          console.log(this.pannes);
        }
    );
  }

  LastWeekPannes(){

    this.panneService.getLastWeekPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  LastMonthPannes(){

    this.panneService.getLastMonthPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  ThisMonthPannes(){

    this.panneService.getThisMonthPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  LastYearPannes(){

    this.panneService.getLastYearPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  ThisYearPannes(){

    this.panneService.getThisYearPannes().subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  rangeDate(){
      console.log('rien');
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;

      console.log(d1 + ' et '+ d2);

      this.panneService.getRangeDatePannes(d1, d2).subscribe(
          data => {
              this.pannes = data;
          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('panne aujourd\'hui');
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

  modal(content){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
      }, (reason) =>{

          }
      );
  }

  getChart(){

      const datasetNbrePanne = {
          label: "Pannes",
          data: [],
          backgroundColor: function(context) {

              var index = context.dataIndex;
              var value = context.dataset.data[index];
              return value > 10 ? '#f65656' :  // draw negative values in red
                  index % 2 ? 'blue' :    // else, alternate values in blue and green
                      'rgba(156, 211, 253, 0.4)';
          },
          borderColor: '#0692fb',
      };

      this.panneService.getCountThisPannes().subscribe(
          list => list.forEach(mach => {
              this.dataPanne.labels.push(mach.machine);
              datasetNbrePanne.data.push(mach.nbre);
          } ) );

      this.dataPanne.datasets.push(datasetNbrePanne);


  }

  findSso($event){
      if (this.selectPanForm.controls['periode'].value == 'hp'){
          this.HierPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'ttesp'){
          this.loadPannes();
          this.countAllPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'tp'){
          this.TodayPannes();
          this.countTodayPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'twp'){
          this.ThisWeekPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'lwp'){
          this.LastWeekPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'tmp'){
          this.ThisMonthPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'lmp'){
          this.LastMonthPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'typ'){
          this.ThisYearPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'lyp'){
          this.LastYearPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'pp'){
          this.ranger = "true";
      }
      else {
          this.ranger = "false";
      }
  }

  paginate($event){
      if (this.pageForm.controls['page'].value == '10'){
          this.pages = 10;
      }
      if (this.pageForm.controls['page'].value == '25'){
          this.pages = 25;
      }
      if (this.pageForm.controls['page'].value == '50'){
          this.pages = 50;
      }
      if (this.pageForm.controls['page'].value == '100'){
          this.pages = 100;
      }
      if (this.pageForm.controls['page'].value == '1000'){
          this.pages = 1000;
      }
  }

    showMachine(m: Machine){
        console.log('machine' + m.nom);
        this.modalService.dismissAll();
        let url = btoa(m.idM.toString());
        this.router.navigateByUrl("machines/"+url);
    }
}
