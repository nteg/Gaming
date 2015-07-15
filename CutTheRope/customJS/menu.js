CutTheRope.Menu = function() {
    var me =this;

    me.titleText = null;
    me.ready = false;
    me.stage = [];
    me.stage1= null;
    me.stage2= null;
    me.stage3= null;
     me.developer1= null;
    me.developer2= null;
    me.developer3= null;
};



CutTheRope.Menu.prototype = {

    preload: function () {

        var me = this,
            gameObj = me.game;

       // me.background = gameObj.add.image(0,0, 'stepBackground');
       // me.background.scale.setTo(2,2);
        me.titleText = gameObj.add.bitmapText(200, 70, 'eightbitwonder', 'Cut The Rope', 100);
        me.stage[0] = gameObj.add.bitmapText(300, 400, 'eightbitwonder', 'Level1', 50);
        me.stage[1] = gameObj.add.bitmapText(300, 600, 'eightbitwonder', 'Level2', 50);
         me.developer = gameObj.add.bitmapText(30, 800, 'eightbitwonder', 'Developed By       Rakesh Kumar Kejriwal', 20);
        me.developer = gameObj.add.bitmapText(330, 830, 'eightbitwonder', 'Nitin Jalwal', 20);
        me.developer = gameObj.add.bitmapText(330, 860, 'eightbitwonder', 'Amit Sapra ', 20);
      //  me.stage[2] = gameObj.add.bitmapText(400, 300, 'eightbitwonder', 'Level3', 50);
       // me.stage[3] = gameObj.add.bitmapText(400, 700, 'eightbitwonder', 'test', 50);
    },

    create: function () {
        var me = this,
            gameObj = me.game;

        gameObj.physics.startSystem(Phaser.Physics.P2JS);

        me.base = buildSlide(this,1200,750, 'base');
        me.base.scale.setTo(.5,1);
        me.omnom = buildOmnom(this,1200,600,'omnom');
        me.omnom.frame = 0;

        //this.apple = buildFruit(this,1200,this.world.centerY-220, 'apples');
        me.apple = buildFruit(this,1200,this.world.centerY-220, 'apples');

        me.appleCG = gameObj.physics.p2.createCollisionGroup();
        me.omnomCG = gameObj.physics.p2.createCollisionGroup();
        me.baseCG  = gameObj.physics.p2.createCollisionGroup();
        gameObj.physics.p2.updateBoundsCollisionGroup();

        me.omnom.body.setCollisionGroup(me.omnomCG);
        me.base.body.setCollisionGroup(me.baseCG);
        me.apple.body.setCollisionGroup(me.appleCG);


        me.stage[0].inputEnabled = true;
        me.stage[1].inputEnabled = true;
       // me.stage[2].inputEnabled = true;
       // me.stage[3].inputEnabled = true;

        me.stage[0].events.onInputDown.addOnce(function(){
            gameObj.state.start('Level1');
        },this);

        me.stage[1].events.onInputDown.addOnce(function(){
            gameObj.state.start('Level2');
        },this);

       /** me.stage[2].events.onInputDown.addOnce(function(){
            gameObj.state.start('Level3');
        },this);  

        me.stage[3].events.onInputDown.addOnce(function(){
            gameObj.state.start('Test');
        },this); */
    },


    update: function () {
        var me =this;

        me.ready = true;
        me.omnom.body.collides(me.appleCG);
        me.apple.body.collides(me.omnomCG, function(){
            omnomFruitCollision(me.game, me.apple, me.omnom);
        },this);
        me.omnom.body.collides(me.baseCG);
        me.base.body.collides(me.omnomCG);

    }
};

