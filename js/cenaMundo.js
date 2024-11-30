var cenaMundo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function cenaMundo() {
            Phaser.Scene.call(this, { key: 'cenaMundo' });
        },

    preload: function () { },

    create: function () {

        var mapa = this.make.tilemap({ key: 'map' });

        //Obter nime de um tileset
        //Disponivel ficheiro json

        var tiles = mapa.addTilesetImage('TX_Spreedsheetv5', 'tiles', 32, 32);

        // Criar camadas do mapa
        var solo = mapa.createLayer('solo', tiles, 0, 0);
        var sombra = mapa.createLayer('sombra', tiles, 0, 0);
        var obstaculo = mapa.createLayer('obstaculo', tiles, 0, 0);
        var obstaculos2 = mapa.createLayer('obstaculos2', tiles, 0, 0);
        var obstaculos3 = mapa.createLayer('obstaculos3', tiles, 0, 0);

        //adicionar o player (frame 6)
        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        // Limitar o movimento do player à área de jogo
        this.physics.world.bounds.width = mapa.widthInPixels;
        this.physics.world.bounds.height = mapa.heightInPixels;
        this.player.setCollideWorldBounds(true);

        // Input interação com as 4 setas de direção
        this.cursors = this.input.keyboard.createCursorKeys();

        // Colocar câmera a seguir o player
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Corrigir desenho de linhas
        this.cameras.main.roundPixels = true;

        // Animações do player
        this.anims.create({
            key: 'esquerdadireita',
            frames: this.anims.generateFrameNumbers('player',
                { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player',
                { frames: [2, 8, 2, 14] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player',
                { frames: [0, 6, 0, 12] }),
            frameRate: 10,
            repeat: -1
        });

        /*
        // Colisão com a layer de obstáculos
        obstaculos.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, obstaculos);
*/
        // Criar 30 "zonas inimigas"
        this.zonas = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for (let i = 0; i < 30; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            this.zonas.create(x, y, 20, 20);
        }

        // Colisão com as "zonas inimigas"
        this.physics.add.overlap(this.player, this.zonas, this.collisaoInimigo, false, this);
    },

    // Colisão com o inimigo
    collisaoInimigo: function (player, zona) {
        zona.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zona.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        this.cameras.main.shake(100);
        this.cameras.main.flash(100);
    },

    update: function () {
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-80);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(80);
        }

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-80);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(80);
        }

        // Animações do player 
        if (this.cursors.left.isDown) {
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown) {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.anims.play('down', true);
        }
        else {
            this.player.anims.stop();
        }
    }
});
