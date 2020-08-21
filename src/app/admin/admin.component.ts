import { Component, OnInit } from '@angular/core';
// import { UserService } from '../services/users.service';
import {UserService} from "../services/user/user.service";
import {DatePipe} from "@angular/common";
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as jsPDF from 'jspdf';
import  * as html2canvas from "html2canvas";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;

  pdfMake = require('pdfmake/build/pdfmake.js');
  pdfFonts = require('pdfmake/build/vfs_fonts.js');


  constructor(private userService: UserService,private datePipe: DatePipe ) { this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs; }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  async generatePdf(){
    const dat = new Date().toLocaleDateString();

    var pdf2 = document.getElementById('pdf2');

    // const pdf = new jsPDF('p', 'mm', 'a4');
    // // pdf.title("titre du document");
    // pdf.text('premier texte avant l\'image');

    // html2canvas(pdf2).then(canvas => {
    //   var imgWidth = 208;
    //   var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   var heightLeft = imgHeight;
    //   var documentProperties = {
    //     'title': 'Rapport du mois de Juillet 2020',
    //     'subject': 'subject test',
    //     'author': 'casimir ouandji',
    //     'keywords': 'BI, MTBF, MDT',
    //     'creator': 'NUTZER'
    //   };
    //
    //   const contentDataURL = canvas.toDataURL('image/png');
    //   let pdfExport = new jsPDF('p', 'mm', 'a4'); //orientation(portrait, landscape), unité(cm, mm, m...), format(A0, A2, A3, A4, A5...)
    //   var position = 80;
    //
    //   pdfExport.text('premier texte avant l\'image', 25,15);
    //   pdfExport.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdfExport.save('BI Alpicam Stats2');
    //   pdfExport.save('BI Alpicam');
    // });

    const documentDefinition = {

      style: {
        entete:{
          italics: true,
          color: '#f65656'
        }
      },

      watermark: {
        text: 'ACON',
        color: '#F65656',
        opacity: 0.3,
        bold: true,
        italics: false
      },
      title: 'titre du doc',
      author: 'auteur: casimir',
      subject: 'subject: sujets',
      keywords: 'mots clés',
      pageOrientation: 'portrait',
      footer: function (currentPage, pageCount) {
        return [
          {
            columns: [
              {text: 'www.alpiwood.com', style: 'entete', margin: [20,0]},
              {text: currentPage.toString() + ' /' + pageCount, alignment: 'right', style: 'entete', margin: [20,0]}
            ]
          },
          // (currentPage.toString() +'/'+pageCount)

        ]
      },
      header: function (currentPage, pageCount, pageSize) {
        // columns: [
        //     'left',
        //   {text: return currentPage.toString() + ' /' + pageCount;, alignment: 'right'}
        // ]

        return [
          {text: 'rapport du mois de '+dat+' ', alignment: 'right', style: 'entete', margin: [20,10]},
          {canvas: [
            {type: 'rect', x:170, y:32, w: pageSize.width -170, h:40}
          ]}
        ]
      },
      // background: 'simple Text',
      content: [
        {
          text:'This is an sample PDF printed with pdfMake casimir ange ACON',
        },
        {
          image:  await this.getBase64ImageFromURL('../../assets/images/originals/wood.JPG?auto=compress&cs=tinysrgb&dpr=1&w=300')
        },
        {
          text:'This is an sample PDF printed with pdfMake casimir ange ACON',
        },
        {
          image: await this.getBase64ImageFromURL('https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300')
        }
      ]
      };
    this.pdfMake.createPdf(documentDefinition).open();
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }
}
