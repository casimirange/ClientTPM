import { Component, OnInit } from '@angular/core';
import {animate, query, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})


export class BaseLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // this.href = this.r
  }

}
