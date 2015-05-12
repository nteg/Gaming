var CutTheRope = {};

CutTheRope.Preloader = function() {
    this.ready = false;
};

CutTheRope.Preloader.prototype = {

    preload: function () {

        var me= this,
            gameObj = me.game;

        gameObj.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        gameObj.load.image('preloadBar','images/loader_bar.png');
        gameObj.load.image('titleimage','images/TitleImage.png');
        gameObj.load.image('greenBackground','images/greenBackground.jpeg');
        gameObj.load.image('candyBackground','images/candyBackground.png');
        gameObj.load.image('stepBackground','images/stepBackground.png');
        gameObj.load.image('blueBackground','images/blueBackground.jpeg');
        gameObj.load.image('base','images/base.png');

        gameObj.load.image('bead', 'images/origional/obj_pollen_hd.png');
        gameObj.load.image('duck', 'images/phaser/darkwing_crazy.png');
        gameObj.load.image('orb', 'images/phaser/orb-blue.png');

        gameObj.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml');
        gameObj.load.spritesheet('dude', 'images/spritesheets/dude.png', 32, 48);
        gameObj.load.spritesheet('coin', 'images/spritesheets/coinSpriteSheet.png', 40, 44);
      //  gameObj.load.spritesheet('omnom', 'images/spritesheets/omnom-eat.png', 157, 162);
        gameObj.load.spritesheet('omnom', 'images/spritesheets/cuteBitingMonster.png',304,270);
 
        gameObj.load.spritesheet('ant', 'images/spritesheets/ant.png', 47, 23);
        gameObj.load.spritesheet('bubble','images/bubble.png',34,34);
        gameObj.load.spritesheet('apples','images/spritesheets/apples.png',83,82);

        gameObj.load.spritesheet('blower','images/spritesheets/ballonSprite.png',425,290);
          gameObj.load.spritesheet('worm','images/spritesheets/cuteBitingMonster.png',304,270);
       //  gameObj.load.spritesheet('worm1','images/spritesheets/worm.png',65,70);


    },

    create: function () {

        var me= this,
            gameObj = me.game;

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
        gameObj.physics.p2.gravity.y = 300;
        gameObj.physics.p2.setImpactEvents(true);
        gameObj.physics.p2.restitution = 0.2;
        gameObj.physics.p2.friction=1;

        //this.scale.minWidth = 270;
        //this.scale.minHeight = 480;
    },

    update: function () {
        this.ready = true;
        this.game.state.start('Menu');
    }

};