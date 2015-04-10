CutTheRope.level1 = function(game) {
   // this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
    this.totalBunnies =1;
    this.strawberry = null;
    this.monster;
    this.monster1;
    this.monster2;
    this.dude;
};



CutTheRope.level1.prototype = {
	
	preload: function () {
		 
        this.strawberry = this.add.sprite(this.world.centerX,                                    this.world.centerY-220, 'strawberry');
        this.strawberry.anchor.setTo(0.5,0.5);
        this.strawberry.scale.setTo(0.1,0.1);
        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);

	},

	create: function () {
		//this.preloadBar.cropEnabled = false;
        this.monster= buildMonster(this, 750, 600, 'bunny', 'Bunny0000');
        this.monster.animations.play('rest', 24, true);
        
        this.monster1 =buildMonster(this, 750, 700, 'bunny', 'Bunny0000');
        this.monster1.animations.play('walk', 24, true);
        
         this.monster2=buildMonster(this, 750, 800, 'bunny', 'Bunny0000');
        this.monster2.animations.play('full', 24, true);
        
       // this.dude = buildDude(this,600,600,'dude');
       // this.dude.animations.play('left');
       // this.dude.frame = 4;
        
        
         this.strawberry.enableBody = true;
        this.physics.arcade.enableBody(this.strawberry);
        this.strawberry.body.velocity.y = 200;
        //this.strawberry.checkWorldBounds = true;
        //this.strawberry.events.onOutOfBounds.add(this.resetRock, this);
	},
    
    burstCollision: function(){
        if(this.strawberry.exists){
            this.strawberry.kill();
        }
    },
    
  	update: function () {
	   	this.ready = true;
        this.physics.arcade.overlap(this.strawberry, this.monster, this.burstCollision, null, this);

	}
};

