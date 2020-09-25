import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label, MultiDataSet, SingleDataSet} from "ng2-charts";
import {ChartOptions, ChartType} from "chart.js";

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
  doughnutChartType: ChartType = 'pie';
  // doughnutChartType: ChartType = 'doughnut';
  @Input()
  doughnutChartOption: ChartOptions = {
    legend: { position: 'right' }
  };

  @Input()
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: ['rgba(0,117,53,1)', 'rgba(145,211,26, 1)', 'rgba(106,162,127, 1)', 'rgba(97, 115, 255,1)', 'rgba(38,186,164,1)', '#24324a', '#ee3c3c'],
      borderColor: ['rgba(0,117,53,1)', 'rgba(145,211,26, 1)', '#6aa27f', 'rgba(97, 115, 255,1)', 'rgba(38,186,164,1)', '#24324a', '#ee3c3c'],
    },

  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
  }

}
