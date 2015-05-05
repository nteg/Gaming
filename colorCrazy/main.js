//var balls = new Array();

var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(1350, 600, Phaser.CANVAS, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.atlasXML('scenery', 'assets/bgElements_spritesheet.png', 'assets/bgElements_spritesheet.xml');
        this.game.load.spritesheet('frontMountain', 'assets/frontMountain.png');
        //this.game.load.atlasXML('cars', 'assets/sheet_allCars.png', 'assets/sheet_allCars.xml');
        this.game.load.atlasXML('cars', 'assets/monsterTruck.png', 'assets/monsterTruck.xml');
        this.game.load.spritesheet('road', 'assets/road.png');
        
        //this.game.load.spritesheet('balls','assets/balls_spritesheet.png',259,259,4);
        
        this.game.load.image('yellowBlock','assets/yellowBlock.png');
        this.game.load.image('greenBlock','assets/greenBlock.png');

        this.game.load.audio('jumpSound', ['assets/GU-StealDaisy.mp3', 'assets/GU-StealDaisy.ogg']);
    };

    SimpleGame.prototype.create = function () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.jumpSound = this.game.add.audio('jumpSound');

        this.background = this.game.add.sprite(0,0,'sky');
        //this.background.tint = 16711680;
        
        this.score = 0;  
        this.labelScore = this.game.add.text(10, 10, "0", { font: "30px Arial", fill: "#ffffff" });

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
        //this.truck.animations.add('rainbow', [105, 204, 300, 392, 489], 1, true);
        this.truck.animations.add('rainbow', [0, 1, 2, 3, 4, 5, 6, 7, 8], 0.5, true);

        /*for(index = 0; index < 4; index++){
            balls[index] = new Array();
            balls[index] = this.game.add.group();
            balls[index].enableBody = true;
            balls[index].physicsBodyType = Phaser.Physics.ARCADE;
            balls[index].createMultiple(1, 'balls', index);
            balls[index].scale.x = 0.7;
            balls[index].scale.y = 0.7;
            balls[index].setAll('outOfBoundsKill', true);
            balls[index].setAll('checkWorldBounds', true);
        }*/

        this.game.physics.arcade.enable([this.road, this.truck]);
        
        this.road.body.setSize(1349, 100, 0, 60);
        this.road.body.immovable = true;
        this.road.body.allowGravity = false;

        this.truck.body.setSize(350, 400, 0, 0);
        this.truck.body.gravity.y = 800;
        this.truck.body.bounce.y = 0.4;
        this.truck.body.velocity.x = 50;
        this.truck.body.maxVelocity.x = 200;
        
        // this.firstBall.body.velocity.x = -250;

        cursors = this.game.input.keyboard.createCursorKeys();

        addBlocksToScene(this);
        this.timer = this.game.time.events.loop(2000,addPointBlocks,this);
        this.timer = this.game.time.events.loop(2300,addObstacleBlocks,this);
    };

    SimpleGame.prototype.update = function () {
        
        this.game.physics.arcade.collide(this.road, this.truck);
        //this.game.physics.arcade.collide(balls, this.truck);       
        this.game.physics.arcade.collide(this.road,this.pointBlocks);
        this.game.physics.arcade.collide(this.road,this.obstacleBlocks);
        
        this.game.physics.arcade.overlap(this.truck,this.pointBlocks,collectPoints,null,this);
        this.game.physics.arcade.overlap(this.truck,this.obstacleBlocks, truckObstacleCollision,null,this);
        

        this.truck.animations.play('rainbow');

        if(this.sunObj.x > 1310){
            this.sunObj.x = -65;
        }
        if(this.bigStick.x < 0){
            resetBody(this.bigStick, 150);
        }
        if(this.smallStick.x < 0){
            resetBody(this.smallStick, 150);
        }
        if(this.bluePeak.x < 0){
            resetBody(this.bluePeak, 150);
        }
        if(this.birch.x < 0){
            resetBody(this.birch, 150);
        }

        if (cursors.left.isDown) {
                this.truck.body.velocity.x = 0;
        }
        else if (cursors.right.isDown) {
            this.truck.body.velocity.x = 200;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if(this.truck.body.y > 430) {
                
                this.truck.body.velocity.y = -500;
                this.jumpSound.play();
            }
        }

        if(this.truck.inWorld==false)
        {
            restartGame(this);
        }

        /*
        for (index = 0; index < 4; index++){
            
            //  Grab the first bullet we can from the pool
            ball = balls[index].getFirstExists(false);

            if (ball)
            {
                ball.reset(1361 + ((index+1) * 550), 570);
                ball.body.velocity.x = -250;
                ball.body.immovable = true;
            }
        }*/
    };

    return SimpleGame;
})();

