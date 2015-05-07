
SpaceShooter.Preloader = function(game) {
    this.ready = false;
};

SpaceShooter.Preloader.prototype = {
    
    preload: function () {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
        this.load.image('background', 'images/galaxyBackground.png');
        this.load.image('player','images/speedship.png');
        this.load.image('bullet1', 'images/bullet1.png');
        this.load.image('meteor1', 'images/meteorBrown_big1.png');
        this.load.image('pauseButton', 'images/pauseButton.png');
        this.load.image('enemyBlack1', 'images/enemyBlack1.png');
        this.load.spritesheet('explosion', 'images/explosion.png', 128, 128);
        this.load.image('enemyBullet1', 'images/enemyBullet1.png');
        this.load.image('enemyGreen1', 'images/enemyGreen1.png');
        this.load.audio('playerFire', ['sounds/playerFire.mp3','sounds/playerFire.ogg']);
        this.load.audio('enemyFire', ['sounds/enemyFire.mp3','sounds/enemyFire.ogg']);
        this.load.audio('explosionSound', ['sounds/enemyExplosion1.mp3','sounds/enemyExplosion1.ogg']);
        this.load.image('backgroundLevel2', 'images/Untitled1.jpeg');
        
    },
    
    create: function () {
        this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.ready == false) {
            this.ready = true;
            this.state.start('Game');
        }
	}
    
};

