function preload(){

    this.load.spritesheet('perso','assets/perso.png',
        { frameWidth: 32, frameHeight: 32 });   
    this.load.spritesheet('perso_droite','assets/perso_droite.png',
        { frameWidth: 32, frameHeight: 32 });
     this.load.spritesheet('perso_gauche','assets/perso_gauche.png',
        { frameWidth: 32, frameHeight: 32 });

// chargement tuiles de jeu
this.load.image("Phaser_tuilesdejeu", "assets/Mon_Tileset.png");

// chargement de la carte
this.load.tilemapTiledJSON("carte", "assets/Premier_Niveau.json");
}


var platforms;
var player
var cursors
var doubleJump = false;
var unlockDoubleJump = false;
var vie = false;
var unlockImmuniseEau = false;
var gameOver = false;
var offTouche = false; 
var beHit = false;
var clignotement = 0
var pointDeVie = 100

            

function create(){


    // chargement de la carte
const carteDuNiveau = this.add.tilemap("carte");

// chargement du jeu de tuiles
const tileset = carteDuNiveau.addTilesetImage(
          "Mon_Tileset",
          "Phaser_tuilesdejeu"
        );  

        // chargement du calque calque_background
const calque_background = carteDuNiveau.createLayer(
          "background",
          tileset
        );

// chargement du calque calque_background_2
const calque_collision = carteDuNiveau.createLayer(
          "collision",
          tileset
        );

// chargement du calque calque_plateformes
const calque_decors = carteDuNiveau.createLayer(
          "decors",
          tileset
        ); 
// chargement du calque calque_plateformes
const calque_plateforme = carteDuNiveau.createLayer(
          "plateform",
          tileset
        );  
   



//personnage
    player = this.physics.add.sprite(32, 32, 'perso');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('perso_gauche', {start:0,end:7}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'perso', frame:0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('perso_droite', {start:0,end:7}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('perso_saut', {start:0,end:4}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('perso_saut', {start:0,end:4}),
        frameRate: 10,
        repeat: -1
    });
   this.cursors = this.input.keyboard.createCursorKeys();




        // définition des tuiles de plateformes qui sont solides
// utilisation de la propriété estSolide
calque_plateforme.setCollisionByProperty({ estSolide: true }); 
calque_collision.setCollisionByProperty({ estSolide: true }); 

this.physics.add.collider(player, calque_plateforme); 
this.physics.add.collider(player, calque_collision); 

// redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 1600, 1600);
//  ajout du champs de la caméra de taille identique à celle du monde
this.cameras.main.setBounds(0, 0, 1600, 1600);
// ancrage de la caméra sur le joueur
this.cameras.main.startFollow(player); 
  
}


function update() {
    const keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    const keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    const keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    const keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    if (keyJump.isDown ) {
        player.setVelocityY(-75);
    //    player.anims.play('jump', true);
    } else if (keyQ.isDown) {
        // Action pour la touche Q (gauche)
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (keyD.isDown) {
        // Action pour la touche D (droite)
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        // Aucune touche enfoncée (immobile)
        player.setVelocityX(0);
        player.anims.play('turn');
    }
}
    //this.update = update;

