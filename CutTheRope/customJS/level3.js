CutTheRope.level3 = function(game) {
    this.titleText = null;
    this.scoreText = null;
    this.ready = false;
    this.omnom;
    this.apple;
    this.appleCG;
    this.omnomCG;  
    this.slideCG;
    this.coinCG;
    this.background;
   
    this.slide =[];
     
    this.bubble;
 this.bubbleCG;
    this.goToMainMenu;
    this.peg;
    this.rope;
    this.bubbleRevoluteConstraint;
    this.coin = [];
    this.score = 0;
  this.blower;
};



CutTheRope.level3.prototype = {
	
	preload: function () {
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
        this.score = 0;
    },

	create: function () {
         
        
        this.physics.startSystem(Phaser.Physics.P2JS);

        this.background = this.add.image(0,0, 'greenBackground');
        this.background.scale.setTo(4,3);
        
        this.blower = buildBlower(this,300,700,'blower');
       // this.blower.scale.setTo(.5,.5);
        
        this.slide[0] = buildSlide(this,800,200, 'base');
        this.slide[0].body.rotation=-3.14/6;
        this.slide[0].scale.setTo(1,1);
        this.slide[1] = buildSlide(this,1100,300, 'base');
        this.slide[1].body.rotation=-3.14/6;
        this.slide[1].scale.setTo(1,1);
        this.slide[2] = buildSlide(this,1250,100, 'base');
        this.slide[2].body.rotation=-3.14/2;
        this.slide[3] = buildSlide(this,800,800, 'base');
        
         this.coin[0] = buildCoin(this,1000,300,'coin');
         this.coin[1] = buildCoin(this,1100,250,'coin');
         this.coin[2] = buildCoin(this,1200,100,'coin');
        
        
        this.omnom = buildOmnom(this,800,600,'omnom');
        this.omnom.frame = 0;
        this.apple = buildFruit(this,800,100, 'apples');
       
        this.appleCG = this.physics.p2.createCollisionGroup();
        this.omnomCG = this.physics.p2.createCollisionGroup();
        this.slideCG = this.physics.p2.createCollisionGroup();
       this.coinCG = this.physics.p2.createCollisionGroup();
        
        this.physics.p2.updateBoundsCollisionGroup();
       
        this.coin[0].body.setCollisionGroup(this.coinCG);
         this.coin[1].body.setCollisionGroup(this.coinCG);
         this.coin[2].body.setCollisionGroup(this.coinCG);
        this.apple.body.setCollisionGroup(this.appleCG);
        this.omnom.body.setCollisionGroup(this.omnomCG);
        this.slide[3].body.setCollisionGroup(this.slideCG);
       
        this.omnom.body.collides(this.appleCG);
        this.apple.body.collides(this.omnomCG, function(){omnomFruitCollision(this,this.apple,this.omnom);},this);
        this.omnom.body.collides(this.slideCG);
        this.slide[3].body.collides(this.omnomCG);
        
        this.peg = buildPeg(this,400, 100,'orb');
        
        this.rope = buildRope(this,this.peg,this.apple,20);
             
        this.bubble =  buildBubble(this,this.world.centerX,this.world.centerY, 'bubble');
        this.bubbleCG = this.physics.p2.createCollisionGroup();
        this.bubble.body.setCollisionGroup(this.bubbleCG);
        this.bubble.body.collides(this.appleCG);
        this.apple.body.collides(this.bubbleCG, function(){
            this.bubbleRevoluteConstraint = bubbleCollisionWithAnObject(this,this.apple,this.bubble,this);},this);
         this.apple.body.collides(this.coinCG);
        this.coin[0].body.collides(this.appleCG, function(){
            this.score++;
            this.coin[0].kill();},this);
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
         
	   	this.ready = true;
        this.scoreText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Your Score:- '+this.score, 20);
       breakRope(this);
        
       
      breakBubble(this,this.bubbleRevoluteConstraint);
       
       this.blower.events.onInputDown.addOnce(function(){
          this.blower.animations.play('blow');
    },this);
     
   	}
};

