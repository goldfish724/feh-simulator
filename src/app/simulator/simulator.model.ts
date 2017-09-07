'use strict';
import {Constants} from "./constants";
import {Results} from './results.model';


export class Simulator {
    numOrbs: number = 500;
    unitCounts: any;
    stopConditions: any;
    colorGivenRarityDist: any;
    shouldRoll = {'red': true, 'blue': true, 'green': true, 'colorless': true};

    constructor() {
        this.unitCounts = {
            'focus': {'red': 1, 'blue': 1, 'green': 1, 'colorless': 1},
            'five': {'red': 29, 'blue': 21, 'green': 17, 'colorless': 19},
            'four': {'red': 28, 'blue': 24, 'green': 18, 'colorless': 24},
            'three': {'red': 15, 'blue': 12, 'green': 9, 'colorless': 13}
        };
        this.stopConditions = {
            'red': [],
            'blue': [],
            'green': [],
            'colorless': []
        };

        this.colorGivenRarityDist = {};
        let rarities = Constants.rarities;
        let colors = Constants.colors;

        for (let i = 0; i < rarities.length; i++) {
            const distribution = {};
            this.colorGivenRarityDist[rarities[i]] = distribution;

            let total = 0;
            for (let j = 0; j < colors.length; j++) {
                total += this.unitCounts[rarities[i]][colors[j]]
            }
            for (let j = 0; j < colors.length; j++) {
                distribution[colors[j]] = this.unitCounts[rarities[i]][colors[j]] / total;
            }
        }
    }

    runTrial() {
        const results = new Results(this.unitCounts['focus']);
        const targetColors = [];
        Object.keys(this.shouldRoll).forEach(color => {
            if (this.shouldRoll[color]) {
                targetColors.push(color);
            }
        });
        let orbsRemaining = this.numOrbs;

        while (orbsRemaining > 5) {

            if (targetColors.length == 0) {
                break;
            }

            // A single roll
            const stones = [];
            for (let i = 0; i < 5; i++) {
                let rarity = this.selectRarity();
                stones.push({
                    'color': this.selectColorGivenRarity(rarity),
                    'rarity': rarity
                });
            }

            let rollIndex = 0;
            for (let i = 0; i < stones.length; i++) {
                let color = stones[i]['color'];
                let rarity = stones[i]['rarity'];
                if (targetColors.indexOf(color) != -1) {
                    if (orbsRemaining >= Constants.costs[rollIndex]) {
                        orbsRemaining -= Constants.costs[rollIndex];

                        // if (rarity == 'focus') {
                        //     console.log("rolled " + color + " " + rarity);
                        // }

                        if (rarity == 'focus') {
                            let numFocus = this.unitCounts['focus'][color];
                            let focusIndex = Math.floor(Math.random() * numFocus);
                            results.add(color, rarity, focusIndex);
                        } else {
                            results.add(color, rarity, 0);
                        }
                    }
                    if (this.stopConditions[color].length != 0
                            && this.conditionsMet(this.stopConditions[color], results)) {

                        targetColors.splice(targetColors.indexOf(color), 1);
                    }
                }
                rollIndex += 1;
            }
        }

        for (let i = 0; i < Constants.colors.length; i++) {
            let color = Constants.colors[i];
            results.conditionsMet[color] =
                this.conditionsMet(this.stopConditions[color], results);
        }
        return results;
    }

    conditionsMet(conditions, results) {
        for (let i = 0; i < conditions.length; i++) {
            if (!conditions[i].conditionMet(results)) {
                return false;
            }
        }
        return true;
    }

    runTrials(numTrials) {
        let counts = 0;
        let conditionMetCount = {
            'red': 0, 'blue': 0, 'green': 0, 'colorless': 0
        };
        let totalCounts;

        for (let i = 0; i < numTrials; i++) {
            let results = this.runTrial();
            if (!totalCounts) {
                totalCounts = Results.createEmptyCounts(this.unitCounts['focus']);
            } else {
                let counts = results.counts;
                Object.keys(counts).forEach(rarity => {
                    Object.keys(counts[rarity]).forEach(color => {
                        for (let j = 0; j < counts[rarity][color].length; j++) {
                            if (totalCounts[rarity][color][j] == 0) {
                                totalCounts[rarity][color][j] = []; // Hack to reuse initialization code
                            }
                            totalCounts[rarity][color][j].push(counts[rarity][color][j]);
                        }
                    });
                });
            }

            for (let i = 0; i < Constants.colors.length; i++) {
                let color = Constants.colors[i];
                conditionMetCount[color] += results.conditionsMet[color] ? 1 : 0;
            }
        }

        Object.keys(conditionMetCount).forEach(color => {
            conditionMetCount[color] /= numTrials;
        });


        return {
            'conditions': conditionMetCount,
            'counts': totalCounts
        };
    }

    selectColorGivenRarity(rarity) {
        return this.sampleDistribution(this.colorGivenRarityDist[rarity]);
    }

    selectRarity() {
        return this.sampleDistribution(Constants.rarityBaseProbabilities);
    }

    sampleDistribution(distribution) {
        const rand = Math.random();
        let total = 0;

        for (let key in distribution) {
            if (distribution.hasOwnProperty(key)) {
                total += distribution[key];
                if (rand < total) {
                    return key;
                }
            }
        }

        const keys = Object.keys(distribution);
        return keys[Math.floor(Math.random() * keys.length)];
    }
}

// const simulator = new Simulator();
// let results = simulator.runTrials(1);
// console.log(results);

