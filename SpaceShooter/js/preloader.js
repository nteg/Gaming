
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

