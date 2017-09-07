import {Constants} from "./constants";


export class Results {
    counts: any;
    conditionsMet: any = {};

    constructor(focusCounts) {
        this.counts = Results.createEmptyCounts(focusCounts);
    }

    public static createEmptyCounts(focusCounts) {
        let counts = {};

        let rarities = Constants.rarities;
        let colors = Constants.colors;

        for (let i = 0; i < rarities.length; i++) {
            counts[rarities[i]] = {};
            for (let j = 0; j < colors.length; j++) {
                let numValues = rarities[i] == 'focus' ? focusCounts[colors[j]] : 1;

                counts[rarities[i]][colors[j]] = [];
                for (let k = 0; k < numValues; k++) {
                    counts[rarities[i]][colors[j]].push(0);
                }
            }
        }

        return counts;
    }


    add(color, rarity, index) {
        index = index || 0;
        this.counts[rarity][color][index] += 1;
    }
}
