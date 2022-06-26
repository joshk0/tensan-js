import { GameRecord } from "./GameRecord";

export class ScoreTracker {
    games: GameRecord[];
    standings: Map<String, Number>;

    constructor() {
        this.games = [];
        this.standings = new Map();
    }

    recordGame(record: GameRecord) {
        this.games.push(record);
        const results = record.gameScores();

        for (const result of results) {
            this.standings.set(result.name, (this.standings.get(result.name) || 0).valueOf() + record.gameConfiguration.rate*result.gamePoints);
        }
    }

    getStandings() {
        let sortedStandings= [...this.standings.entries()];
        sortedStandings.sort((a, b) => {
            if (a[1] === b[1]) {
                return 0;
            } else if (a[1] < b[1]) {
                return 1;
            }
            return -1;
        });

        return sortedStandings;
    }
}