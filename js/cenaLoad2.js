var CenaLoad2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function CenaLoad2() {
            Phaser.Scene.call(this, { key: 'CenaLoad2' });
        },

    preload: function () {
        // -- Carregar o tileset
        this.load.image('tiles', 'assets/mapa/spreedsheet.png');

        // -- Carregar o mapa JSON
        this.load.tilemapTiledJSON('map2', 'assets/mapa/map2.json',32,32);

        // -- Carregar spritesheet do jogador
        this.load.spritesheet('player', 'assets/characters/carater_ajudavFF.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('slime', 'assets/characters/slime_og.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image('coracao','assets/coracao.png');
        this.load.image('relampago','assets/relampago.png');
        this.load.image('motorEolica','assets/motorEolica.png');
        this.load.audio('andar','assets/sounds/steps.ogg');
        this.load.audio('dano','assets/sounds/hitHurt.wav');
        this.load.audio('pickup','assets/sounds/pickupCoin.wav');

    },

    create: function () {
        this.scene.start('CenaMundo2');
    },
});
