class MenuScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {

        this.load.image('background','assets/back.jpeg');
        this.load.image('titulo','assets/titulo.png');
        this.load.spritesheet('botoes', 'assets/botaosF.png', {
            frameWidth: 100,
            frameHeight: 50,
        });

    }

    create() {
        this.add.image(375,375,'background').setScale(0.79);

        this.add.image(375,115,'titulo');

        this.jogar = this.add.sprite(375, 225, 'botoes', 0).setInteractive({ useHandCursor: true });

        this.opcoes = this.add.sprite(375, 290, 'botoes', 1).setInteractive({ useHandCursor: true });

        this.comoJogar = this.add.sprite(375, 355, 'botoes', 2).setInteractive({ useHandCursor: true });

        this.jogar.once('pointerdown', function (pointer) {
            this.scene.start('CenaLoad');
        },this);
        
        this.opcoes.once('pointerdown', function (pointer) {
            this.scene.start('Options');
        },this);
        
        this.comoJogar.once('pointerdown', function (pointer) {
            this.scene.start('HowToScene');
        },this);
        


    }
}