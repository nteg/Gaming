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
        { x : 800, y :800, rotation : 0  }
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

        me.background = gameObj.add.image(0,0, 'greenBackground');
        me.background.scale.setTo(4,3);


        for(var i=0; i< me.SLIDE_POS.length; i++) {
            var tempSlide = buildSlide( gameObj, me.SLIDE_POS[i].x, me.SLIDE_POS[i].y, 'base');
            tempSlide.body.rotation=  me.SLIDE_POS[i].rotation;
            me.slide.push(tempSlide);
        }
        //me.slide[0].scale.setTo(1,1);


        me.omnom = buildOmnom(gameObj,800,600,'omnom');
        me.omnom.frame = 0;
        me.apple = buildFruit(gameObj,800,100, 'apples');

        me.appleCG = gameObj.physics.p2.createCollisionGroup();
        me.omnomCG = gameObj.physics.p2.createCollisionGroup();
        me.slideCG = gameObj.physics.p2.createCollisionGroup();
        me.coinCG  = gameObj.physics.p2.createCollisionGroup();

        for(i=0; i< me.COIN_POS.length; i++){
            var tempCoin = buildCoin(gameObj, me.COIN_POS[i].x, me.COIN_POS[i].y,'coin');
            tempCoin.body.setCollisionGroup(me.coinCG);
            me.coin.push(tempCoin);
        }

        gameObj.physics.p2.updateBoundsCollisionGroup();

        me.apple.body.setCollisionGroup(this.appleCG);
        me.omnom.body.setCollisionGroup(this.omnomCG);
        me.slide[3].body.setCollisionGroup(this.slideCG);

        me.omnom.body.collides(this.appleCG);
        me.apple.body.collides(this.omnomCG, function(){omnomFruitCollision(this,this.apple,this.omnom);},this);
        me.omnom.body.collides(this.slideCG);
        me.slide[3].body.collides(this.omnomCG);

        me.peg = buildPeg(gameObj,400, 100,'orb');

        me.rope = buildRope(gameObj,me.peg,me.apple,20);

        me.bubble =  buildBubble(this,gameObj.world.centerX,gameObj.world.centerY, 'bubble');
        me.bubbleCG = this.physics.p2.createCollisionGroup();
        me.bubble.body.setCollisionGroup(this.bubbleCG);
        me.bubble.body.collides(this.appleCG);

        me.apple.body.collides(this.bubbleCG, function(){
            this.bubbleRevoluteConstraint = bubbleCollisionWithAnObject(this,this.apple,this.bubble,this);
        },this);

        this.apple.body.collides(this.coinCG);

        this.coin[0].body.collides(this.appleCG, function(){
            this.score++;
            this.coin[0].kill();
        },this);

        this.coin[1].body.collides(this.appleCG, function(){
            this.score++;
            this.coin[1].kill();},this);
        this.coin[2].body.collides(this.appleCG, function(){
            this.score++;
            this.coin[2].kill();},this);

        this.goToMainMenu = this.add.bitmapText(1200, 100, 'eightbitwonder', 'Exit', 50);
        this.goToMainMenu.inputEnabled = true;

        this.goToMainMenu.events.onInputDown.addOnce(function(){
            this.state.start('Menu');
        },this);
    },


    update: function () {
        var me= this;

        me.ready = true;
        me.scoreText = me.add.bitmapText(70, 70, 'eightbitwonder', 'Your Score:- '+me.score, 20);
        breakRope(me);


        breakBubble(this,this.bubbleRevoluteConstraint);

    }
};

