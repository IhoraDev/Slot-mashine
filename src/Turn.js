class Turn extends PIXI.Sprite {
    constructor() {
        super();
        this.reelPadding = 10;
        this.reelHeignt = 120;
        this.cached = {};
        this.deloyPositionY = 4 * (this.reelHeignt + this.reelPadding);

        this.reelContainer = new PIXI.Sprite();
        this.tweenContainer = new PIXI.Sprite();

        this.tweenReelContainer = null;
        this.reels = Array.from({
                length: 13
            },
            () =>
                new Reel(
                    this.shuffleReelId()
                ));

        this.createReelContainer();
        this.addReels();

    }

    createReelContainer() {
        this.tweenContainer.y = -6 * (this.reelHeignt + this.reelPadding);
        this.addChild(this.tweenContainer);
        this.tweenContainer.addChild(this.reelContainer);
    }

    addReels() {
        for (let i = 0; i < this.reels.length; i++) {
            let reel = this.reels[i];
            this.cached[i] = reel;
            reel.y = (this.reelHeignt + this.reelPadding) * i;
            this.reelContainer.addChild(reel);
        }
    }

    startRotation() {
        this.startAnimation();
    }

    startAnimation() {
        this.tweenReelContainer = PIXI.tweenManager.createTween(this.tweenContainer);
        let positiionY = this.reelContainer.y / this.deloyPositionY;
        this.tweenReelContainer.to({
            y: positiionY
        });
        this.tweenReelContainer.easing = PIXI.tween.Easing.outQuint();
        this.tweenReelContainer.time = 780;
        this.tweenReelContainer.on('start', () => {});
        this.tweenReelContainer.on('end', () => {
            this.stopAnimation();
        });
        this.tweenReelContainer.start();
    }

    updateReels() {
        let cacheReels = {};
        let newIndex = 4;
        for (let i = 0; i < this.reels.length; i++) {
            let current = this.cached[i];
            if (newIndex === this.reels.length) {
                newIndex = 0;
            }
            current.y = (this.reelHeignt + this.reelPadding) * newIndex;
            current.y = (this.reelHeignt + this.reelPadding) * newIndex;
            cacheReels[newIndex] = current;
            newIndex++;
        }
        this.cached = cacheReels;
        this.tweenContainer.y = this.tweenContainer.y - (this.reelHeignt + this.reelPadding) * newIndex;
    }

    stopAnimation() {
        PIXI.tweenManager.removeTween(this.tweenReelContainer);
        this.updateReels();
    }

    shuffleReelId() {
        return Math.floor(Math.random() * 13);
    }

}