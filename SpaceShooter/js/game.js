SpaceShooter.Game = function(game) {
    this.far;
    this.ship;
    this.cursors;
    
    this.weapons = [];
    this.currentWeapon = 0;
    this.asteroids;
}

SpaceShooter.Game.prototype = {

    create: function () {

        //  To make the sprite move we need to enable Arcade Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        background = this.add.tileSprite(0, 0, 560, 560, 'background');
        ship = this.add.sprite(10,200,'player'); 
    
        this.physics.enable(ship,Phaser.Physics.ARCADE);
        arrowKeys = this.input.keyboard.createCursorKeys();
        
        // restrict ship movement to canvas bounds.
        ship.body.collideWorldBounds = true;

        // Add new weapon types to weapons array.
        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.currentWeapon = 0;
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        this.buildAsteroids();
    },
    
    buildAsteroids: function() {
     this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
var asteriod   = this.asteroids.create(this.world.width, this.rnd.realInRange(0, 400), 'meteor1');           
        //physics properties
        asteriod.body.velocity.x = -80;
        asteriod.body.velocity.y = this.rnd.realInRange(-10, 10);
       // asteriod.body.immovable = true;
        asteriod.checkWorldBounds = true;
asteriod.events.onOutOfBounds.add(this.resetAsteroid, this);     
        
    },
    
    resetAsteroid: function(asteriod) {
        if(asteriod.x < 0) {
            //TODO : random delay to generate the asteroid need to be added
          this.respawnAsteroid(asteriod);
        }
        
    },
    
    respawnAsteroid: function(asteriod) { 
        asteriod.reset(this.world.width, this.rnd.realInRange(0, 400));
         asteriod.body.velocity.x = -80;
        asteriod.body.velocity.y = this.rnd.realInRange(-10, 10);
    },
    
    update: function () {

        background.tilePosition.x -= 1;  

        // mouse cursor movement 
        //  If the ship is > 8px away from the pointer then let's move to it.        
        /*if (this.physics.arcade.distanceToPointer(ship, this.input.activePointer) > 8) {
            //  Make the object seek to the active pointer (mouse or touch).
            this.physics.arcade.moveToPointer(ship, 300);
        } else {
            //  Otherwise turn off velocity because we're close enough to the pointer
            ship.body.velocity.set(0);
        }*/
        
        // keyboard arrow keys movement 
        // Reset the player, then check for movement keys
        ship.body.velocity.setTo(0, 0);

        if (arrowKeys.left.isDown) {
            ship.body.velocity.x = -200;
        } else if (arrowKeys.right.isDown) {
            ship.body.velocity.x = 200;
        } 
        
        // removed following conditions from else block to enable lateral movement.
        if (arrowKeys.down.isDown) {
            ship.body.velocity.y = 200;
        } else if (arrowKeys.up.isDown) {
            ship.body.velocity.y = -200;
        }
        
        // Capture spacebar event and fire bullets.
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.weapons[this.currentWeapon].fire(ship);
        }
    }

};
    
    // TODO : Following code needs to be moved to a new class
    var Bullet = function (game, key) {

        Phaser.Sprite.call(this, game, 0, 0, key);

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.anchor.set(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;
        this.tracking = false;
        this.scaleSpeed = 0;

    };

    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;
    Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

        gx = gx || 0;
        gy = gy || 0;

        this.reset(x, y);
        this.scale.set(1);
        this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
        this.angle = angle;
        this.body.gravity.set(gx, gy);
    };
    Bullet.prototype.update = function () {

    };

    var Weapon = {};
    Weapon.SingleBullet = function (game) {
        
        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 150;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bullet1'), true);
        }
        return this;
    };

    Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
    Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;
    Weapon.SingleBullet.prototype.fire = function (source) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x + source.width/2; 
        var y = source.y + source.height/2;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        // add a delay before next fire.
        this.nextFire = this.game.time.time + this.fireRate;

    };