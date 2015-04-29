CutTheRope.menu = function(game) {
    this.titleText = null;
    this.ready = false;
    this.omnom;
    this.apple;
    this.appleCG;
    this.omnomCG;  
    this.baseCG;
    this.background;
    this.base;  
    this.stage = [];
    this.stage1= null;
    this.stage2= null;
    this.stage3= null;
};



CutTheRope.menu.prototype = {
	
	preload: function () {
         this.background = this.add.image(0,0, 'stepBackground');
        this.background.scale.setTo(2,2);
        this.titleText = this.add.bitmapText(200, 70, 'eightbitwonder', 'Cut The Rope', 100);
        this.stage[0] = this.add.bitmapText(800, 550, 'eightbitwonder', 'Level1', 50);
        this.stage[1] = this.add.bitmapText(650, 430, 'eightbitwonder', 'Level2', 50);
        this.stage[2] = this.add.bitmapText(400, 300, 'eightbitwonder', 'Level3', 50);
        this.stage[3] = this.add.bitmapText(400, 600, 'eightbitwonder', 'test', 50);
    },

	create: function () {
        this.physics.startSystem(Phaser.Physics.P2JS);
       
        this.base = buildSlide(this,1200,750, 'base');
         this.base.scale.setTo(.5,1);
        this.omnom = buildOmnom(this,1200,600,'omnom');
        this.omnom.frame = 0;
       
      //  this.apple = buildFruit(this,1200,this.world.centerY-220, 'apples');
         this.apple = buildFruit(this,1200,this.world.centerY-220, 'apples');
            
        this.appleCG = this.physics.p2.createCollisionGroup();
        this.omnomCG = this.physics.p2.createCollisionGroup();
        this.baseCG = this.physics.p2.createCollisionGroup();
        this.physics.p2.updateBoundsCollisionGroup();
       
        this.omnom.body.setCollisionGroup(this.omnomCG);
        this.base.body.setCollisionGroup(this.baseCG);
        this.apple.body.setCollisionGroup(this.appleCG);
        
        
        this.stage[0].inputEnabled = true;
        this.stage[1].inputEnabled = true;
        this.stage[2].inputEnabled = true;
         this.stage[3].inputEnabled = true;
   
        this.stage[0].events.onInputDown.addOnce(function(){
           this.state.start('level1');
        },this);
        
        this.stage[1].events.onInputDown.addOnce(function(){
           this.state.start('level2');
        },this);
        
        this.stage[2].events.onInputDown.addOnce(function(){
           this.state.start('level3');
        },this);
        
        this.stage[3].events.onInputDown.addOnce(function(){
           this.state.start('test');
        },this);
     },
    

   update: function () {
         
	   	this.ready = true;
        this.omnom.body.collides(this.appleCG);
        this.apple.body.collides(this.omnomCG, function(){omnomFruitCollision(this,this.apple,this.omnom);},this);
        this.omnom.body.collides(this.baseCG);
        this.base.body.collides(this.omnomCG);
       
   	}
};

