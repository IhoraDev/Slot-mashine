class Background extends PIXI.Sprite {
    constructor() {
        super();
        this.background = PIXI.loader.resources["BG"].texture;
        this.setBackground();
    }

    setBackground() {
        let bgSprite = new PIXI.Sprite(this.background);
        this.addChild(bgSprite);
    }
}