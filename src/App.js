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