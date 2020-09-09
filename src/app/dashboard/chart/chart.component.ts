import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartTitleOptions, ChartType} from "chart.js";
import {BaseChartDirective, Color, Label} from "ng2-charts";
import {TitleComponent} from "../../layout/page-title/title/title.component";
import {TitleCasePipe} from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input()
  public data: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', yAxisID: 'y-axis-0'  },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', yAxisID: 'y-axis-0'  },
      { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
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
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true
          },
          type: 'linear',
          // stacked: true
          // scaleLabel: {display: true, labelString: "Month"}
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'transparent',
          },
          ticks: {
            fontColor: '#373d3f',
            beginAtZero: true
          },
         type: 'linear',
         // stacked: true
          // scaleLabel: {display: true, labelString: "TDT"}
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
  // @ViewChild("myC", { static: true }) canvas: ElementRef;
  constructor() { }

  ngOnInit() {
    // let gradient = this.charts.nativeElement.getContext('2d').createLinearGradient(0,0,0, 200);
    // gradient.addColorStop(0, 'green');
    // gradient.addColorStop(1, 'red');
    // this.lineChartColors = [
    //   {
    //     backgroundColor: gradient
    //   }
    // ]
  }

}
