class HowToScene extends Phaser.Scene {

    constructor() {
        super({ key: 'HowToScene' });
    }

    preload() {

        this.load.image('background','assets/back.jpeg');
        this.load.image('titulo','assets/titulo.png');

    }

    create() {
        this.add.image(375,375,'background').setScale(0.79);

        this.add.image(375,115,'titulo');

    }
}