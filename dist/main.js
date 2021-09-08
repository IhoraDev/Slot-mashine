class App extends PIXI.Container {
  constructor() {
    super();
    this.controller = null;
    new Loader(this.init.bind(this));
  }

  init() {
    let background = new Background();
    this.addChild(background);
    this.controller = new GameController();
    this.addChild(this.controller);
    this.addChild(this.controller.createMask());
    let button = new Button(this.onSpinStart.bind(this));
    this.addChild(button);
  }

  onSpinStart() {
    this.controller.startRotation();
  }

}

const load = () => {
  let app = new App();
  let renderer = PIXI.autoDetectRenderer({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    resolution: 1
  });
  document.body.appendChild(renderer.view);
  requestAnimationFrame(animate);

  function animate() {
    renderer.render(app);
    requestAnimationFrame(animate);
    PIXI.tweenManager.update();
  }
};

window.onload = load;

class Loader {
  constructor(onAssetsLoaded) {
    this.loader = PIXI.loader;
    this.loadAssets();
    this.loader.once('complete', onAssetsLoaded);
    this.loader.load();
  }

  loadAssets() {
    this.loader.add('BG', '../assets/background_normalgame.jpg');
    this.loader.add('1', "../assets/M00_000.jpg");
    this.loader.add('2', "../assets/M01_000.jpg");
    this.loader.add('3', "../assets/M02_000.jpg");
    this.loader.add('4', "../assets/M03_000.jpg");
    this.loader.add('5', "../assets/M04_000.jpg");
    this.loader.add('6', "../assets/M05_000.jpg");
    this.loader.add('7', "../assets/M06_000.jpg");
    this.loader.add('8', "../assets/M07_000.jpg");
    this.loader.add('9', "../assets/M08_000.jpg");
    this.loader.add('10', "../assets/M09_000.jpg");
    this.loader.add('11', "../assets/M10_000.jpg");
    this.loader.add('12', "../assets/M11_000.jpg");
    this.loader.add('13', "../assets/M12_000.jpg");
  }

}

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

class Button extends PIXI.Sprite {
  constructor(onSpin) {
    super();
    this.onSpin = onSpin;
    this.button = new PIXI.Graphics();
    this.init();
  }

  init() {
    this.button.beginFill(0xffffff, 0.01);
    this.button.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.button.endFill();
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.on('click', this.onSpin.bind(this));
    this.addChild(this.button);
  }

}

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
    mask.drawRect(200, 100, 900, 550);
    mask.endFill();
    this.mask = mask;
    return mask;
  }

}

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
    }, () => new Reel(this.shuffleReelId()));
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

class Reel extends PIXI.Sprite {
  constructor(reelId) {
    super();
    this.textureReel = [{
      id: 0,
      texture: PIXI.loader.resources['1'].texture
    }, {
      id: 1,
      texture: PIXI.loader.resources['2'].texture
    }, {
      id: 2,
      texture: PIXI.loader.resources['3'].texture
    }, {
      id: 3,
      texture: PIXI.loader.resources['4'].texture
    }, {
      id: 4,
      texture: PIXI.loader.resources['5'].texture
    }, {
      id: 5,
      texture: PIXI.loader.resources['6'].texture
    }, {
      id: 6,
      texture: PIXI.loader.resources['7'].texture
    }, {
      id: 7,
      texture: PIXI.loader.resources['8'].texture
    }, {
      id: 8,
      texture: PIXI.loader.resources['9'].texture
    }, {
      id: 9,
      texture: PIXI.loader.resources['10'].texture
    }, {
      id: 10,
      texture: PIXI.loader.resources['11'].texture
    }, {
      id: 11,
      texture: PIXI.loader.resources['12'].texture
    }, {
      id: 12,
      texture: PIXI.loader.resources['13'].texture
    }];
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
//# sourceMappingURL=main.js.map
