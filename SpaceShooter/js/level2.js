SpaceShooter.Level2 = function(game) {
  this.initializeGame();
}

SpaceShooter.Level2.prototype = {
    
    initializeGame : function (){
    this.far;
    this.ship;
    this.cursors;

    this.weapons = [];
    this.currentEnemyWeapon = 1;
    this.currentWeapon = 0;
    this.asteroids;
    this.enemySpeed = 200;
    this.level = 2;
    this.maxLevels = 3;
    this.enemies;
    this.explosions;
    this.score = 0;
    this.lives = 3;
    this.lastTime = Date.now();
    this.gameTime = 0;
    },

    create: function () {

        //  To make the sprite move we need to enable Arcade Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        background = this.add.tileSprite(0, 0, 700, 700, 'background');
        ship = this.add.sprite(10,200,'player'); 
        
        this.physics.enable(ship,Phaser.Physics.ARCADE);
        arrowKeys = this.input.keyboard.createCursorKeys();
        
        // Add Play/Pause controls
        this.pauseButton = this.add.button(60, 8, 'pauseButton', this.managePause, this);
        this.pauseButton.anchor.set(1,0);
        this.pauseButton.input.useHandCursor = true;

        this.levelText = this.game.add.text(120, 10, "Level: "+this.level+" / "+this.maxLevels, { font: '30px Arial', fill: '#ffffff' });
        this.scoreText = this.game.add.text(300, 10, "Score: "+this.score, { font: '30px Arial', fill: '#ffffff' });
        
        // Add game audio files.
        this.playerFire = this.game.add.audio('playerFire');
        this.enemyFire = this.game.add.audio('playerFire');
        this.explosionSound = this.game.add.audio('explosionSound');
        
        // restrict ship movement to canvas bounds.
        ship.body.collideWorldBounds = true;

        // Add new weapon types to weapons array.
        this.weapons.push(new Weapon.ScatterShot(this.game, 600,175,'bullet1'));
        this.weapons.push(new Weapon.SingleBullet(this.game, -500,1000,'enemyBullet1'));
        this.currentWeapon = 0;
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        
        this.buildAsteroids();
        // Send aesteroids after a set time interval.
        this.aesteroidsDelayTimer = this.game.time.create(false);
		this.aesteroidsDelayTimer.loop(4000, this.launchAsteroid, this);
		this.aesteroidsDelayTimer.start();
      
        this.createEnemy();
        //  Send enemy after a set time interval.
        this.enemyDelayTimer = this.game.time.create(false);
		this.enemyDelayTimer.loop(2000, this.launchEnemy, this);
		this.enemyDelayTimer.start();
        this.createExplosions();
        
        // Add Player Lives.
        this.lives = this.game.add.group();
        
        for (var i = 0; i < 3; i++) {
         
            var playerLife = this.lives.create(this.game.world.width - 150 + (50 * i), 30, 'player');
            playerLife.anchor.setTo(0.7, 0.5);
            playerLife.angle = 0;
            playerLife.alpha = 1.0;
        }
     
    },
    
    update: function () {

        background.tilePosition.x -= 1;  

        // mouse cursor movement 
        // Reset the player, then check for movement keys
        ship.body.velocity.setTo(0, 0);

        // keyboard arrow keys movement 
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
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {            
            this.weapons[this.currentWeapon].fire(ship);
            this.playerFire.play();
        }

        this.physics.arcade.overlap(this.enemies, this.weapons[this.currentWeapon], this.hitEnemy, null, this);
        this.physics.arcade.overlap(this.asteroids, this.weapons[this.currentWeapon], this.hitEnemy, null, this);
        this.physics.arcade.overlap(this.enemies, ship, this.mayDay, null, this);
        this.physics.arcade.overlap(this.asteroids, ship, this.mayDay, null, this);
        this.physics.arcade.overlap(this.weapons[this.currentEnemyWeapon], ship, this.mayDay, null, this);
        
        
        // Increase the enemy force as time passes by.
        this.now = Date.now();
        this.delay = (this.now - this.lastTime) / 1000000.0;
        this.gameTime += this.delay;
        if(Math.random() < 1 - Math.pow(.999, this.gameTime)) {
            this.launchEnemy();
        }
    },
    
    buildAsteroids: function() {
         this.asteroids = this.game.add.group();

        //enable physics in them
        this.asteroids.enableBody = true;
        this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        //phaser's random number generator
        var asteroid   = this.asteroids.create(this.world.width, this.rnd.realInRange(60, 400), 'meteor1');           
        //asteroid.body.immovable = true;
        //physics properties
        asteroid.body.velocity.x = -100;
        asteroid.body.angularVelocity = 100;
        asteroid.body.velocity.y = this.rnd.realInRange(-20, 20);
        asteroid.anchor.setTo(0.5, 0.5);
        asteroid.checkWorldBounds = true;
        asteroid.events.onOutOfBounds.add(this.killAsteroid, this);
        this.launchAsteroid();
    },
    
    killAsteroid : function (asteroid) {
    asteroid.kill();    
    },
    
    launchAsteroid : function () {
     var asteroid = this.asteroids.getFirstExists(false);
     if (asteroid) {
        asteroid.reset(this.world.width, this.rnd.realInRange(60, 400));
        //physics properties
        asteroid.body.velocity.x = -100;
        asteroid.body.velocity.y = this.rnd.realInRange(-20, 20);
        asteroid.body.angularVelocity = 100;
     }
    },
    
    createEnemy : function () {
    
            this.enemies = this.game.add.group();
            this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemies.enableBody = true;

            this.enemies.createMultiple(100, 'enemyGreen1');
            this.enemies.setAll('anchor.x', 0.5);
            this.enemies.setAll('anchor.y', 0.5);
            this.enemies.setAll('body.velocity.x', -80);
            this.enemies.setAll('outOfBoundsKill', true);
            this.enemies.setAll('checkWorldBounds', true);
    },
    
    launchEnemy: function() {
        var MIN_ENEMY_SPACING = 200;
        var MAX_ENEMY_SPACING = 650;

        var enemy = this.enemies.getFirstExists(false);
        if (enemy) {
            enemy.reset(700, this.rnd.integerInRange(100,400));
            enemy.body.velocity.x = -this.enemySpeed;
            enemy.body.drag.x = -10;
            var enemyWeapon = this.weapons[this.currentEnemyWeapon];
            
            enemy.update = function(){
                
                // Set enemy ship angle to face the direction of the player ship.
                var angle = this.game.physics.arcade.moveToObject(enemy, ship, this.enemySpeed);
                enemy.angle = this.game.math.radToDeg(angle);
                enemyWeapon.fire(enemy);
            }
        }
    },
    
    managePause: function() {
            this.game.paused = true;
            var pausedText = this.add.text(300, 250, "Game paused!\nTap anywhere to continue.", { font: '26px Arial', fill: '#ffffff' });
            pausedText.anchor.set(0.5);
            this.input.onDown.add(function(){
            pausedText.destroy();
            this.game.paused = false;
            }, this);
    },
    
    createExplosions : function() {
       // Add explosions.
        this.explosions = this.game.add.group();
        this.explosions.enableBody = true;
        this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
        this.explosions.createMultiple(100, 'explosion');
        this.explosions.setAll('anchor.x', 0.5);
        this.explosions.setAll('anchor.y', 0.5);
        this.explosions.forEach( function(explosion) {
        explosion.animations.add('explosion');
        });
    },
    
    hitEnemy: function(enemy, bullet) {
        
        this.explosionSound.play();
        
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
        this.score += 100;
        this.scoreText.setText("Score: "+this.score);
        enemy.kill();
        bullet.kill();
    },
    
    mayDay: function(player, enemy) {
        
        this.explosionSound.play();
        
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
        enemy.kill();
        
        live = this.lives.getFirstAlive();

        if (live) {
            live.kill();
        }
        
        if (this.lives.countLiving() < 1) {
            
            player.kill();
            this.game.paused = true;
                var gameOverText = this.add.text(300, 250, "Game Over!\nTap anywhere to restart.", { font: '26px Arial', fill: '#ffffff' });
                gameOverText.anchor.set(0.5);
                this.input.onDown.add(function(){
                gameOverText.destroy();
                    this.enemies = [];
                    this.game.paused = false;
                    this.restartGame();
                }, this);
        }
    },
    
      // Restart the game
    restartGame: function () {
        
        //resets the life count
        this.lives.callAll('revive');
        
        this.game.state.start('Level2');
        this.initializeGame();
    },

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

// Single enemy bullets
 Weapon.SingleBullet = function (game, bulletSpeed,fireRate, bulletName) {
        
        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

        this.nextFire = 0;
        this.bulletSpeed = bulletSpeed;
        this.fireRate = fireRate;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, bulletName), true);
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

// Scattered player bullets.
    Weapon.ScatterShot = function (game, bulletSpeed,fireRate, bulletName) {

        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

        this.nextFire = 0;
        this.bulletSpeed = bulletSpeed;
        this.fireRate = fireRate;

         for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, bulletName), true);
        }
        return this;

    };

    Weapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
    Weapon.ScatterShot.prototype.constructor = Weapon.ScatterShot;

    Weapon.ScatterShot.prototype.fire = function (source) {

//        this.playerFire.play();
        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x + source.width/2; 
        var y = source.y + source.height/2;
//        var y = (source.y + source.height / 2) + this.game.rnd.realInRange(-20, 20);

        this.getFirstExists(false).fire(x, y-20, 0, this.bulletSpeed, 0, -500);
        this.getFirstExists(false).fire(x, y+20, 0, this.bulletSpeed, 0, 500);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;

    };