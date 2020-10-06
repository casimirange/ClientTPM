import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartTitleOptions, ChartType} from "chart.js";
import {BaseChartDirective, Color, Label} from "ng2-charts";

@Component({
  selector: 'app-dash-cart',
  templateUrl: './dash-cart.component.html',
  styleUrls: ['./dash-cart.component.scss']
})
export class DashCartComponent implements OnInit {

  @Input()
  public data: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
  @Input()
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  @Input()
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    tooltips: {mode: "index", intersect: false},
    hover: {mode: "nearest", intersect: true},
    legend: {
      display: true,
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        gridLines: {
          color: 'transparent',
        },
        stacked: false,
      }],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return value + ' %'
            }
          },
          type: 'linear',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  @Input()
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  @Input()
  public lineChartLegend = true;
  @Input()
  public type: ChartType = "line";
  // public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) charts: BaseChartDirective;
  constructor() { }

  ngOnInit() {
  }

}
