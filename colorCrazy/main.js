//var balls = new Array();

var SimpleGame = function (game) {}
    
SimpleGame.prototype={

        preload:function () {
        this.game.score = 0;     
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.atlasXML('scenery', 'assets/bgElements_spritesheet.png', 'assets/bgElements_spritesheet.xml');
        this.game.load.spritesheet('frontMountain', 'assets/frontMountain.png');        
        this.game.load.atlasXML('cars', 'assets/monsterTruck.png', 'assets/monsterTruck.xml');
        this.game.load.spritesheet('road', 'assets/road.png');
        
        this.game.load.image('blueBlock','assets/blueBlock.png');
        this.game.load.image('redBlock','assets/redBlock.png');
        this.game.load.image('brownBlock','assets/brownBlock.png');
        this.game.load.image('blackBlock','assets/blackBlock.png');
        this.game.load.image("exitgame","assets/exitBtn.png");
        this.game.load.audio('jumpSound', ['assets/GU-StealDaisy.mp3', 'assets/GU-StealDaisy.ogg']);
    },

    create:function () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.jumpSound = this.game.add.audio('jumpSound');

        this.background = this.game.add.sprite(0,0,'sky');
        //this.background.tint = 16711680;
        
        //this.score = 0;  
        this.labelScore = this.game.add.text(10, 10, "0", { font: "30px Arial", fill: "#ffffff" });        
        this.game.add.button(1200,0,"exitgame",this.exitGame,this);
        
        this.animationFrame=null;
        this.frameNumber=null;
        this.blockType=null;

        /*
        55  -   SUN
        24  -   CLOUDS
        38  -   BACK CLIFF
        37  -   FRONT CLIFF
        78  -   BLUE STICK
        82  -   OLD BIRCH
        50  -   BLUE PEAKS
        30  -   GRASS
        88  -   CHRISMAS TREE SMALL
        91  -   DOUBLE CACTI
        92  -   SINGLE CACTUS
        */
        
        var sceneFrames = [55, 24, 38, 37, 78, 82, 50, 35, 88, 91, 92,];

        sceneActors = this.game.add.group();
        sceneActors.enableBody = true;
        sceneActors.physicsBodyType = Phaser.Physics.ARCADE;
        sceneActors.setAll('outOfBoundsKill', true);


        this.sunObj = sceneActors.create(500, 80, 'scenery', sceneFrames[0]);

        //sunObj = this.game.add.tileSprite(500, 80, 87, 86, 'scenery', sceneFrames[0]);
        //this.game.physics.arcade.enable(sunObj);
        this.sunObj.body.velocity.x = 10;

        clouds = this.game.add.tileSprite(0, 90, 1349, 206, 'scenery', sceneFrames[1], sceneActors);
        clouds.scale.y = 1.5;
        clouds.autoScroll(-50,0);

        backMountains = this.game.add.tileSprite(0, 330, 1349, 128, 'scenery', sceneFrames[2], sceneActors);
        backMountains.autoScroll(-150,0);

        this.smallStick = sceneActors.create(520, 305, 'scenery', sceneFrames[4], sceneActors);
        this.smallStick.body.velocity.x = -150;
        this.smallStick.scale.x = 0.2;
        this.smallStick.scale.y = 0.2;

        this.bigStick = sceneActors.create(540, 280, 'scenery', sceneFrames[4], sceneActors);
        this.bigStick.body.velocity.x = -150;
        this.bigStick.scale.x = 0.2;
        this.bigStick.scale.y = 0.3;

        this.birch = sceneActors.create(1170, 280, 'scenery', sceneFrames[5], sceneActors);
        this.birch.body.velocity.x = -150;
        this.birch.scale.x = 0.4;
        this.birch.scale.y = 0.3;

        this.bluePeak = sceneActors.create(1085, 290, 'scenery', sceneFrames[6], sceneActors);
        this.bluePeak.body.velocity.x = -150;
        this.bluePeak.scale.x = 0.4;
        this.bluePeak.scale.y = 0.3;

        //this.game.tileSprite(50, 300, 59, 285, 'scenery', sceneFrames[4]);

        this.frontMountains = this.game.add.tileSprite(0, 330, 1349, 250, 'frontMountain', sceneActors);
        this.frontMountains.autoScroll(-200,0);
        
        this.road = this.game.add.tileSprite(0, 470, 1349, 150, 'road', sceneActors);
        this.road.autoScroll(-250,0);

        this.truck = this.game.add.sprite(0, 0, 'cars');
        this.truck.scale.x = .2;
        this.truck.scale.y = .2;       

        /*
          0 -  blue
          1 - red
          2 - brown
          3 - black          
        */

        this.truck.animations.add('rainbow', [0, 1, 2, 3], 0.1, true);        
        this.game.physics.arcade.enable([this.road, this.truck]);
        
        this.road.body.setSize(1349, 100, 0, 60);
        this.road.body.immovable = true;
        this.road.body.allowGravity = false;

        this.truck.body.setSize(350, 400, 0, 0);
        this.truck.body.gravity.y = 800;
        this.truck.body.bounce.y = 0.4;
        this.truck.body.velocity.x = 50;
        this.truck.body.maxVelocity.x = 200;
                
        cursors = this.game.input.keyboard.createCursorKeys();

        this.addBlocksToScene();   
        this.timer = this.time.events.loop(2000,this.addBlocks,this);             
    },

    update:function () {
        
        this.truck.animations.play('rainbow');                
        
        this.game.physics.arcade.collide(this.road, this.truck); 
        this.game.physics.arcade.collide(this.road,this.blueBlocks);
        this.game.physics.arcade.collide(this.road,this.redBlocks);
        this.game.physics.arcade.collide(this.road,this.brownBlocks);
        this.game.physics.arcade.collide(this.road,this.blackBlocks);
        
        this.game.physics.arcade.overlap(this.truck,this.blueBlocks,this.truckBlockOverlap,null,this);
        this.game.physics.arcade.overlap(this.truck,this.redBlocks,this.truckBlockOverlap,null,this);
        this.game.physics.arcade.overlap(this.truck,this.brownBlocks,this.truckBlockOverlap,null,this);
        this.game.physics.arcade.overlap(this.truck,this.blackBlocks,this.truckBlockOverlap,null,this);       
        

        if(this.sunObj.x > 1310){
            this.sunObj.x = -65;
        }
        if(this.bigStick.x < 0){
            this.resetBody(this.bigStick, 150);
        }
        if(this.smallStick.x < 0){
            this.resetBody(this.smallStick, 150);
        }
        if(this.bluePeak.x < 0){
            this.resetBody(this.bluePeak, 150);
        }
        if(this.birch.x < 0){
            this.resetBody(this.birch, 150);
        }

        if (cursors.left.isDown) {
                this.truck.body.velocity.x-= 10 ;
                   
        }
        else if (cursors.right.isDown) {
            this.truck.body.velocity.x = 200;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || cursors.up.isDown) {
            if(this.truck.body.y > 430) {
                
                this.truck.body.velocity.y = -500;
                this.jumpSound.play();
            }
        }

        if(this.truck.inWorld==false)
        {
            this.restartGame();
        }
        
    },

    addBlocksToScene:function(){
        //Create blue block group
        this.blueBlocks=this.game.add.group();
        this.blueBlocks.enableBody=true;
        this.blueBlocks.createMultiple(2000,'blueBlock');
        

        //Create red block group
        this.redBlocks=this.game.add.group();
        this.redBlocks.enableBody=true;
        this.redBlocks.createMultiple(2000,'redBlock');
        

        //Create  brown block group
        this.brownBlocks=this.game.add.group();
        this.brownBlocks.enableBody=true;
        this.brownBlocks.createMultiple(2000,'brownBlock');
        

        //Create black block group
        this.blackBlocks=this.game.add.group();
        this.blackBlocks.enableBody=true;
        this.blackBlocks.createMultiple(2000,'blackBlock');
    },

    addBlocks:function(){

        this.frameNumber = Math.floor(Math.random()*10)
        
        /*
        0,4,8 -> blueblock            0-> blue car
        1,5,9 -> redBlocks            1->red car
        2,6 -> brownBlock             2->brown car
        3,7 -> blackBlocks            3-> black car                  

        */
        
        
        if(this.frameNumber == 0 || this.frameNumber == 4 || this.frameNumber == 8){
         this.blockType=this.blueBlocks;
         this.frameNumber=0;
        }
        else if(this.frameNumber == 1 || this.frameNumber == 5 || this.frameNumber == 9){
         this.blockType=this.redBlocks;
         this.frameNumber=1;
        }
        else if(this.frameNumber == 2 || this.frameNumber== 6){
         this.blockType=this.brownBlocks;
         this.frameNumber=2;
        }            
        else if(this.frameNumber == 3 || this.frameNumber == 7){
         this.blockType=this.blackBlocks;
         this.frameNumber=3;
        }

        
        if(this.frameNumber != undefined && this.blockType != null)
        {
        
            var randomNumber = Math.floor(Math.random() * 120) ;                
            gameBlock=this.blockType.getFirstDead();
            if(gameBlock != null)
            {
                gameBlock.body.gravity.y=120;
                gameBlock.body.bounce.y=0.6 + Math.random()*0.1;
                gameBlock.scale.setTo(0.5,0.5);        
                gameBlock.reset(1300+randomNumber,randomNumber+300);
                gameBlock.body.velocity.x=-300;            
                gameBlock.body.angularVelocity=-50;
                gameBlock.checkWorldBounds=true;
                gameBlock.frameNumber=this.frameNumber;

           }
         }
    },

    exitGame:function(){
        this.game.state.start("mainmenu");
    },

    restartGame:function(){  
    this.truck.x=0; 
    this.truck.y=0;
    this.truck.body.velocity.x=0;
    
    this.game.score=0;
    this.labelScore.text=this.game.score;

    this.blueBlocks.destroy();
    this.redBlocks.destroy();
    this.brownBlocks.destroy();
    this.blackBlocks.destroy();
  
    this.addBlocksToScene();
    },

     resetBody : function (obj, parentSpeed) {
        obj.x = parentSpeed * 10;
    },

     truckBlockOverlap:function(truck,gameBlock){

        this.animationFrame=this.truck.animations.currentAnim.frame;

        if(this.animationFrame == gameBlock.frameNumber )
        {

            gameBlock.kill();        
            this.game.score += 1;  
            this.labelScore.text = this.game.score;
        }
        else
        {
            gameBlock.kill();
            //this.restartGame();
            this.game.state.start("gameover");
        }

    }
    //return SimpleGame;
}
//)();

