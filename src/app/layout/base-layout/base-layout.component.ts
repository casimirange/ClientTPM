import { Component, OnInit } from '@angular/core';
import {animate, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  // animations: [
  //
  //   trigger('architectUIAnimation', [
  //     transition('* <=> *', [
  //       query(':enter, :leave', [
  //         style({
  //           opacity: 0,
  //           display: 'flex',
  //           flex: '1',
  //           transform: 'translateY(-20px)',
  //           flexDirection: 'column'
  //
  //         }),
  //       ]),
  //       query(':enter', [
  //         animate('600ms ease', style({opacity: 1, transform: 'translateY(0)'})),
  //       ]),
  //
  //       query(':leave', [
  //         animate('600ms ease', style({opacity: 0, transform: 'translateY(-20px)'})),
  //       ], { optional: true })
  //     ]),
  //   ])
  // ]
})
export class BaseLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
