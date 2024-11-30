var config = {
    typeof : Phaser.CANVAS,
    parent : 'conteudo',
    width  : 750,
    height : 450,
    zoom   : 2,
    pixelArt : true,
    physics : {
        default: 'arcade',
        arcade : {
            gravity : { y : 0 },
            debug : true
        }
    },
    scene : [
        CenaLoad, cenaMundo
    ]
};

var game = new Phaser.Game(config);