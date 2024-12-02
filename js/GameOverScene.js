class GameOverScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.image('background', 'assets/back.jpeg');
        this.load.image('titulo', 'assets/titulo.png');
        this.load.spritesheet('botoes', 'assets/botaosF.png', {
            frameWidth: 100,
            frameHeight: 50,
        });
        this.load.audio('gameover','assets/sounds/')
    }

    create(string) {

        this.add.image(375, 375, 'background').setScale(0.79);

        this.add.image(375, 115, 'titulo');
        let textoGameOver;
        let strings = string.split(":");
        let pontuacao= strings[1];
        let cacouTudo= string[0];

        if(cacouTudo == "Y"){

            textoGameOver = this.add.text(375, 215, "Parabens!! Salvaste o teu reino e os Slimes!! Conseguiste reconstruir a Eolica!!", {
                fontSize: '15px',
                color: '#000000', 
                align: 'center',
                fontStyle: 'bold'
            });
        
        }else{
            
            textoGameOver = this.add.text(375, 215, "GameOver", {
            fontSize: '15px',
            color: '#000000', 
            align: 'center',
            fontStyle: 'bold'
        });
        }

        textoGameOver.setOrigin(0.5, 0.5);

        let textoPontuacao = this.add.text(375, 230, "Obtiveste " + pontuacao + " pontos!!", {
            fontSize: '15px',
            color: '#000000', 
            align: 'center'
        });
        textoPontuacao.setOrigin(0.5, 0.5);

        this.jogar = this.add.sprite(375, 300, 'botoes', 4).setInteractive({ useHandCursor: true });

        this.opcoes = this.add.sprite(375, 365, 'botoes', 3).setInteractive({ useHandCursor: true });

        this.jogar.once('pointerdown', function (pointer) {
            this.scene.start('CenaLoad');
        },this);

        this.opcoes.once('pointerdown', function (pointer) {
            this.scene.start('MenuScene');
        },this);
    }
}
