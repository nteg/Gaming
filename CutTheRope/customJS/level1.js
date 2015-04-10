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
};



CutTheRope.level1.prototype = {
	
	preload: function () {
		 
       
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);
         
	},

	create: function () {
		//this.preloadBar.cropEnabled = false;
       /**
        this.monster= buildMonster(this, 1000, 600, 'bunny', 'Bunny0000');
        this.monster.animations.play('rest', 24, true);
        
        this.monster1 =buildMonster(this, 1000, 700, 'bunny', 'Bunny0000');
        this.monster1.animations.play('walk', 24, true);
        
         this.monster2=buildMonster(this, 1000, 800, 'bunny', 'Bunny0000');
        this.monster2.animations.play('full', 24, true);
        
        this.dude = buildDude(this,600,600,'dude');
      // this.dude.animations.play('right');
          this.dude.animations.play('left');
      // this.dude.frame = 4;
        
      */
        this.omnom = buildOmnom(this,750,600,'omnom');
      //  this.omnom.animations.play('eat');
        this.omnom.frame = 0;
    
         this.strawberry = this.add.sprite(this.world.centerX,this.world.centerY-220, 'strawberry');
        this.strawberry.anchor.setTo(0.5,0.5);
        this.strawberry.scale.setTo(0.1,0.1);
         this.strawberry.enableBody = true;
        this.physics.arcade.enableBody(this.strawberry);
        this.strawberry.body.velocity.y = 200;
        //this.strawberry.checkWorldBounds = true;
        //this.strawberry.events.onOutOfBounds.add(this.resetRock, this);
	},
    
    burstCollision: function(){
        if(this.strawberry.exists){
            this.omnom.animations.play('eat');
            this.strawberry.kill();
        }
    },
    
  	update: function () {
	   	this.ready = true;
        this.physics.arcade.overlap(this.strawberry, this.omnom, this.burstCollision, null, this);

	}
};

