class Reel extends PIXI.Sprite {

    constructor(reelId) {
        super();

        this.textureReel = [
            { id: 0, texture: PIXI.loader.resources['1'].texture },
            { id: 1, texture: PIXI.loader.resources['2'].texture },
            { id: 2, texture: PIXI.loader.resources['3'].texture },
            { id: 3, texture: PIXI.loader.resources['4'].texture },
            { id: 4, texture: PIXI.loader.resources['5'].texture },
            { id: 5, texture: PIXI.loader.resources['6'].texture },
            { id: 6, texture: PIXI.loader.resources['7'].texture },
            { id: 7, texture: PIXI.loader.resources['8'].texture },
            { id: 8, texture: PIXI.loader.resources['9'].texture },
            { id: 9, texture: PIXI.loader.resources['10'].texture },
            { id: 10, texture: PIXI.loader.resources['11'].texture },
            { id: 11, texture: PIXI.loader.resources['12'].texture },
            { id: 12, texture: PIXI.loader.resources['13'].texture }
        ];

        this.createReel(reelId);
    }

    createReel(reelId) {
        let item;
        for (let i = 0; i < this.textureReel.length; i++) {
            if (i === reelId) {
                item = new PIXI.Sprite(this.textureReel[i].texture);

                item.width = 100;
                item.height = 100;

                this.addChild(item);
            }
        }
    }
}