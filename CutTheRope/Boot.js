var CutTheRope = {};

CutTheRope.Boot = function (game) {};

CutTheRope.Boot.prototype = {
    preload: function() {
        this.load.image('preloadBar','images/loader_bar.png');
        this.load.image('titleimage','images/TitleImage.png');
        this.load.image('strawberry','images/strawberry.png');
        this.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml');
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
    },
    
    create: function() {
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.minWidth = 270;
		//this.scale.minHeight = 480;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);

		this.input.addPointer();
		this.stage.backgroundColor = '#171642';
        
        this.state.start('Preloader');
    }
}