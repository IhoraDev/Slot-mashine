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