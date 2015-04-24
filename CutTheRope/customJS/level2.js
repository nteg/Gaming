CutTheRope.level2 = function(game) {
    this.titleText = null;
    this.ready = false;
    this.omnom;
    this.apple;
    this.appleCG;
    this.omnomCG;  
    this.baseCG;
    this.background;
    this.base; 
    this.bubble;
 this.bubbleCG;
    this.goToMainMenu;
};



CutTheRope.level2.prototype = {
	
	preload: function () {
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
    },

	create: function () {
         
        
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.background = this.add.image(0,0, 'greenBackground');
        this.background.scale.setTo(4,3);
        
        this.base = buildBase(this,800,800, 'base');
        this.omnom = buildOmnom(this,750,600,'omnom');
        this.omnom.frame = 0;
        this.apple = buildFruit(this,this.world.centerX,this.world.centerY-220, 'apples');
        this.appleCG = this.physics.p2.createCollisionGroup();
        this.omnomCG = this.physics.p2.createCollisionGroup();
        this.baseCG = this.physics.p2.createCollisionGroup();
        this.physics.p2.updateBoundsCollisionGroup();
        this.apple.body.setCollisionGroup(this.appleCG);
        this.omnom.body.setCollisionGroup(this.omnomCG);
        this.base.body.setCollisionGroup(this.baseCG);
        this.omnom.body.collides(this.appleCG);
        this.apple.body.collides(this.omnomCG, function(){omnomFruitCollision(this.apple,this.omnom);},this);
        this.omnom.body.collides(this.baseCG);
        this.base.body.collides(this.omnomCG);
        
        
        /**setCollisions (this,this.apple,this.base);
        setCollisions (this,this.omnom,this.base);
        setCollisions (this,this.omnom,this.apple,function(){omnomFruitCollision(this.apple,this.omnom);});
        */
        
        this.bubble =  buildBubble(this,this.world.centerX,this.world.centerY, 'bubble');
        this.bubbleCG = this.physics.p2.createCollisionGroup();
        this.bubble.body.setCollisionGroup(this.bubbleCG);
        this.bubble.body.collides(this.appleCG);
        this.apple.body.collides(this.bubbleCG, function(){bubbleCollisionWithAnObject(this.apple,this.bubble);},this);
       
        this.goToMainMenu = this.add.bitmapText(1200, 100, 'eightbitwonder', 'Exit', 50);
         this.goToMainMenu.inputEnabled = true;
   
        this.goToMainMenu.events.onInputDown.addOnce(function(){
           this.state.start('menu');
        },this);
     },
    

   update: function () {
         
	   	this.ready = true;
        
        if(!this.apple.exists){
            this.state.start('menu');
        }
   	}
};

