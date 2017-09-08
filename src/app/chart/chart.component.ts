import {Component, Input, OnInit} from '@angular/core';
import {Constants} from "../simulator/constants";

@Component({
    selector: 'feh-chart',
    templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
    @Input() public percents: boolean = true;
    @Input() public labels: any[] = [1, 2, 3];
    @Input() public datasets: any[] = [
        {data: [3, 2, 1], label: 'Red'}
    ];
    @Input() public title: string;
    @Input() public colors: any[];

    public barChartOptions: any;
    public barChartType: string = 'bar';
    public legend: boolean = false;


    constructor() {

        // Setup options
        let ticks = {
            beginAtZero: true,
        };

        if (this.percents) {
            // ticks['max'] = 1;
            ticks['callback'] =  function(value, index, values) {
                return '%' + (parseFloat(value) * 100).toFixed(0);
            }
        }

        this.barChartOptions = {
            scaleShowVerticalLines: false,
            scales: {
                yAxes: [{
                    ticks: ticks,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            responsive: true
        };
    }

    ngOnInit(): void {
        if (this.title) {
            this.barChartOptions['title'] = {
                display: true,
                text: this.title
            }
        }

        if (this.percents) {
            this.datasets.forEach(dataset => {
                for (let i = 0; i < dataset.data.length; i++) {
                    dataset.data[i] = dataset.data[i].toFixed(3);
                }
            });
        }

        if (this.colors) {
            let colors = this.colors;
            this.colors = [];
            colors.forEach(color => {
                this.colors.push({backgroundColor: color});
            });
        }
    }
}
