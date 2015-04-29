CutTheRope.level1 = function(game) {
    this.titleText = null;
    this.ready = false;
    this.omnom;
    this.apple;
    this.appleCG;
    this.omnomCG;  
    this.baseCG;
    this.background;
    this.base;  
    this.goToMainMenu;
    
   
    
     this.peg;
    this.rope;
};



CutTheRope.level1.prototype = {
	
	preload: function () {
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
    },

	create: function () {
        this.physics.startSystem(Phaser.Physics.P2JS);
       
        this.background = this.add.image(0,0, 'greenBackground');
        this.background.scale.setTo(4,3);
        
       
        this.base = buildBase(this,600,800, 'base');
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
        
        
     },
    
    

   update: function () {
         
	   	this.ready = true;
        breakRope(this);
       
   	}
};

