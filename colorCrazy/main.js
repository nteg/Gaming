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
    };

    SimpleGame.prototype.create = function () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = this.game.add.sprite(0,0,'sky');
        //this.background.tint = 16711680;

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

        cursors = this.game.input.keyboard.createCursorKeys();
    };

    SimpleGame.prototype.update = function () {
        
        this.game.physics.arcade.collide(this.road, this.truck);

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
            if(this.truck.body.y == 488) {
                this.truck.body.velocity.y = -500;
            }
        }
    };

    return SimpleGame;
})();

var resetBody = function (obj, parentSpeed) {
    obj.x = parentSpeed * 10;
}

window.onload = function () {
    var game = new SimpleGame();
};
