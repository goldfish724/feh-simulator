export class StopCondition {
    index: number = 0;
    count: number = 1;
    targetColor: string = 'blue';  // Color to watch for condition
    stopColor: string = 'blue';  // Color to stop rolling if condition met

    constructor() {}

    conditionMet(results) {
        return results.counts['focus'][this.targetColor][this.index] >= this.count;
    }
}
