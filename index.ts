import { GameConfiguration } from "./lib/GameConfiguration";
import { GameRecord } from "./lib/GameRecord";
import { ScoreTracker } from "./lib/ScoreTracker";

function main() {
    let gameConfig = new GameConfiguration([30, 10, -10, -30], 0.3, 1 / 0.3, 25000, 30000);
    if (!gameConfig.validate()) {
        console.log("Game config is not valid");
        return;
    }

    let record = new GameRecord(
        [
            {
                name: "Paul",
                points: 28500,
                chipDelta: -3,
            },
            {
                name: "Claire",
                points: -3500,
                chipDelta: -3,
            },
            {
                name: "Andres",
                points: 48700,
                chipDelta: 11,
            },
            {
                name: "Honver",
                points: 26300,
                chipDelta: -5,
            }
        ],
        gameConfig
    );

    let recordTwo = new GameRecord(
        [
            {
                name: "Erik",
                points: 22400,
                chipDelta: -3,
            },
            {
                name: "Claire",
                points: 16200,
                chipDelta: -1,
            },
            {
                name: "Andres",
                points: 28500,
                chipDelta: 0,
            },
            {
                name: "Honver",
                points: 32900,
                chipDelta: 4,
            }
        ],
        gameConfig
    );

    if (!record.validate()) {
        console.log("Game1 is not valid");
        return;
    }
    if (!recordTwo.validate()) {
        console.log("Game2 is not valid");
        return;
    }

    console.log("Validation OK");

    let tracker = new ScoreTracker();

    tracker.recordGame(record);
    console.log(tracker.getStandings());

    console.log('--- GAME TWO ---');

    tracker.recordGame(recordTwo);
    console.log(tracker.getStandings());
}

main();