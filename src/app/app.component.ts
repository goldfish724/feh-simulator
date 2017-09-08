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
    // charts: any[] = [];
    runButtonDisabled: boolean = false;
    charts: any;
    numTrials: number = 1000;
    chartTypeFullText = {
        'misc': 'Misc',
        'focus': 'Focus',
        'four': 'Four Star',
        'five': 'Five Star',
        'three': 'Three Star'
    };

    constructor() {
        this.names = {
            'red': [{name: 'Ike'}],
            'blue': [{name: 'Ninian'}],
            'green': [{name:  'Julia'}],
            'colorless': [{name: 'Genny'}]
        };
        this.simulator.numOrbs = 200;
        this.resetCharts();
    }

    addCondition(color) {
        let condition = new StopCondition();
        condition.stopColor = color;
        condition.targetColor = color;
        this.simulator.stopConditions[color].push(condition);
    }

    addHero(color) {
        let capitalized = color.charAt(0).toUpperCase() + color.slice(1);
        this.names[color].push({name: capitalized + ' Hero ' + (this.names[color].length + 1)});
        this.simulator.unitCounts.focus[color] = this.names[color].length;
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    resetCharts() {
        this.charts = {
            'misc': [],
            'focus': [],
            'five': [],
            'four': [],
            'three': []
        };
    }

    runSimulation() {
        this.runButtonDisabled = true;
        let results = this.simulator.runTrials(this.numTrials);
        this.meetCondDataset = [];
        this.resetCharts();
        console.log("Your results");
        console.log(results);
        let shouldDisplayChart = false;

        // Meet condition chart
        Constants.colors.forEach(color => {
            if (this.simulator.shouldRoll[color] && this.simulator.stopConditions[color].length) {
                this.meetCondDataset.push({
                    label: color,
                    data: [results.conditions[color]]
                });
                shouldDisplayChart = true;
            } else {
                this.meetCondDataset.push({
                    label: color,
                    data: [0]
                })
            }
        });
        if (shouldDisplayChart) {
            this.meetCondDataset.push({
                label: 'All Conditions Met',
                data: [results.conditions['all']]
            });
            console.log(this.meetCondDataset);
            this.charts.misc.push({
                datasets: this.meetCondDataset,
                labels: ['Probability of meeting condition'],
                colors: [
                    Constants.colorCodes['red'],
                    Constants.colorCodes['blue'],
                    Constants.colorCodes['green'],
                    Constants.colorCodes['colorless'],
                    '#333333'
                ],
                title: 'Probability of Meeting Conditions'
            });
        }

        // Number of each rarity chart other distribution charts
        let counts = results.counts;
        Object.keys(counts).forEach(rarity => {
            Object.keys(counts[rarity]).forEach(color => {
                if (!this.simulator.shouldRoll[color]) {
                    return;
                }
                let units = counts[rarity][color];
                for (let i = 0; i < units.length; i++) {
                    let name: string;
                    if (rarity == 'focus') {
                        name = this.names[color][i].name;
                    } else {
                        name = color + ' ' + rarity + ' star';
                    }

                    let samples = units[i];
                    let chart = this.samplesToChart(samples);
                    chart['title'] = name;
                    chart['colors'] = [ Constants.colorCodes[color]];

                    this.charts[rarity].push(chart);
                }
            });
        });

        let allFocusChart = this.samplesToChart(results.allFocus);
        allFocusChart['title'] = "Total Focus";
        this.charts['focus'].push(allFocusChart);

        let allFivesChart = this.samplesToChart(results.allFives);
        allFivesChart['title'] = "Total Non-focus Five Stars";
        this.charts['five'].push(allFivesChart);
        this.runButtonDisabled = false;
    }

    samplesToChart(samples) {
        let chart = {
            datasets: [{
                data: [],
            }],
            labels: [],
            mean: this.mean(samples).toFixed(2),
            median: this.median(samples)
        };

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

        return chart;
    }

    public mean(values) {
        let sum = 0;
        for (let i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum / values.length;
    }

    public median(values) {
        values.sort((a, b) => {
            return a - b;
        });
        let half = Math.floor(values.length / 2);

        if (values.length % 2) {
            return values[half];
        } else {
            return (values[half-1] + values[half]) / 2.0;
        }
    }
}