var addBlocksToScene=function(scene){

        //Create Obstacle Block Group
        scene.obstacleBlocks=scene.game.add.group();
        scene.obstacleBlocks.enableBody=true;
        scene.obstacleBlocks.createMultiple(2000,'yellowBlock');
        

        //Create Point Block Group
        scene.pointBlocks=scene.game.add.group(); //create a group
        scene.pointBlocks.enableBody=true; //Add physics to the group
        scene.pointBlocks.createMultiple(2000,'greenBlock');

};

var addPointBlocks= function() {  
     
     
     for (var i = 0; i < 1; i++)
     {

        var randomNumber = Math.floor(Math.random() * 120) ; 

        //Adding green point block   
        pointBlock=this.pointBlocks.getFirstDead();
        pointBlock.body.gravity.y=120;
        pointBlock.body.bounce.y=0.6 + Math.random()*0.1;
        pointBlock.scale.setTo(0.5,0.5);        
        pointBlock.reset(1300+randomNumber,randomNumber+300);
        pointBlock.body.velocity.x=-300;            
        pointBlock.body.angularVelocity=-50;
        pointBlock.checkWorldBounds=true;
        pointBlock.outOfBoundsKill=true;

        
        /*obstacleBlock=this.obstacleBlocks.getFirstDead();
        obstacleBlock.body.gravity.y=100;
        obstacleBlock.body.bounce.y=0.5 + Math.random()*0.1;
        obstacleBlock.scale.setTo(0.4,0.4); 
        //obstacleBlock.reset(1300+randomNumber,randomNumber+105);
        obstacleBlock.reset(1350+randomNumber,randomNumber+135);
        obstacleBlock.body.velocity.x=-(320+(Math.random()*50));  
        obstacleBlock.body.angularVelocity=-50;             
        obstacleBlock.checkWorldBounds=true;
        obstacleBlock.outOfBoundsKill=true;*/

      }       

    

};

//Adding yellow  obstacle block
var addObstacleBlocks=function()
{
      for(var j=0;j<1;j++)
    {
        var randomNumber=Math.floor(Math.random() * 50);
        
        obstacleBlock=this.obstacleBlocks.getFirstDead();
        obstacleBlock.body.gravity.y=100;
        obstacleBlock.body.bounce.y=0.5 + Math.random()*0.1;
        obstacleBlock.scale.setTo(0.5,0.5); 
        //obstacleBlock.reset(1300+randomNumber,randomNumber+105);
        obstacleBlock.reset(1350+randomNumber,randomNumber+335);
        obstacleBlock.body.velocity.x=-(320+(Math.random()*50));  
        obstacleBlock.body.angularVelocity=-50;             
        obstacleBlock.checkWorldBounds=true;
        obstacleBlock.outOfBoundsKill=true;
    }  
}

var restartGame=function(game){  
    game.truck.x=0; 
    game.truck.y=0;
    
    game.score=0;
    game.labelScore.text=game.score;

    game.obstacleBlocks.destroy();
    game.pointBlocks.destroy();

    addBlocksToScene(game);
};

var resetBody = function (obj, parentSpeed) {
    obj.x = parentSpeed * 10;
};

var collectPoints=function(truck,pointBlock){        
        pointBlock.kill();        
        this.score += 1;  
        this.labelScore.text = this.score;
};

var truckObstacleCollision=function(truck,obstacleBlock){
    obstacleBlock.kill();
    restartGame(this);
};


window.onload = function () {
    var game = new SimpleGame();
};
