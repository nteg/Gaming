var CutTheRope = {};

CutTheRope.Preloader = function(game) {
   
    this.ready = false;
};

CutTheRope.Preloader.prototype = {
	
	preload: function () {

        var me= this,
            gameObj = me.game;

        gameObj.load.image('preloadBar','images/loader_bar.png');

        gameObj.load.image('bead', 'images/origional/obj_pollen_hd.png');
        gameObj.load.image('duck', 'images/phaser/darkwing_crazy.png');
        gameObj.load.image('orb', 'images/phaser/orb-blue.png');

        gameObj.load.spritesheet('omnom', 'images/spritesheets/omnom-eat.png', 160, 160, 6);
        gameObj.load.spritesheet('ant', 'images/spritesheets/ant.png', 47, 23);
        gameObj.load.spritesheet('bubble','images/bubble.png',34,34);
        gameObj.load.spritesheet('apples','images/spritesheets/apples.png',82,82);

        gameObj.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');

	},

	create: function () {
        console.log(this);
        var me= this,
            gameObj= me.game;

        gameObj.input.maxPointers = 1;
        gameObj.stage.disableVisibilityChange = false;
        gameObj.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        gameObj.scale.pageAlignHorizontally = true;
        gameObj.scale.pageAlignVertically = true;
        gameObj.stage.forcePortrait = true;
        gameObj.scale.setScreenSize(true);

        gameObj.input.addPointer();
        gameObj.stage.backgroundColor = '#000';

        gameObj.physics.startSystem(Phaser.Physics.P2JS);
        gameObj.physics.p2.gravity.y = 200;
        gameObj.physics.p2.setImpactEvents(true);

	},

	update: function () {
	   	this.ready = true;
        this.game.state.start('Level1');
	}
};