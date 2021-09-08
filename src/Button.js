class Button extends PIXI.Sprite {
     constructor(onSpin) {
         super();
         this.onSpin = onSpin;
         this.button = new PIXI.Graphics();
         this.init();
     }

     init() {
                  this.button.beginFill(
                      0xffffff,
                      0.01
                  );
                  this.button.drawRect(
                      0,
                      0,
                      window.innerWidth,
                      window.innerHeight
                  );
                  this.button.endFill();
                  this.button.interactive = true;
                  this.button.buttonMode = true;

         this.button.on(
             'click',
             this.onSpin.bind(this)
         );

         this.addChild(this.button);
     }

 }
