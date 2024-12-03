class HowToScene extends Phaser.Scene {

    constructor() {
        super({ key: 'HowToScene' });
    }

    preload() {

        this.load.image('background', 'assets/ui/back.jpeg');
        this.load.image('titulo', 'assets/ui/titulo.png');
        this.load.image('tabela', 'assets/ui/botaos.png');
        this.load.image('info', 'assets/ui/info.png');
        this.load.spritesheet('botoes', 'assets/ui/botaosF.png', {
            frameWidth: 100,
            frameHeight: 50,
        });

        this.load.audio('click', 'assets/sounds/click.wav');


    }

    create() {
        this.add.image(375, 375, 'background').setScale(0.79);

        this.add.image(375, 115, 'titulo');


        this.add.image(375, 275, 'info');


        this.voltar = this.add.sprite(375, 365, 'botoes', 3).setInteractive({ useHandCursor: true });

        this.voltar.once('pointerdown', function (pointer) {
            this.scene.start('MenuScene');
            this.sound.play('click');
        }, this);

    }
}