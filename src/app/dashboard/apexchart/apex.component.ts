import {Component, Input, OnInit, ViewChild} from '@angular/core';
// import ApexCharts from 'apexcharts';
import {
  ApexAnnotations,
  ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexNonAxisChartSeries,
  ApexPlotOptions, ApexResponsive,
  ApexStates,
  ApexStroke, ApexTheme,
  ApexTitleSubtitle, ApexTooltip,
  ApexXAxis, ApexYAxis, ChartComponent
} from "ng-apexcharts";
import {_Left} from "@angular/cdk/scrolling";
import {ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-apex',
  templateUrl: './apex.component.html',
  styleUrls: ['./apex.component.css']
})
export class ApexComponent implements OnInit {

//
//
//   @Input() chart: ApexChart = {
//         height: 'auto',
//         type: 'line',
//         stacked: false,
//         zoom: {
//           enabled: false
//         },
//       };
//   @Input() annotations: ApexAnnotations;
//   @Input() colors: string[] = ['#f3f3f3', 'transparent'];
//   @Input() dataLabels: ApexDataLabels = {
//       enabled: false
//     };
//   @Input() series: ApexAxisChartSeries  = [{
//             name: "desktop",
//             type: "line",
//             data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//           }];
//   @Input() stroke: ApexStroke={
//       width: [1, 1, 4],
//       curve: "smooth"
//   };
//   @Input() labels: string[];
//   @Input() legend: ApexLegend = {
//     show: true,
//     showForSingleSeries: true
//   };
//   @Input() fill: ApexFill;
//   @Input() tooltip: ApexTooltip;
//   @Input() plotOptions: ApexPlotOptions;
//   @Input() responsive: ApexResponsive[];
//   @Input() xaxis: ApexXAxis = {
//         type: "category",
//         categories: [
//             "jan",
//             "fev",
//             "mar",
//             "avr",
//             "mai",
//             "jun",
//             "jul",
//             "aou",
//             "sep",
//         ]
//       };
//   @Input() yaxis: ApexYAxis | ApexYAxis[]= [
//       {
//           seriesName: "MTBF",
//           axisTicks: {
//               show: true
//           },
//           axisBorder: {
//               show: true,
//               color: "#008FFB"
//           },
//           labels: {
//               style: {
//                   color: "#008FFB"
//               }
//           },
//           title: {
//               text: "Mean Time Between Failure",
//               style: {
//                   color: "#008FFB"
//               }
//           },
//           tooltip: {
//               enabled: true
//           }
//       },
//       {
//           seriesName: "TDT",
//           opposite: true,
//           axisTicks: {
//               show: true
//           },
//           axisBorder: {
//               show: true,
//               color: "#00E396"
//           },
//           labels: {
//               style: {
//                   color: "#00E396"
//               }
//           },
//           title: {
//               text: "Total Down Time (min)",
//               style: {
//                   color: "#00E396"
//               }
//           }
//       },
//       {
//           seriesName: "Nombre de Pannes",
//           opposite: true,
//           axisTicks: {
//               show: true
//           },
//           axisBorder: {
//               show: true,
//               color: "#FEB019"
//           },
//           labels: {
//               style: {
//                   color: "#FEB019"
//               }
//           },
//           title: {
//               text: "Nombre de Pannes",
//               style: {
//                   color: "#FEB019"
//               }
//           }
//       }
//   ];
//   @Input() grid: ApexGrid = {
//         row: {
//           colors: ['#f3f3f3', 'transparent'],
//           opacity: 0.5
//         }
//       };
//   @Input() states: ApexStates;
//   @Input() title: ApexTitleSubtitle = {
//         text: "MTBF",
//         align: "left",
//         offsetX: 110
//       };
//   @Input() subtitle: ApexTitleSubtitle;
//   @Input() theme: ApexTheme;
//   public chartOptions: Partial<ChartOptions>;
//
//   // @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
//
  constructor() {
//     // this.chartOptions = {
//     //   series: [
//     //       {
//     //         name: "desktop",
//     //         data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//     //       }
//     //   ],
//     //   chart: {
//     //     height: 'auto',
//     //     type: 'line',
//     //     zoom: {
//     //       enabled: false
//     //     }
//     //   },
//     //   dataLabels: {
//     //     enabled: false
//     //   },
//     //   stroke: {
//     //     curve: "straight"
//     //   },
//     //   title: {
//     //     text: "Graph de test",
//     //     align: "left"
//     //   },
//     //   grid: {
//     //     row: {
//     //       colors: ['#f3f3f3', 'transparent'],
//     //       opacity: 0.5
//     //     }
//     //   },
//     //   xaxis: {
//     //     categories: [
//     //         "jan",
//     //         "fev",
//     //         "mar",
//     //         "avr",
//     //         "mai",
//     //         "jun",
//     //         "jul",
//     //         "aou",
//     //         "sep",
//     //     ]
//     //   }
//     // }
//
//     // this.chart.toggleSeries("")
  }

  ngOnInit() {
    // this.chart()

  }
//
//   charts(){
//     // var options = {
//     //   chart: {
//     //     type: 'line'
//     //   },
//     //   series: [{
//     //     name: 'sale',
//     //     data: [30,40,70,59,65,22,10,47]
//     //   }],
//     //   xaxis: {
//     //     categories: [118, 120,156, 178, 200, 248, 290, 340]
//     //   }
//     // }
//     //
//     // var chart = new ApexCharts(document.querySelector("#chart"), options);
//     //
//     // chart.render();
//   }
//
}
