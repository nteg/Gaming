var balls = new Array();

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
		this.game.load.spritesheet('balls','assets/balls_spritesheet.png',259,259,4);
		
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
        this.truck.scale.x = .3;
        this.truck.scale.y = .3;
        //this.truck.animations.add('rainbow', [105, 204, 300, 392, 489], 1, true);
        this.truck.animations.add('rainbow', [0, 1, 2, 3, 4, 5, 6, 7, 8], 0.1, true);

        for(index = 0; index < 4; index++){
            balls[index] = new Array();
            balls[index] = this.game.add.group();
            balls[index].enableBody = true;
            balls[index].physicsBodyType = Phaser.Physics.ARCADE;
            balls[index].createMultiple(1, 'balls', index);
            balls[index].scale.x = 0.7;
            balls[index].scale.y = 0.7;
            balls[index].setAll('outOfBoundsKill', true);
            balls[index].setAll('checkWorldBounds', true);
        }

        this.game.physics.arcade.enable([this.road, this.truck]);
        
        this.road.body.setSize(1349, 100, 0, 60);
        this.road.body.immovable = true;
        this.road.body.allowGravity = false;

        this.truck.body.setSize(350, 400, 0, 0);
        this.truck.body.gravity.y = 800;
        this.truck.body.bounce.y = 0.4;
        this.truck.body.velocity.x = 50;
        this.truck.body.maxVelocity.x = 100;
		
        // this.firstBall.body.velocity.x = -250;

        cursors = this.game.input.keyboard.createCursorKeys();
    };

    SimpleGame.prototype.update = function () {
        
        this.game.physics.arcade.collide(this.road, this.truck);
        this.game.physics.arcade.collide(balls, this.truck);

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
            this.truck.body.velocity.x = 350;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if(this.truck.body.y == 410) {
                
                this.truck.body.velocity.y = -500;
                this.jumpSound.play();
            }
        }

		if(this.truck.inWorld==false)
        {
            restartGame(this.truck,this.score,this.labelScore);
        }

        for (index = 0; index < 4; index++){
            
            //  Grab the first bullet we can from the pool
            ball = balls[index].getFirstExists(false);

            if (ball)
            {
                ball.reset(1361 + ((index+1) * 550), 570);
                ball.body.velocity.x = -250;
                ball.body.immovable = true;
            }
        }
    };

    return SimpleGame;
})();

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
}

window.onload = function () {
    var game = new SimpleGame();
};
