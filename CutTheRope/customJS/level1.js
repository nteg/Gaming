CutTheRope.level1 = function(game) {
    this.titleText = null;
     this.scoreText = null;
    this.ready = false;
    this.omnom;
    this.apple;
    this.appleCG;
    this.omnomCG;  
    this.baseCG;
    this.background;
    this.base;  
    this.goToMainMenu;
    
   this.coin = [];
    this.score = 0;
    
     this.peg;
    this.rope;
};



CutTheRope.level1.prototype = {
	
	preload: function () {
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
         this.score = 0;
    },

	create: function () {
        this.physics.startSystem(Phaser.Physics.P2JS);
       
        this.background = this.add.image(0,0, 'greenBackground');
        this.background.scale.setTo(4,3);
        
       
        this.base = buildSlide(this,600,800, 'base');
        this.omnom = buildOmnom(this,600,600,'omnom');
        this.omnom.frame = 0;
        
        this.apple = buildFruit(this,800,150, 'apples');
        this.appleCG = this.physics.p2.createCollisionGroup();
        this.omnomCG = this.physics.p2.createCollisionGroup();
        this.baseCG = this.physics.p2.createCollisionGroup();
        this.physics.p2.updateBoundsCollisionGroup();
        this.apple.body.setCollisionGroup(this.appleCG);
       
        this.omnom.body.setCollisionGroup(this.omnomCG);
        this.base.body.setCollisionGroup(this.baseCG);
        this.omnom.body.collides(this.appleCG);
        this.apple.body.collides(this.omnomCG, function(){omnomFruitCollision(this,this.apple,this.omnom);},this);
       
        this.omnom.body.collides(this.baseCG);
        this.base.body.collides(this.omnomCG);
        
        this.peg = buildPeg(this,800, 100,'orb');
        
        this.rope = buildRope(this,this.peg,this.apple,20);
        
        /**setCollisions (this,this.apple,this.base);
        setCollisions (this,this.omnom,this.base);
        setCollisions (this,this.omnom,this.apple,function(){omnomFruitCollision(this.apple,this.omnom);});
        */
         this.goToMainMenu = this.add.bitmapText(1200, 100, 'eightbitwonder', 'Exit', 50);
         this.goToMainMenu.inputEnabled = true;
   
        this.goToMainMenu.events.onInputDown.addOnce(function(){
           this.state.start('menu');
        },this);
        
        this.coin[0] = buildCoin(this,1000,300,'coin');
         this.coin[1] = buildCoin(this,700,500,'coin');
         this.coin[2] = buildCoin(this,600,670,'coin');
 this.coinCG = this.physics.p2.createCollisionGroup();
 this.coin[0].body.setCollisionGroup(this.coinCG);
         this.coin[1].body.setCollisionGroup(this.coinCG);
         this.coin[2].body.setCollisionGroup(this.coinCG);
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
     },
    
    

   update: function () {
           this.scoreText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Your Score:- '+this.score, 20);
	   	this.ready = true;
        breakRope(this);
       
   	}
};

