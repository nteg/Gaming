CutTheRope.Level2 = function(game) {
    var me= this,
        pi = 3.14;

    me.titleText = null;
    me.scoreText = null;
    me.ready = false;
    me.slide =[];
    me.coin = [];
    me.score = 0;
    me.COIN_POS = [
        {x : 1000, y :300 },
        {x : 1100, y :250 },
        {x : 1200, y :100 }
    ];

    me.SLIDE_POS = [
        { x : 800, y :200, rotation : -pi/6  },
        { x : 1100, y :300, rotation : -pi/6  },
        { x : 1250, y :100, rotation : -pi/2  },
        { x : 800, y :850, rotation : 0  }
    ];
};



CutTheRope.Level2.prototype = {

    preload: function () {
        this.titleText = this.game.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
        this.score = 0;
    },

    create: function () {
        var me= this,
            gameObj = me.game;

        gameObj.physics.startSystem(Phaser.Physics.P2JS);
        me.IS_MOUSE_HELD = false;
        me.background = gameObj.add.image(0,0, 'greenBackground');
        me.background.scale.setTo(4,3);


        me.omnom = buildOmnom(gameObj,800,600,'omnom');
        me.omnom.frame = 0;
        setTimeout(function(){
            me.omnom.body.static = true;
        },3000);

        me.apple = buildFruit(gameObj,800,100, 'apples');

        me.appleCG = gameObj.physics.p2.createCollisionGroup();
        me.omnomCG = gameObj.physics.p2.createCollisionGroup();
        me.slideCG = gameObj.physics.p2.createCollisionGroup();
        me.coinCG  = gameObj.physics.p2.createCollisionGroup();

        me.coin = buildCoins(gameObj, me.COIN_POS, me.coinCG, me.appleCG, function(){me.score++});

        me.slide=[];
        for(var i=0; i< me.SLIDE_POS.length; i++) {
            var tempSlide = buildSlide( gameObj, me.SLIDE_POS[i].x, me.SLIDE_POS[i].y, 'base');
            tempSlide.body.rotation=  me.SLIDE_POS[i].rotation;
            tempSlide.body.setCollisionGroup(me.slideCG);
            tempSlide.body.collides([me.omnomCG, me.appleCG]);
            me.slide.push(tempSlide);
        }

        gameObj.physics.p2.updateBoundsCollisionGroup();

        me.apple.body.setCollisionGroup(this.appleCG);
        me.omnom.body.setCollisionGroup(this.omnomCG);

        me.omnom.body.collides(me.appleCG);
        me.apple.body.collides(me.slideCG);
        me.apple.body.collides(me.omnomCG, function(apple, omnom){
            omnomFruitCollision(this,apple.sprite,omnom.sprite);
            me.bubble.kill();
            if(me.bubbleLockConstraint) gameObj.physics.p2.removeConstraint(me.bubbleLockConstraint);
        },this);
        me.omnom.body.collides(me.slideCG);

        me.peg = buildPeg(gameObj,400, 100,'orb');
        me.rope = buildRope(gameObj,me.peg,me.apple,20);
        gameObj.input.onDown.add(function(){me.IS_MOUSE_HELD =true;}, this);
        gameObj.input.onUp.add(function(){me.IS_MOUSE_HELD =false;}, this);

        me.bubble =  buildBubble(this,700,500, 'bubble');
        me.bubbleCG = gameObj.physics.p2.createCollisionGroup();
        me.bubble.body.setCollisionGroup(me.bubbleCG);
        me.bubble.body.collides([me.appleCG, me.slideCG]);

        me.apple.body.collides(me.bubbleCG, function(){
            me.bubbleLockConstraint = bubbleCollisionWithAnObject(gameObj,me.apple,me.bubble);
        },this);

        me.apple.body.collides(me.coinCG);
        me.omnom.bringToTop();
        me.apple.bringToTop();

        me.goToMainMenu = gameObj.add.bitmapText(1200, 100, 'eightbitwonder', 'Exit', 50);
        me.goToMainMenu.inputEnabled = true;

        me.goToMainMenu.events.onInputDown.addOnce(function(){
            gameObj.state.start('Menu');
        },this);

        breakBubble(me,me.bubbleLockConstraint);
    },


    update: function () {
        var me= this;

        me.ready = true;
        me.scoreText = me.add.bitmapText(70, 70, 'eightbitwonder', 'Your Score:- '+me.score, 20);
        breakRope(me);
    }
};

