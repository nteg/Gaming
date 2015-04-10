CutTheRope.Preloader = function(game) {
   
    this.ready = false;
};

CutTheRope.Preloader.prototype = {
	
	preload: function () {
		this.load.image('preloadBar','images/loader_bar.png');
        this.load.image('titleimage','images/TitleImage.png');
      
        this.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml'); 
       // this.load.spritesheet('bunny', 'images/spritesheets/bunny.png', 63,68); 
       this.load.spritesheet('dude', 'images/spritesheets/dude.png', 32, 48);
       // this.load.spritesheet('omnom', 'images/spritesheets/omnom.png', 135, 135); 
        this.load.spritesheet('omnom', 'images/spritesheets/omnom-eat.png', 157, 162);
          this.load.image('strawberry','images/strawberry.png');
	},

	create: function () {
		
	},

	update: function () {
	   	this.ready = true;
        this.state.start('level1');
	}
};