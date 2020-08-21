import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApexChart, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ChartComponent} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-radial-bar',
  templateUrl: './radial-bar.component.html',
  styleUrls: ['./radial-bar.component.scss']
})
export class RadialBarComponent implements OnInit {

  // @Input chart: ApexChart = {
  //   height: 200,
  //   type: "radialBar",
  // };

//   @Input() series: ApexNonAxisChartSeries  = [70];
//
//   @Input plotOptions: ApexPlotOptions = [{
//     radialBar: {
//       hollow: {
//         margin: 0,
//         size: "70%",
//         background: "#293450",
//         dropShadow: {
//           enabled: true,
//           top: 0,
//           left: 0,
//           blur: 3,
//           opacity: 0.5
//         }
//       },
//       track: {
//         dropShadow: {
//           enabled: true,
//           top: 2,
//           left: 0,
//           blur: 4,
//           opacity: 0.15
//         }
//       },
//       dataLabels: {
//         name: {
//           offsetY: -10,
//           color: "#fff",
//           fontSize: "13px"
//         },
//         value: {
//           color: "#fff",
//           fontSize: "30px",
//           show: true,
//           formatter: function (val) {
//           return val;
//         }
//       }
//     }
//   }
// }];
//
//   @Input fill: ApexFill = {
//     type: "gradient",
//     gradient: {
//       shade: "dark",
//       type: "horizontal",
//       gradientToColors: ["#ABE5A1"],
//       stops: [0, 100]
//     }
//   };
//
//   @Input stroke: ApexStroke = {
//     lineCap: "round"
//   };
//
//   @Input labels: string[] = ["Total Pannes"];

  // @ViewChild("chart", { static: true }) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      chart: {
        height: 200,
        type: "radialBar",
      },

      series: [59],

      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450",
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5
            }
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true,
              formatter: function (val) {
                return val;
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#ABE5A1"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Total Pannes"]
    };
  }

  ngOnInit() {
  }

}
