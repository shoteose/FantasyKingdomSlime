var config = {
    type: Phaser.CANVAS,  // Corrigido de 'typeof' para 'type'
    parent: 'conteudo',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        CenaLoad, cenaMundo
    ]
};

var game = new Phaser.Game(config);
