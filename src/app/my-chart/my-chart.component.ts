import {AfterViewChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from "angular2-chartjs";
import {updateSourceFile} from "@angular/compiler-cli/src/transformers/node_emitter";


@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements AfterViewChecked {

  @ViewChild('graphElement', {static: false})
  graphElement: ChartComponent;

  @Input()
  type: string = 'bar';

  @Input()
  data={
    labels: ["jan", "fev", "mar", "avr"],
    datasets: [
      {
        label: "my first",
        data: [12, 45, 23, 25]
      }
    ],
  };

  @Input()
  options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false,
          color: "black"
        },
      }],
      xAxes: [{
        gridLines: {
          display: false,
          color: "black"
        },
      }]
    },

  };
  constructor() { }

  ngAfterViewChecked() {
    if(this.graphElement.chart){
      this.graphElement.chart.update();
    }
  }

}
