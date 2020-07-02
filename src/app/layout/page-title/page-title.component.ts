import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent {

  @Input() heading;
  @Input() subheading;
  @Input() icon;
  @Input() bg = 'bg-heavy-rain';

}
