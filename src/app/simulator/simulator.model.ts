'use strict';
import {Constants} from "./constants";
import {Results} from './results.model';


export class Simulator {
    public numOrbs: number = 500;
    public unitCounts: any;
    public stopConditions: any;
    public colorGivenRarityDist: any;
    public shouldRoll = {'red': true, 'blue': true, 'green': true, 'colorless': true};

    public baseProb = {
        'focus': .03,
        'five': .03,
        'four': .58,
        'three': .36
    };

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
    }

    public generateColorGivenRarityDist() {
        let colorGivenRarityDist = {};
        let rarities = Constants.rarities;
        let colors = Constants.colors;

        for (let i = 0; i < rarities.length; i++) {
            const distribution = {};
            colorGivenRarityDist[rarities[i]] = distribution;

            let total = 0;
            for (let j = 0; j < colors.length; j++) {
                total += this.unitCounts[rarities[i]][colors[j]]
            }
            for (let j = 0; j < colors.length; j++) {
                distribution[colors[j]] = this.unitCounts[rarities[i]][colors[j]] / total;
            }
        }
        return colorGivenRarityDist;
    }


    runTrial() {
        const results = new Results(this.unitCounts['focus']);
        const targetColors = [];
        let rollsWithoutFiveStar = 0;

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
            let pityRate = Math.floor(rollsWithoutFiveStar / 5) * 0.0025;
            let nonFiveProb = this.baseProb['five'] + this.baseProb['four'];
            let rarityDistribution = {
                'focus': this.baseProb['focus'] + pityRate,
                'five': this.baseProb['five'] + pityRate,
                'four': this.baseProb['four'] - (this.baseProb['four'] * 2 * pityRate / nonFiveProb),
                'three': this.baseProb['three'] - (this.baseProb['three'] * 2 * pityRate / nonFiveProb)
            };


            for (let i = 0; i < 5; i++) {
                let rarity = this.sampleDistribution(rarityDistribution);
                stones.push({
                    'color': this.selectColorGivenRarity(rarity),
                    'rarity': rarity
                });
            }

            let rollIndex = 0;

            let desiredColorExists = false;
            for (let i = 0; i < stones.length; i++) {
                if (targetColors.indexOf(stones[i]['color']) != -1) {
                    desiredColorExists = true;
                    break;
                }
            }


            for (let i = 0; i < stones.length; i++) {
                let color = stones[i]['color'];
                let rarity = stones[i]['rarity'];

                if (targetColors.indexOf(color) != -1 || (!desiredColorExists && rollIndex == 1)) {
                    if (orbsRemaining >= Constants.costs[rollIndex]) {
                        orbsRemaining -= Constants.costs[rollIndex];

                        if (rarity == 'focus') {
                            let numFocus = this.unitCounts['focus'][color];
                            let focusIndex = Math.floor(Math.random() * numFocus);
                            results.add(color, rarity, focusIndex);
                        } else {
                            results.add(color, rarity, 0);
                        }

                        if (rarity != 'focus' && rarity != 'five') {
                            rollsWithoutFiveStar += 1;
                        } else {
                            rollsWithoutFiveStar = 0;
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

        let allConditionsMet = true;
        for (let i = 0; i < Constants.colors.length; i++) {
            let color = Constants.colors[i];
            results.conditionsMet[color] =
                this.conditionsMet(this.stopConditions[color], results);
            if (this.stopConditions[color].length &&
                !this.conditionsMet(this.stopConditions[color], results)) {
                allConditionsMet = false;
            }
        }
        results.allConditionsMet = allConditionsMet;
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
            'red': 0, 'blue': 0, 'green': 0, 'colorless': 0, 'all': 0
        };
        console.log(this.unitCounts);
        let totalCounts;
        let allFives = [];
        let allFocus = [];

        for (let i = 0; i < numTrials; i++) {
            let results = this.runTrial();
            let totalFives = 0;
            Object.keys(results.counts['five']).forEach(color => {
                totalFives += this.sum(results.counts['five'][color]);
            });
            let totalFocus = 0;
            Object.keys(results.counts['focus']).forEach(color => {
               totalFocus += this.sum(results.counts['focus'][color]);
            });
            allFives.push(totalFives);
            allFocus.push(totalFocus);

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
            conditionMetCount['all'] += results.allConditionsMet ? 1 : 0;
        }

        Object.keys(conditionMetCount).forEach(key => {
            conditionMetCount[key] /= numTrials;
        });


        return {
            'conditions': conditionMetCount,
            'counts': totalCounts,
            'allFives': allFives,
            'allFocus': allFocus
        };
    }

    selectColorGivenRarity(rarity) {
        let dist = this.generateColorGivenRarityDist();
        return this.sampleDistribution(dist[rarity])
    }

    sum(list) {
        let sum = 0;
        for (let i = 0; i < list.length; i++) {
            sum += list[i];
        }
        return sum;
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

