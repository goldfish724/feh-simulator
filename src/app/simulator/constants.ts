export class Constants {
    public static costs = [5, 4, 4, 4, 3];
    public static rarityBaseProbabilities = {
        'focus': .03,
        'five': .03,
        'four': .58,
        'three': .36
    };
    public static rarities = Object.keys(Constants.rarityBaseProbabilities);
    public static colors = ['red', 'blue', 'green', 'colorless'];
    public static colorCodes = {
        'red': '#cb595f',
        'blue': '#5a6cc7',
        'green': '#59c959',
        'colorless': '#c9c9c9',
    }
}