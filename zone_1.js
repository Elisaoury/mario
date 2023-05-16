export class zone_1 extends Phaser.Scene {

    constructor() {
        super("zone_1")
    }

    preload() {

        this.load.spritesheet('perso', 'assets/perso.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('perso_droite', 'assets/perso_droite.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('perso_gauche', 'assets/perso_gauche.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.image('box', 'assets/box.png');


        // chargement tuiles de jeu
        this.load.image("Phaser_tuilesdejeu", "assets/Mon_Tileset.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("carte", "assets/Premier_Niveau.json");
    }


    platforms;
    player
    cursors



    create() {



        // tiled
        this.carteDuNiveau = this.add.tilemap("carte");
        this.tileset = this.carteDuNiveau.addTilesetImage(
            "Mon_Tileset",
            "Phaser_tuilesdejeu"
        );
        this.calque_background = this.carteDuNiveau.createLayer(
            "background",
            this.tileset
        );
        this.calque_collision = this.carteDuNiveau.createLayer(
            "collision",
            this.tileset
        );
        this.calque_decors = this.carteDuNiveau.createLayer(
            "decors",
            this.tileset
        );
        this.calque_plateforme = this.carteDuNiveau.createLayer(
            "plateform",
            this.tileset
        );

        //personnage
        this.player = this.physics.add.sprite(32, 32, 'perso');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // définition des tuiles de plateformes qui sont solides
        // utilisation de la propriété estSolide
        this.calque_plateforme.setCollisionByProperty({ estSolide: true });
        this.calque_collision.setCollisionByProperty({ estSolide: true });

        this.physics.add.collider(this.player, this.calque_plateforme);
        this.physics.add.collider(this.player, this.calque_collision);

        // clavier 

        this.cursors = this.input.keyboard.createCursorKeys()



        // redimentionnement du monde avec les dimensions calculées via tiled
        this.physics.world.setBounds(0, 0, 1600, 1600);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        // ancrage de la caméra sur le joueur
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player);
 
        // animation personnage
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso_gauche', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'perso', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso_droite', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.cursors = this.input.keyboard.createCursorKeys();

    }


    update() {
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (this.keyJump.isDown) {
            this.player.setVelocityY(-75);
            //    player.anims.play('jump', true);
        } else if (this.keyQ.isDown) {
            // Action pour la touche Q (gauche)
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.keyD.isDown) {
            // Action pour la touche D (droite)
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            // Aucune touche enfoncée (immobile)
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }


        
    }

    //this.update = update;
}
