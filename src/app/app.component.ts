import { Component } from '@angular/core';
import {Simulator} from "./simulator/simulator.model";
import {StopCondition} from "./simulator/stopcondition.model";
import {Constants} from "./simulator/constants";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    title = 'app works!';
    colors = ['red', 'blue', 'green', 'colorless'];
    simulator: Simulator = new Simulator();
    names: any = {};
    meetCondDataset: any;
    charts: any[] = [];
    numTrials: number = 1000;

    constructor() {
        this.names = {
            'red': [{name: 'Red Hero'}],
            'blue': [{name: 'Blue Hero'}],
            'green': [{name:  'Green Hero'}],
            'colorless': [{name: 'Colorless Hero'}]
        };
        this.simulator.numOrbs = 1000;
    }

    addCondition(color) {
        let condition = new StopCondition();
        condition.stopColor = color;
        condition.targetColor = color;
        this.simulator.stopConditions[color].push(condition);
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    debug() {
        this.charts = [];
        let results = this.simulator.runTrials(this.numTrials);
        this.meetCondDataset = [];

        // Meet condition chart
        Constants.colors.forEach(color => {
            if (this.simulator.shouldRoll[color]) {
                this.meetCondDataset.push({
                    label: color,
                    data: [results.conditions[color]]
                });
            }
        });
        this.charts.push({
            'datasets': this.meetCondDataset,
            'labels': ['Chance of meeting condition'],
            'colors': [
                Constants.colorCodes['red'],
                Constants.colorCodes['blue'],
                Constants.colorCodes['green'],
                Constants.colorCodes['colorless'],
            ]
        });

        // Number of each rarity chart other distribution charts
        let counts = results.counts;
        Object.keys(counts).forEach(rarity => {
            Object.keys(counts[rarity]).forEach(color => {
                let units = counts[rarity][color];
                for (let i = 0; i < units.length; i++) {
                    let name: string;
                    if (rarity == 'focus') {
                        name = this.names[color][i].name;
                    } else {
                        name = color + ' ' + rarity + ' star';
                    }
                    let chart = {
                        datasets: [{
                            data: [],
                        }],
                        labels: [],
                        title: name,
                        colors: [Constants.colorCodes[color]]
                    };

                    let samples = units[i];
                    let min = 0;
                    let max = Math.max.apply(null, samples);
                    let numBuckets = Math.min(max - min + 1, this.numTrials / 5);
                    let bucketSize = Math.floor((max - min + 1) / numBuckets);

                    for (let j = 0; j < numBuckets; j++) {
                        let lowerBound = min + j * bucketSize;
                        let upperBound = min + (j + 1) * bucketSize -1;
                        if (lowerBound == upperBound) {
                            chart.labels.push(lowerBound);
                        } else {
                            chart.labels.push(lowerBound + '-' + upperBound);
                        }
                        chart.datasets[0].data.push(0);
                    }

                    for (let j = 0; j < samples.length; j++) {
                        let sample = samples[j];
                        let bucketIndex = Math.floor((sample - min) / bucketSize);

                        chart.datasets[0].data[bucketIndex] += 1 / this.numTrials;
                    }

                    this.charts.push(chart);
                }
            });
        });

        console.log(this.charts);
    }
}
