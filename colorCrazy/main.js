var ball;

var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(1350, 600, Phaser.CANVAS, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.atlasXML('scenery', 'assets/bgElements_spritesheet.png', 'assets/bgElements_spritesheet.xml');
        this.game.load.spritesheet('frontMountain', 'assets/frontMountain.png');
        this.game.load.atlasXML('cars', 'assets/sheet_allCars.png', 'assets/sheet_allCars.xml');
        this.game.load.spritesheet('road', 'assets/newRoad.png');
        
        this.game.load.spritesheet('balls','assets/balls_spritesheet.png',259,259,4);
        //this.game.load.atlasXML('city','assets/cityTiles_sheet.png','assets/cityTiles_sheet.xml');
        //this.game.load.image('block','assets/block.png');
    };

    SimpleGame.prototype.create = function () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = this.game.add.sprite(0,0,'sky');
        //this.background.tint = 16711680;
        
        this.score = 0;  
        this.labelScore = this.game.add.text(10, 10, "0", { font: "30px Arial", fill: "#ffffff" });      

        //this.obstacleCount=0;

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
               
        /*
        sceneObstacles=this.game.add.group();
        sceneObstacles.enableBody=true;
        sceneObstacles.physicsBodyType=Phaser.Physics.ARCADE;

        //On adding obstacles in this manner it is gettng lost behnd the clouds
        this.yellowBall=sceneObstacles.create(0,0,'balls',0);
        this.yellowBall.scale.x=0.3;
        this.yellowBall.scale.y=0.3;
        this.yellowBall.body.gravity.y=100;
        this.yellowBall.anchor.setTo(0,505);
        
        this.redBall=sceneObstacles.create(50,0,'balls',1);
        this.redBall.scale.x=0.3;
        this.redBall.scale.y=0.3;
        

        this.blueBall=sceneObstacles.create(100,0,'balls',2);
        this.blueBall.scale.x=0.3;
        this.blueBall.scale.y=0.3;
        

        this.greenBall=sceneObstacles.create(150,0,'balls',3);
        this.greenBall.scale.x=0.3;
        this.greenBall.scale.y=0.3;*/

        //create a method to randomly generate these balls and place them 


        sceneActors = this.game.add.group();
        sceneActors.enableBody = true;
        sceneActors.physicsBodyType = Phaser.Physics.ARCADE;

        this.sunObj = sceneActors.create(500, 80, 'scenery', sceneFrames[0]);

        //sunObj = this.game.add.tileSprite(500, 80, 87, 86, 'scenery', sceneFrames[0]);
        //this.game.physics.arcade.enable(sunObj);
        this.sunObj.body.velocity.x = 10;

        clouds = this.game.add.tileSprite(0, 70, 1399, 206, 'scenery', sceneFrames[1], sceneActors);
        clouds.scale.y = 1.5;
        clouds.autoScroll(-50,0);

        backMountains = this.game.add.tileSprite(0, 310, 1399, 128, 'scenery', sceneFrames[2], sceneActors);
        backMountains.autoScroll(-150,0);

        this.smallStick = sceneActors.create(520, 285, 'scenery', sceneFrames[4], sceneActors);
        this.smallStick.body.velocity.x = -150;
        this.smallStick.scale.x = 0.2;
        this.smallStick.scale.y = 0.2;

        this.bigStick = sceneActors.create(540, 260, 'scenery', sceneFrames[4], sceneActors);
        this.bigStick.body.velocity.x = -150;
        this.bigStick.scale.x = 0.2;
        this.bigStick.scale.y = 0.3;

        this.birch = sceneActors.create(1170, 260, 'scenery', sceneFrames[5], sceneActors);
        this.birch.body.velocity.x = -150;
        this.birch.scale.x = 0.4;
        this.birch.scale.y = 0.3;

        this.bluePeak = sceneActors.create(1085, 270, 'scenery', sceneFrames[6], sceneActors);
        this.bluePeak.body.velocity.x = -150;
        this.bluePeak.scale.x = 0.4;
        this.bluePeak.scale.y = 0.3;

        //this.game.tileSprite(50, 300, 59, 285, 'scenery', sceneFrames[4]);

        this.frontMountains = this.game.add.tileSprite(0, 310, 1399, 250, 'frontMountain', sceneActors);
        this.frontMountains.autoScroll(-200,0);
        
        this.road = this.game.add.tileSprite(0, 480, 1399, 120, 'road', sceneActors);
        this.road.autoScroll(-250,0);
        
        this.truck = this.game.add.sprite(0, 0, 'cars', 392);
        this.truck.scale.x = 3;
        this.truck.scale.y = 2;
        this.truck.animations.add('rainbow', [105, 204, 300, 392, 489], 1, true);
        this.game.physics.arcade.enable([this.road, this.truck]);
        
        
        this.road.body.setSize(1399, 120, 0, 60);
        this.road.body.immovable = true;
        this.road.body.allowGravity = false;

        this.truck.body.gravity.y = 800;
        this.truck.body.bounce.y = 0.4;
        this.truck.body.velocity.x = 10;
        this.truck.body.maxVelocity.x = 100;
        this.truck.body.colliderWorldBounds = true;

        //*******Working code ********//
        /*
        this.redBall=this.game.add.sprite(150,400,'balls',1);
        this.redBall.scale.x=0.3;
        this.redBall.scale.y=0.3;
        
        this.game.physics.arcade.enable(this.redBall);
        this.redBall.body.gravity.y=500;
        this.redBall.body.bounce.y=0.6;
        this.redBall.body.colliderWorldBounds=true;
        
        this.yellowBall=this.game.add.sprite(250,400,'balls',0);
        this.yellowBall.scale.x=0.3;
        this.yellowBall.scale.y=0.3;
        
        this.game.physics.arcade.enable(this.yellowBall);
        this.yellowBall.body.gravity.y=500;
        this.yellowBall.body.bounce.y=0.6;
        this.yellowBall.body.colliderWorldBounds=true;
        
        //******Working code ******* //
        */
        

        //sceneObstacles.add(this.redBall);
        //sceneObstacles.add(this.yellowBall);



        this.yellowBalls=this.game.add.group();
        this.yellowBalls.enableBody=true;
        this.yellowBalls.createMultiple(2000,'balls',0);
        //this.yellowBalls.physicsBodyType = Phaser.Physics.ARCADE;

        this.redBalls=this.game.add.group(); //create a group
        this.redBalls.enableBody=true; //Add physics to the group
        this.redBalls.createMultiple(2000,'balls',1);
        //this.redBalls.physicsBodyType = Phaser.Physics.ARCADE;
        //this.game.physics.arcade.enable(this.redBalls);               
        //this.game.physics.arcade.enable([this.road, this.yellowBalls]);
        //this.game.physics.arcade.enable([this.road, this.redBalls]);

        this.timer = this.game.time.events.loop(1000,addBalls,this);  
        //addObstacles(this);

        cursors = this.game.input.keyboard.createCursorKeys();
    };

    SimpleGame.prototype.update = function () {
       
        this.game.physics.arcade.collide(this.road, this.truck);        
        this.game.physics.arcade.collide(this.road,this.yellowBalls);
        this.game.physics.arcade.collide(this.road,this.redBalls);

        //this.game.physics.arcade.overlap(this.yellowBalls,this.truck, restartGame,null,this);
        this.game.physics.arcade.overlap(this.redBalls,this.truck, collectBalls,null,this);
                 
        /* working code
          this.game.physics.arcade.collide(this.road,this.redBall);

        this.game.physics.arcade.collide(this.road,this.yellowBall); 

        this.game.physics.arcade.overlap(this.truck, this.redBall, collectBalls);
        this.game.physics.arcade.overlap(this.truck, this.yellowBall, restartGame );*/
        

        //this.truck.animations.play('rainbow');

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
            this.truck.body.velocity.x = 450;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if(this.truck.body.y == 488) {
                this.truck.body.velocity.y = -500;
            }
        }

        if(this.truck.inWorld==false)
        {
            restartGame(this.truck,this.score,this.labelScore);
        }
    };

    /*SimpleGame.prototype.addBalls=function(){

        var randomNumber= new RandomDataGenerator([0,1,2,3]);
        this.greenBall=sceneObstacles.create(150,0,'balls',randomNumber);
        this.greenBall.scale.x=0.5;
        this.greenBall.scale.y=0.5;
    };*/
   

    return SimpleGame;
})();

