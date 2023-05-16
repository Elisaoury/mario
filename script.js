import {zone_1} from "./assets/zone_1.js";


var config = 
{
    type: Phaser.AUTO,
        scale:{
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
    
    scene:[zone_1]


};

new Phaser.Game(config);




                    


          