/*
var addBlocksToScene=function(scene){               

        //Create blue block group
        scene.blueBlocks=scene.game.add.group();
        scene.blueBlocks.enableBody=true;
        scene.blueBlocks.createMultiple(2000,'blueBlock');
        

        //Create red block group
        scene.redBlocks=scene.game.add.group();
        scene.redBlocks.enableBody=true;
        scene.redBlocks.createMultiple(2000,'redBlock');
        

        //Create  brown block group
        scene.brownBlocks=scene.game.add.group();
        scene.brownBlocks.enableBody=true;
        scene.brownBlocks.createMultiple(2000,'brownBlock');
        

        //Create black block group
        scene.blackBlocks=scene.game.add.group();
        scene.blackBlocks.enableBody=true;
        scene.blackBlocks.createMultiple(2000,'blackBlock');
        
        
};*/

/*
var addBlocks=function(){
        
        this.frameNumber = Math.floor(Math.random()*10)
        
        
      
        
        
        if(this.frameNumber == 0 || this.frameNumber == 4 || this.frameNumber == 8){
         this.blockType=this.blueBlocks;
         this.frameNumber=0;
        }
        else if(this.frameNumber == 1 || this.frameNumber == 5 || this.frameNumber == 9){
         this.blockType=this.redBlocks;
         this.frameNumber=1;
        }
        else if(this.frameNumber == 2 || this.frameNumber== 6){
         this.blockType=this.brownBlocks;
         this.frameNumber=2;
        }            
        else if(this.frameNumber == 3 || this.frameNumber == 7){
         this.blockType=this.blackBlocks;
         this.frameNumber=3;
        }

        
        if(this.frameNumber != undefined && this.blockType != null)
        {
        
            var randomNumber = Math.floor(Math.random() * 120) ;                
            gameBlock=this.blockType.getFirstDead();
            if(gameBlock != null)
            {
                gameBlock.body.gravity.y=120;
                gameBlock.body.bounce.y=0.6 + Math.random()*0.1;
                gameBlock.scale.setTo(0.5,0.5);        
                gameBlock.reset(1300+randomNumber,randomNumber+300);
                gameBlock.body.velocity.x=-300;            
                gameBlock.body.angularVelocity=-50;
                gameBlock.checkWorldBounds=true;
                gameBlock.frameNumber=this.frameNumber;

           }
         }
}*/

/*
var restartGame=function(game){  
    game.truck.x=0; 
    game.truck.y=0;
    
    game.score=0;
    game.labelScore.text=game.score;

    game.blueBlocks.destroy();
    game.redBlocks.destroy();
    game.brownBlocks.destroy();
    game.blackBlocks.destroy();
  
    addBlocksToScene(game);
};

var resetBody = function (obj, parentSpeed) {
    obj.x = parentSpeed * 10;
};

var truckBlockOverlap=function(truck,gameBlock){

    this.animationFrame=this.truck.animations.currentAnim.frame;

    if(this.animationFrame == gameBlock.frameNumber )
    {

        gameBlock.kill();        
        this.score += 1;  
        this.labelScore.text = this.score;
    }
    else
    {
        gameBlock.kill();
        restartGame(this);
    }

};*/

/*
window.onload = function () {
    var game = new SimpleGame();
};*/
