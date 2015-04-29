CutTheRope.Preloader = function(game) {
   
    this.ready = false;
};

CutTheRope.Preloader.prototype = {
	
	preload: function () {
		this.load.image('preloadBar','images/loader_bar.png');
        this.load.image('titleimage','images/TitleImage.png');
         this.load.image('greenBackground','images/greenBackground.jpeg');
        this.load.image('candyBackground','images/candyBackground.png');
         this.load.image('stepBackground','images/stepBackground.png');
         this.load.image('blueBackground','images/blueBackground.jpeg');
         this.load.image('base','images/base.png');
        
                this.load.image('bead', 'images/origional/obj_pollen_hd.png');
        this.load.image('duck', 'images/phaser/darkwing_crazy.png');
        this.load.image('orb', 'images/phaser/orb-blue.png');
      
        this.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml'); 
       // this.load.spritesheet('bunny', 'images/spritesheets/bunny.png', 63,68); 
       this.load.spritesheet('dude', 'images/spritesheets/dude.png', 32, 48);
        this.load.spritesheet('coin', 'images/spritesheets/coinSpriteSheet.png', 40, 44);
       // this.load.spritesheet('omnom', 'images/spritesheets/omnom.png', 135, 135); 
        this.load.spritesheet('omnom', 'images/spritesheets/omnom-eat.png', 157, 162);
        this.load.spritesheet('ant', 'images/spritesheets/ant.png', 47, 23);
         this.load.spritesheet('bubble','images/bubble.png',34,34);
          this.load.spritesheet('apples','images/spritesheets/apples.png',83,82);
        
     
	},

	create: function () {
		
	},

	update: function () {
	   	this.ready = true;
        this.state.start('menu');
	}
};