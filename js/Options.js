class Options extends Phaser.Scene {

    constructor() {
        super({ key: 'Options' });
    }

    preload() {
        this.load.image('background', 'assets/back.jpeg');
        this.load.image('titulo', 'assets/titulo.png');
        this.load.spritesheet('botoes', 'assets/botaosF.png', {
            frameWidth: 100,
            frameHeight: 50,
        });

        this.load.spritesheet('sons', 'assets/som.png', {
            frameWidth: 120,
            frameHeight: 107,
        });

        this.load.audio('click', 'assets/sounds/click.wav');
    }

    create() {

        this.audio = true;

        this.add.image(375, 375, 'background').setScale(0.79);
        this.add.image(375, 115, 'titulo');

        this.voltar = this.add.sprite(375, 365, 'botoes', 3).setInteractive({ useHandCursor: true });

        this.add.text(370, 275, "SOM: ", {
            fontSize: '30px',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5);

        this.botao = this.add.sprite(425, 275, 'sons', 0).setInteractive({ useHandCursor: true }).setScale(0.5);

        this.voltar.once('pointerdown', function (pointer) {
            this.scene.start('MenuScene');
            this.sound.play('click');
        }, this);

        this.botao.on('pointerdown', function (pointer) {

            this.sound.play('click');

            if (this.audio) {
                this.audio = false;
                console.log('Sem Som');
                this.sound.mute = true;
                this.botao.setFrame(3);
            } else {
                this.audio = true;
                console.log('Com Som');
                this.sound.mute = false;
                this.botao.setFrame(0);
            }

        }, this);

    }
}
