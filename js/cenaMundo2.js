var CenaMundo2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function CenaMundo2() {
            Phaser.Scene.call(this, { key: 'CenaMundo2' });
        },

    preload: function () { },

    create: function () {

        this.inimigos = [];
        this.lastDir;
        this.boost = false;
        this.vidas = 3;
        this.gameover = false;
        this.coletados = 0;

        this.pontuacao = 0;
        this.tempo = 0;
        this.somAndar = false;

        // Carregar o mapa
        var mapa = this.make.tilemap({ key: 'map2' });

        // Associar o tileset ao mapa (nome no JSON e chave carregada)
        var tiles = mapa.addTilesetImage('spreedsheet', 'tiles');

        // Criar camadas do mapa

        const soloBase = mapa.createLayer('soloBase', tiles, 0, 0);

        const solo = mapa.createLayer('solo', tiles, 0, 0);
        const sombra = mapa.createLayer('sombra', tiles, 0, 0);


        // Adicionar o player (frame 0)
        this.player = this.physics.add.sprite(105, 125, 'player', 0);

        const obstaculos = mapa.createLayer('obstaculos', tiles, 0, 0);
        const obstaculos2 = mapa.createLayer('obstaculos2', tiles, 0, 0);

        const naoObstaculo = mapa.createLayer('naoObstaculos', tiles, 0, 0);
        const naoObstaculo2 = mapa.createLayer('naoObstaculos2', tiles, 0, 0);


        // Limitar o movimento do player à área de jogo
        this.physics.world.bounds.width = mapa.widthInPixels;
        this.physics.world.bounds.height = mapa.heightInPixels;
        this.player.setCollideWorldBounds(true);


        this.relogio = this.time.addEvent({ delay: 1000, callback: this.atualizaTimer, callbackScope: this, loop: true });

        this.textoTempo = this.add.text(375, 15, "Tempo: " + this.tempo);

        this.textoColetavel = this.add.text(615, 15, this.coletados + " / 10");

        this.textoTempo.setScrollFactor(0);
        this.textoColetavel.setScrollFactor(0);

        this.energia = this.add.image(720, 420, 'relampago');
        this.energia.setScale(0.05);
        this.energia.setVisible(false);

        this.energia.setScrollFactor(0);

        this.sequenciaCoracoes = [];
        this.criarUI(this.sequenciaCoracoes);

        obstaculos.setCollisionByExclusion([-1]);
        obstaculos2.setCollisionByExclusion([-1]);




        // Input interação com as 4 setas de direção
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', this.fazBoost, this);
        this.input.on('pointerup', this.tiraBoost, this);

        // Colocar câmera a seguir o player
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Corrigir desenho de linhas
        this.cameras.main.roundPixels = true;

        this.createAnimacoes();
        this.createInimigos(obstaculos, obstaculos2);
        this.createColecao(obstaculos, obstaculos2);
        this.createCoracoesVida(obstaculos, obstaculos2);
        this.criarColisaoPlayer(obstaculos, obstaculos2);
        this.criarTextoInfo();


    },

    atualizaTimer: function () {
        this.tempo++;
        this.textoTempo.setText("Tempo: " + this.tempo);
    },

    criarUI: function (sequenciaCoracoes) {
        for (let i = 0; i < 3; i++) {
            let coracao = this.add.image(20 + (i * 30), 20, 'coracao');
            coracao.setScale(0.10);
            coracao.setScrollFactor(0); // Faz com que não se mexa com a camara
            sequenciaCoracoes.push(coracao);
        }

        let info = this.add.image(700, 20, 'motorEolica');
        info.setScale(0.15);
        info.setScrollFactor(0);

    },

    // Colisão com o inimigo
    collisaoInimigo: function (player, slime) {
        if (this.gameover) return;

        slime.destroy();

        this.sound.play('dano');
        this.perderVida();
        this.criarColisaoPlayer();
    },

    perseguirPlayer: function (slime) {
        if (slime && slime.body) {
            this.physics.moveToObject(slime, this.player, 30);
        }
    },

    fazBoost: function (pointer) {
        this.boost = true;
        this.energia.setVisible(true);
    },

    tiraBoost: function (pointer) {

        this.boost = false;
        this.energia.setVisible(false);
    },

    criarTextoInfo: function () {

        this.textoInstrucao = this.add.text(370, 175, "Apanha os componentes das Eolicas", {
            fontSize: '15px',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5);

        this.textoInstrucao2 = this.add.text(370, 200, "Para a Reconstruir e salvar o Reino e os Slimes.", {
            fontSize: '15px',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5);


        this.textoInstrucao3 = this.add.text(370, 215, "Cuidado que os Slimes que estão Agressivos", {
            fontSize: '15px',
            color: '#000000',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5);

    },

    createAnimacoes: function () {
        // Animações do player
        this.anims.create({
            key: 'esquerdadireita',
            frames: this.anims.generateFrameNumbers('player', { frames: [24, 25, 25, 27, 28, 29] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [30, 31, 32, 33, 34, 35] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [18, 19, 20, 21, 22, 23] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'slimeAnimacao',
            frames: this.anims.generateFrameNumbers('slime', { frames: [21, 22, 23, 24, 25, 26] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'slimeMorre',
            frames: this.anims.generateFrameNumbers('slime', { frames: [84, 85, 86, 87, 88] }),
            frameRate: 10,
            repeat: -1
        });
    },

    createInimigos: function (obstaculos, obstaculos2) {
        // Criar 10 inimigos (slimes)
        for (let i = 0; i < 10; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

            let slimeBeta = this.physics.add.sprite(x, y, 'slime', 1);

            console.log("Slime criado em:", x, y);

            slimeBeta.anims.play('slimeAnimacao', true);

            this.physics.add.collider(slimeBeta, obstaculos);
            this.physics.add.collider(slimeBeta, obstaculos2);

            this.physics.add.overlap(this.player, slimeBeta, this.collisaoInimigo, false, this);

            this.inimigos.push(slimeBeta);
        }
    },

    verificaXY: function (obstaculos, obstaculos2) {
        let coordenadas = [];
        let x, y, tile, tile2;
        do {
            x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

            // Verificar se a posição gerada está em um obstáculo
            tile = obstaculos.getTileAtWorldXY(x, y);
            tile2 = obstaculos2.getTileAtWorldXY(x, y);
        } while ((tile && tile.index !== -1) || (tile2 && tile2.index !== -1));  // Se o tile não for -1 (um tile vazio), tente novamente

        coordenadas.push(x);
        coordenadas.push(y);
        return coordenadas;

    },

    createColecao: function (obstaculos, obstaculos2) {
        // Criar 10 coletaveis
        for (let i = 0; i < 10; i++) {

            let coordenadas = this.verificaXY(obstaculos, obstaculos2);
            x = coordenadas[0];
            y = coordenadas[1];

            let colecionavel = this.physics.add.image(x, y, 'motorEolica');

            colecionavel.setScale(0.15);
            console.log("Colecionavel criado em:", x, y);

            this.physics.add.overlap(this.player, colecionavel, this.coletar, false, this);

        }
    },

    createCoracoesVida: function (obstaculos, obstaculos2) {

        for (let i = 0; i < this.vidas; i++) {

            let coordenadas = this.verificaXY(obstaculos, obstaculos2);
            x = coordenadas[0];
            y = coordenadas[1];

            let coracoes = this.physics.add.image(x, y, 'coracao');

            coracoes.setScale(0.15);
            console.log("Coracoes criado em:", x, y);

            this.physics.add.overlap(this.player, coracoes, this.coletarVida, false, this);

        }
    },

    coletarVida: function (player, coracao) {

        if (this.vidas == 3) {

            coracao.destroy();
            this.sound.play('pickup');

        } else {

            coracao.destroy();
            this.sound.play('pickup');
            this.ganharVida();

        }

    },

    coletar: function (player, colecionavel) {
        colecionavel.destroy();
        this.sound.play('pickup');

        this.coletados++;
        this.textoColetavel.setText(this.coletados + " / 10");

        if (this.coletados == 10) {
            this.gameOver();
        }

    },

    perderVida: function () {
        this.cameras.main.shake(100);
        this.cameras.main.flash(100);

        this.vidas--;

        if (this.vidas == 0) {
            this.gameOver();
        }

        this.atualizarVidas();
    },

    ganharVida: function () {

        this.vidas++;
        this.atualizarVidas();
    },

    criarColisaoPlayer: function (obstaculos, obstaculos2) {
        this.physics.add.collider(this.player, obstaculos);
        this.physics.add.collider(this.player, obstaculos2);
        this.playerCollider = this.physics.add.collider(this.player, this.inimigos, this.collisaoInimigo, null, this);
    },

    atualizarVidas: function () {
        for (let i = 0; i < this.vidas; i++) {
            if (i < this.vidas) {
                this.sequenciaCoracoes[i].setVisible(true);
            } else {
                this.sequenciaCoracoes[i].setVisible(false);
            }
        }
    },

    movimento: function (velocidade) {

        // se player se mexer faz com as instrucoes desapareçam
        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
            this.textoInstrucao.setVisible(false);
            this.textoInstrucao2.setVisible(false);
            this.textoInstrucao3.setVisible(false);
        }

        // Movimento do jogador
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-velocidade);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(velocidade);
        }

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-velocidade);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(velocidade);
        }

        // Animação e o som de andar
        if (this.cursors.left.isDown) {
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = true;
            // se somAndar for falso faz tocar o som em lopp
            if (!this.somAndar) {
                this.somAndar = true;
                this.sound.play('andar', { loop: true });
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = false;
            if (!this.somAndar) {
                this.somAndar = true;
                this.sound.play('andar', { loop: true });
            }
        }
        else if (this.cursors.up.isDown) {
            this.player.anims.play('up', true);
            if (!this.somAndar) {
                this.somAndar = true;
                this.sound.play('andar', { loop: true });
            }
        }
        else if (this.cursors.down.isDown) {
            this.player.anims.play('down', true);
            if (!this.somAndar) {
                this.somAndar = true;
                this.sound.play('andar', { loop: true });
            }
        }
        else {

            this.player.anims.stop();

            if (this.somAndar) {
                this.somAndar = false;
                this.sound.stopByKey('andar');  // Para o som
            }
        }
    },

    gameOver: function () {
        this.somAndar = false;
        this.sound.stopByKey('andar');

        this.gameover = true;
        let pontTempo = 100 - (this.tempo / 10);
        let cacouTudo;
        this.pontuacao = this.coletados * pontTempo - (3 - this.vidas) * 10;
        if (this.coletados == 10) {
            cacouTudo = "Y:" + this.pontuacao + ":2";
        } else {
            cacouTudo = "N:" + this.pontuacao + ":2";
        }
        console.log(cacouTudo);
        this.scene.start('GameOver', cacouTudo);
    },

    update: function () {
        this.atualizarVidas();

        // Parar o movimento do jogador
        this.player.body.setVelocity(0);

        let velocidade = this.boost ? 120 : 80;

        if (!this.gameover) {

            this.movimento(velocidade);
            this.inimigos.forEach(this.perseguirPlayer, this);

        } else {

            this.inimigos.forEach(function (slime) {

                if (slime && slime.body) {
                    slime.body.setVelocity(0);
                }

            });
        }

    }
});
