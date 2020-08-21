import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-erreur404',
  templateUrl: './erreur404.component.html',
  styleUrls: ['./erreur404.component.css']
})
export class Erreur404Component implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked(){
    this._location.back();
  }
}
