CutTheRope.level1 = function(game) {
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
   
};



CutTheRope.level1.prototype = {
	
	preload: function () {
		 
       
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
         
	},

	create: function () {
		
        this.omnom = buildOmnom(this,750,800,'omnom');
        this.omnom.frame = 0;
        
        this.ant = buildAnt(this,400,800,'ant');
        this.ant.animations.play('walk');
    
         this.apple = buildFruit(this,this.world.centerX,this.world.centerY-220, 'apples');
         this.apple1 = buildFruit(this,500,200, 'apples');
        
        this.bubble =  buildBubble(this,this.world.centerX,this.world.centerY, 'bubble');
       
       
    },
    

    
  	update: function () {
         
	   	this.ready = true;
        this.physics.arcade.overlap(this.apple, this.omnom, omnomFruitCollision, null, this);
        this.physics.arcade.overlap(this.apple, this.bubble, bubbleCollisionWithAnObject, null, this);
         this.physics.arcade.overlap(this.apple1, this.ant, antFruitCollision, null, this);
        
         this.apple.body.maxVelocity.y = 130;
        if(!this.bubble.exists){
          
            this.apple.body.acceleration.y= 100;
        }
        
	}
};