/*var addOneBall= function(x, y,pipe) {  
    // Get the first dead pipe of our group
    //var pipe = pipes.getFirstDead();

    // Set the new position of the pipe
    pipe.reset(x, y);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
    };*/

var addBalls= function() {  
     // var pipe;        
    //var pipes=this.pipes;
    //pipe.reset(0, 0);
    // Add the 6 pipes 
    //if(this.obstacleCount < 50 )
    //{

     //Adding red balls   
     for (var i = 0; i < 1; i++)
     {
        ball=this.redBalls.getFirstDead();
        ball.body.gravity.y=200;
        ball.body.bounce.y=0.4;
        ball.scale.setTo(0.3,0.3);

        var randomNumber = Math.floor(Math.random() * 120) ; 
        ball.reset(1300+randomNumber,randomNumber+200);
        ball.body.velocity.x=-300;    
        //ball.body.colliderWorldBounds = true;    
        //this.obstacleCount+=1;

      }       

    //Adding yellow balls
    for(var j=0;j<1;j++)
    {
        var randomNumber=Math.floor(Math.random() * 50);
        obstacleBall=this.yellowBalls.getFirstDead();
        obstacleBall.body.gravity.y=100;
        obstacleBall.body.bounce.y=0.5;
        obstacleBall.scale.setTo(0.3,0.3);
        obstacleBall.reset(1300+randomNumber,randomNumber+50);
        obstacleBall.body.velocity.x=-350;    
        //obstacleBall.body.colliderWorldBounds = true;    
        
    }
    //}//this.score += 1;  
    //this.labelScore.text = this.score; 

    };

var restartGame=function(truck,score,labelScore){
//Show score and restart
    truck.x=0; 
    truck.y=0;
    //var game=new SimpleGame();
    score=0;
    labelScore.text=score;

};

var resetBody = function (obj, parentSpeed) {
    obj.x = parentSpeed * 10;
};

var collectBalls=function(truck,redBall){        
        redBall.kill();
        
        this.score += 1;  
        this.labelScore.text = this.score;
    };
window.onload = function () {
    var game = new SimpleGame();
};
