/**
    // to build a monster we just have to write these code to any level
        this.monster= buildMonster(this, 1000, 600, 'bunny', 'Bunny0000');
        this.monster.animations.play('rest', 24, true);
    */
function buildMonster(game,screenPositionX, screenPositionY, imageIdentifier, startImageName) {
           
    var monster = createAnimationWithXmlFile(game,screenPositionX, screenPositionY,imageIdentifier, startImageName);
    monster = addAnimationWithXmlFile(monster,game, 'rest',1,58);
    monster = addAnimationWithXmlFile(monster,game, 'walk',68,107);
    monster = addAnimationWithXmlFile(monster,game, 'full');
    return monster;
    
  
        
    }

function buildDude(game,screenPositionX, screenPositionY, imageIdentifier) {
    
    var dude = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    dude = addAnimation(game,dude, 'left', 0, 3, 10, true );
    dude = addAnimation(game,dude, 'right', 5, 8, 10, true );
    return dude;
    
}

function buildOmnom(game,screenPositionX, screenPositionY, imageIdentifier) {
    
    var omnom = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    omnom = addAnimation(game,omnom, 'eat',0,5 , 10, false );
    return omnom;
    
}

//game ant related functions
function buildAnt(game,screenPositionX, screenPositionY, imageIdentifier) {
    
    var ant = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    ant = addAnimation(game,ant, 'eat',0,3 , 10, false );
     ant = addAnimation(game,ant, 'walk',0,2 , 10, true );
    ant.scale.setTo(4,4);
    return ant;
    
}

//game bubble related functions

function buildBubble(game,screenPositionX, screenPositionY, imageIdentifier){
    var bubble = game.add.sprite(screenPositionX,screenPositionY, imageIdentifier);
    bubble.scale.setTo(3,3);
    bubble.anchor.setTo(0.5,0.5);
    bubble.enableBody = true;
    game.physics.arcade.enableBody(bubble);
    bubble.inputEnabled = true;
    bubble.events.onInputDown.addOnce(function(){bubble.kill();},this);
    return bubble;

}

function bubbleCollisionWithAnObject(collisionObject, bubble){
       if(bubble.exists){
        bubble.x = collisionObject.x;
        bubble.y = collisionObject.y;
        collisionObject.body.acceleration.y= -50;
       }
       
    }

//game fruit related functions
function buildFruit(game,screenPositionX, screenPositionY, imageIdentifier){
    var fruit = game.add.sprite(screenPositionX,screenPositionY, imageIdentifier);
   
    fruit.anchor.setTo(0.5,0.5);
    fruit.enableBody = true;
    game.physics.arcade.enableBody(fruit);
    fruit.frame = game.rnd.integerInRange(0,2);
    fruit.body.acceleration.y= 100;
    return fruit;
}

function omnomFruitCollision(fruit,omnom){
        if(fruit.exists){
            omnom.animations.play('eat');
            omnom.events.onAnimationComplete.add(function(){
                fruit.kill();
                omnom.frame = 0;
            }, this);
            
        }
    }