import { GameConfiguration } from "./GameConfiguration";

export class GameRecord {
    // Both arrays must have the same length, 3 or 4.
    playerResults: PlayerResult[];

    // A copy of the game configuration used to play this game.
    gameConfiguration: GameConfiguration;

    constructor(playerResults: PlayerResult[], gameConfiguration: GameConfiguration) {
        // Player results should be in table seating order (to break ties)
        this.playerResults = playerResults;

        // TODO: make a copy of the configuration
        this.gameConfiguration = gameConfiguration.copy();
    }

    gameScores(): GameScoreResult[] {
        // Sort results by final points, then index in the seating order (to break ties)
        let sortedResults = this.playerResults.map((r, i) => { return { position: i, result: r } });
        sortedResults.sort((a, b) => {
            if (a.result.points < b.result.points) {
                return 1;
            } else if (a.result.points > b.result.points) {
                return -1;
            } else if (a.result.points === b.result.points) {
                if (a.position < b.position) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                throw "should not happen";
            }
        });

        // Apply uma to the sorted results.
        let withUma = sortedResults.map((r, i) => { return { name: r.result.name, gamePoints: this.gameConfiguration.uma[i] + ((r.result.points - this.gameConfiguration.returnPoint) / 1000.0 + r.result.chipDelta * this.gameConfiguration.chipValue) }; })

        // Apply oka to the first place player.
        withUma[0].gamePoints += this.gameConfiguration.uma.length * (this.gameConfiguration.returnPoint - this.gameConfiguration.startPoint) / 1000.0;

        return withUma;
    }

    validate(): boolean {
        return this.playerResults.length == this.gameConfiguration.uma.length &&
            this.playerResults.map(r => r.points).reduce((sum, current) => sum + current) === this.gameConfiguration.startPoint * this.playerResults.length &&
            this.playerResults.map(r => r.chipDelta).reduce((sum, current) => sum + current) === 0;
    }
}