var CenaLoad = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function CenaLoad() {
            Phaser.Scene.call(this, { key: 'CenaLoad' });
        },

    preload: function () {
        // -- Carregar o tileset
        this.load.image('tiles', 'assets/mapa/spreedsheet.png');

        // -- Carregar o mapa JSON
        this.load.tilemapTiledJSON('map', 'assets/mapa/map.json',32,32);

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
    },

    create: function () {
        this.scene.start('cenaMundo');
    },
});