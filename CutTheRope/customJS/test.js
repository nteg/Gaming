CutTheRope.test = function(game) {
   // this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
    this.totalBunnies =1;
   
    this.monster;
    this.monster1;
    this.monster2;
    this.dude;
    this.omnom;
     this.strawberry = null;
     this.bubble;
    this.apple;
    this.apple1;
    this.ant;
    this.appleCG;
     this.omnomCG;
    this.bubbleCG;
    this.antCG;
    this.baseCG;
    this.apple1CG;
    this.background;
    this.base;
    this.goToMainMenu;
    
};



CutTheRope.test.prototype = {
	
	preload: function () {
		 
       
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
         
	},

	create: function () {
		
         this.physics.startSystem(Phaser.Physics.P2JS);
          this.physics.p2.gravity.y = 200;
        this.physics.p2.setImpactEvents(true);
            this.physics.p2.restitution = 0.2;
        
       this.background = this.add.image(0,0, 'greenBackground');
        this.background.scale.setTo(4,3);
        
        
         this.base = buildBase(this,800,800, 'base');
        
        
        
        this.omnom = buildOmnom(this,750,600,'omnom');
        this.omnom.frame = 0;
        
        this.ant = buildAnt(this,400,800,'ant');
        this.ant.animations.play('walk');
    
         this.apple = buildFruit(this,this.world.centerX,this.world.centerY-220, 'apples');
         this.apple1 = buildFruit(this,500,200, 'apples');
        
        this.bubble =  buildBubble(this,this.world.centerX,this.world.centerY, 'bubble');
       
        
           this.appleCG = this.physics.p2.createCollisionGroup();
        this.omnomCG = this.physics.p2.createCollisionGroup();
        this.bubbleCG = this.physics.p2.createCollisionGroup();
         this.antCG = this.physics.p2.createCollisionGroup();
         this.apple1CG = this.physics.p2.createCollisionGroup();
          this.baseCG = this.physics.p2.createCollisionGroup();
        
       
        this.physics.p2.updateBoundsCollisionGroup();
        
        this.apple.body.setCollisionGroup(this.appleCG);
         this.omnom.body.setCollisionGroup(this.omnomCG);
        this.ant.body.setCollisionGroup(this.antCG);
        this.apple1.body.setCollisionGroup(this.appleCG);
         this.base.body.setCollisionGroup(this.baseCG);
        this.bubble.body.setCollisionGroup(this.bubbleCG);
       
         this.goToMainMenu = this.add.bitmapText(1200, 100, 'eightbitwonder', 'Exit', 50);
         this.goToMainMenu.inputEnabled = true;
   
        this.goToMainMenu.events.onInputDown.addOnce(function(){
           this.state.start('menu');
        },this);
    },
    

   update: function () {
         
	   	this.ready = true;
        this.omnom.body.collides(this.appleCG);
        this.apple.body.collides(this.omnomCG, function(){omnomFruitCollision(this.apple,this.omnom);},this);
        
         this.omnom.body.collides(this.baseCG);
       this.base.body.collides(this.omnomCG);
       
       
       this.bubble.body.collides(this.appleCG);
        this.apple.body.collides(this.bubbleCG, function(){bubbleCollisionWithAnObject(this.apple,this.bubble);},this);
       
      //  this.apple.body.collides(this.omnomCG, omnomFruitCollision(this.apple,this.omnom), this);
      //    this.ant.body.collides(this.appleCG);
      //  this.apple1.body.collides(this.antCG, antFruitCollision, this);
      //  
      //  this.omnom.body.collides(this.apple, omnomFruitCollision, this);
      //  this.apple.body.collides(this.omnom, omnomFruitCollision, this);
        
       /** this.physics.arcade.overlap(this.apple, this.omnom, omnomFruitCollision, null, this);
        this.physics.arcade.overlap(this.apple, this.bubble, bubbleCollisionWithAnObject, null, this);
         this.physics.arcade.overlap(this.apple1, this.ant, antFruitCollision, null, this);
        
        
     //    this.apple.body.maxVelocity.y = 130;
        if(!this.bubble.exists){
          
            this.apple.body.acceleration.y= 100;
        }
        */
    
	}
};

