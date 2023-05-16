import {zone_1} from "./assets/zone_1.js";
//import {scene2} from "./assets/scene2.js";

var config = 
{
    type: Phaser.AUTO,
        scale:{
            mode:phaser.scale.FIT,
            width: 800, 
            height: 600,

    },
    

    physics: {
        default: 'arcade',
        arcade: 
        {
            gravity: { y:300},
            debug: true
        }
    },
    
    scene: [zone_1,zone_2 ]


};

new Phaser.Game(config);




                    


          
