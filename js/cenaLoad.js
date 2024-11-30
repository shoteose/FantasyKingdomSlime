var CenaLoad = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function CenaLoad() {
            Phaser.Scene.call(this, { key: 'CenaLoad' });
        },

    preload: function () {
        // -- Carregar o tileset
        this.load.image('tiles', 'assets/map/spritesheet.png');

        // -- Carregar o mapa JSON
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');

        // -- Carregar spritesheet do jogador
        this.load.spritesheet('player', 'assets/RPG_assets.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
    },

    create: function () {
        this.scene.start('cenaMundo');
    },
});
