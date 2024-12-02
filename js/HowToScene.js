class HowToScene extends Phaser.Scene {

    constructor() {
        super({ key: 'HowToScene' });
    }

    preload() {

        this.load.image('background','assets/back.jpeg');
        this.load.image('titulo','assets/titulo.png');
        this.load.image('tabela','assets/botaos.png');
        this.load.image('info','assets/info.png');
        this.load.spritesheet('botoes', 'assets/botaosF.png', {
            frameWidth: 100,
            frameHeight: 50,
        });

    }

    create() {
        this.add.image(375,375,'background').setScale(0.79);

        this.add.image(375,115,'titulo');


        this.add.image(375,275,'info');


        this.voltar = this.add.sprite(375, 365, 'botoes', 3).setInteractive({ useHandCursor: true });

        this.voltar.once('pointerdown', function (pointer) {
            this.scene.start('MenuScene');
            
        },this);

    }
}