class GameController extends PIXI.Sprite {
    constructor() {
        super();
        this.columnPadding = 5;
        this.turnWidth = 180;
        this.x = 220;
        this.y = 105;
        this.turns = [];

        this.addTurn();
    }
    addTurn() {
        for (let i = 0; i < 5; i++) {
            let turn = new Turn(i);
            turn.x = (this.turnWidth + this.columnPadding) * i;
            this.turns.push(turn);
            this.addChild(turn);
        }
    }

    startRotation() {
        for (let i = 0; i < this.turns.length; i++) {
            let turn = this.turns[i];
            turn.startRotation();
        }
    }

    createMask() {
        let mask = new PIXI.Graphics();
        mask.beginFill(0x555555);
        mask.drawRect(
            200,
            100,
            900,
            550
        );
        mask.endFill();
        this.mask = mask;
        return mask;
    }
}