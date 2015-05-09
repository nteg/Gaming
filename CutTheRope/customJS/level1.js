CutTheRope.Level1 = function() {
    var me= this;

    me.titleText = null;
    me.scoreText = null;
    me.ready = false;
    me.coin =[];
    me.COIN_POS = [
        {x : 1000, y :300 },
        {x : 700, y :500 },
        {x : 600, y :670 }
    ];
    me.score = 0;
};



CutTheRope.Level1.prototype = {

    preload: function () {
        var me= this;

        me.titleText = me.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
        me.score = 0;
    },

    create: function () {
        var me= this,
            gameObj =  me.game;

        gameObj.physics.startSystem(Phaser.Physics.P2JS);

        me.background = this.add.image(0,0, 'greenBackground');
        me.background.scale.setTo(4,3);


        me.base = buildSlide(this,600,800, 'base');
        me.omnom = buildOmnom(this,600,600,'omnom');
        me.omnom.frame = 0;

        me.apple = buildFruit(this,800,150, 'apples');
        me.appleCG = gameObj.physics.p2.createCollisionGroup();
        me.omnomCG = gameObj.physics.p2.createCollisionGroup();
        me.baseCG = gameObj.physics.p2.createCollisionGroup();
        gameObj.physics.p2.updateBoundsCollisionGroup();
        me.apple.body.setCollisionGroup(me.appleCG);

        me.omnom.body.setCollisionGroup(me.omnomCG);
        me.base.body.setCollisionGroup(me.baseCG);
        me.omnom.body.collides(me.appleCG);
        me.apple.body.collides(me.omnomCG, function(apple, omnom){
            omnomFruitCollision(gameObj,apple.sprite,omnom.sprite);
        },this);

        me.omnom.body.collides(me.baseCG);
        me.base.body.collides(me.omnomCG);

        me.peg = buildPeg(this,800, 100,'orb');

        me.rope = buildRope(gameObj,me.peg,me.apple,20);
        gameObj.input.onDown.add(function(){
            me.IS_MOUSE_HELD =true;
            console.log(me.IS_MOUSE_HELD);
        }, this);
        gameObj.input.onUp.add(function(){
            me.IS_MOUSE_HELD =false;
            console.log(me.IS_MOUSE_HELD);
        }, this);

        /**setCollisions (this,this.apple,this.base);
         setCollisions (this,this.omnom,this.base);
         setCollisions (this,this.omnom,this.apple,function(){omnomFruitCollision(this.apple,this.omnom);});
         */
        me.goToMainMenu = gameObj.add.bitmapText(1200, 100, 'eightbitwonder', 'Exit', 50);
        me.goToMainMenu.inputEnabled = true;

        me.goToMainMenu.events.onInputDown.addOnce(function(){
            gameObj.state.start('Menu');
        },this);

        me.coinCG = this.physics.p2.createCollisionGroup();
        me.apple.body.collides(me.coinCG);
        me.coin = buildCoins(gameObj, me.COIN_POS, me.coinCG, me.appleCG, function(){me.score++});
    },



    update: function () {
        //this.scoreText = this.game.add.bitmapText(70, 70, 'eightbitwonder', 'Your Score:- '+this.score, 20);
        this.ready = true;
        breakRope(this);

    }
};

