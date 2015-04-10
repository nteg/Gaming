CutTheRope.Preloader = function(game) {
   
    this.ready = false;
};

CutTheRope.Preloader.prototype = {
	
	preload: function () {
		this.load.image('preloadBar','images/loader_bar.png');
        this.load.image('titleimage','images/TitleImage.png');
        this.load.image('strawberry','images/strawberry.png');
        this.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml'); 
        this.load.spritesheet('dude', 'images/spritesheets/dude.png', 63,69);  
	},

	create: function () {
		
	},

	update: function () {
	   	this.ready = true;
        this.state.start('level1');
	}
};