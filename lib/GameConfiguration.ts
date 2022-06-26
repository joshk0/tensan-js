export class GameConfiguration {
    // Uma. If length of this array is 3 then this GameConfiguration is for 3 player, length 4 means 4 player.
    uma: number[];

    // Value of +1.0 game score or 1000 points (post uma/oka)
    rate: number;

    // Value of a chip, in game score units.
    chipValue: number;

    // The oka is the difference between start and return, all paid to the top place winner.
    startPoint: number;
    returnPoint: number;

    constructor(uma: number[], rate: number, chipValue: number, startPoint: number, returnPoint: number) {
        this.uma = uma;
        this.rate = rate;
        this.chipValue = chipValue;
        this.startPoint = startPoint;
        this.returnPoint = returnPoint;
    }

    copy(): GameConfiguration {
        return new GameConfiguration([...this.uma], this.rate, this.chipValue, this.startPoint, this.returnPoint);
    }

    validate(): boolean {
        return this.returnPoint >= this.startPoint &&
            this.rate > 0 && this.chipValue > 0 &&
            this.uma.reduce((sum, current) => sum + current) === 0;
    }
}
