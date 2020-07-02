import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label, MultiDataSet, SingleDataSet} from "ng2-charts";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input()
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  @Input()
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  @Input()
  doughnutChartType: ChartType = 'doughnut';

  @Input()
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: ['rgba(0,117,53,1)', 'rgba(145,211,26, 1)', 'rgba(106,162,127, 1)'],
      borderColor: ['rgba(0,117,53,1)', 'rgba(145,211,26, 1)', '#6aa27f'],
    },

  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
  }

}
