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

/**
 to use we have to write code in any level
 this.dude = buildDude(this,100,100,'dude');
 this.dude.animations.play('left');
 */
function buildDude(game,screenPositionX, screenPositionY, imageIdentifier) {

    var dude = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    dude = addAnimation(game,dude, 'left', 0, 3, 10, true );
    dude = addAnimation(game,dude, 'right', 5, 8, 10, true );
    return dude;

}

function buildCoin(game,screenPositionX, screenPositionY, imageIdentifier) {

    var coin = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    coin = addAnimation(game,coin, 'spin', 0, 3, 10, true );
    coin.animations.play('spin');
    coin.enableBody = true;
    game.physics.p2.enable(coin);
    coin.physicsBodyType = Phaser.Physics.P2JS;
    coin.body.static = true;
    return coin;

}

function buildBlower(game,screenPositionX, screenPositionY, imageIdentifier) {

    var blower = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    blower = addAnimation(game,blower, 'blow', 0, 7, 15, false );
   // blower = addAnimation(game,blower, 'spand', 4, 7, 8, true );
     blower.anchor.setTo(0.5, 0.5);
    // blower.animations.play('srink');
    blower.inputEnabled = true;
    blower.enableBody = true;
    game.physics.p2.enable(blower);
    blower.physicsBodyType = Phaser.Physics.P2JS;
    blower.body.static = true;
    blower.body.setCircle(100);
    return blower;

}

function buildOmnom(game,screenPositionX, screenPositionY, imageIdentifier) {

    var omnom = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    omnom = addAnimation(game,omnom, 'eat',0,5 , 5, false );
      omnom = addAnimation(game,omnom, 'wait',0,1 , 1, true );
 //   omnom.animations.play('wait');
    omnom.body.mass = 200;
    //   omnom.body.fixedRotation = true
    omnom.body.setRectangle(200, 100);
     omnom.anchor.setTo(0.5, 0.7);
    return omnom;

}

function buildWorm(game,screenPositionX, screenPositionY, imageIdentifier) {

    var worm = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    worm = addAnimation(game,worm, 'eat',0,5 , 5, false );
    worm.body.mass = 50;
    //   omnom.body.fixedRotation = true
    worm.body.setRectangle(200, 10);
    return worm;

}

//game base related functions
function buildSlide(game,screenPositionX, screenPositionY, imageIdentifier){
    var base = game.add.sprite(screenPositionX,screenPositionY, imageIdentifier);
    base.enableBody = true;
    game.physics.p2.enable(base);
    base.body.setRectangle(330,76);
    base.physicsBodyType = Phaser.Physics.P2JS;
    base.body.static = true;

    return base;
}

//game ant related functions
function buildAnt(game,screenPositionX, screenPositionY, imageIdentifier) {

    var ant = createAnimation(game,screenPositionX, screenPositionY, imageIdentifier);
    ant = addAnimation(game,ant, 'eat',0,3 , 10, true );
    ant = addAnimation(game,ant, 'walk',0,2 , 10, true );
    ant.scale.setTo(6,6);
    return ant;

}

//game bubble related functions

function buildBubble(game,screenPositionX, screenPositionY, imageIdentifier){
    var bubble = game.add.sprite(screenPositionX,screenPositionY, imageIdentifier);
    bubble.scale.setTo(3.5,3.5);
    bubble.anchor.setTo(0.5,0.5);

    bubble.enableBody = true;

    //   game.physics.arcade.enableBody(bubble);
    game.physics.p2.enable(bubble);
    //  bubble.body.static = true;
    bubble.body.data.gravityScale=0;
    bubble.inputEnabled = true;
    bubble.body.setCircle(20);

    return bubble;

}

function bubbleCollisionWithAnObject(game,collisionObject, bubble){
    if(bubble.exists){
        bubble.body.data.gravityScale = -18;

        //  Lock the two bodies together. The [0, 0] sets the distance apart
        return game.physics.p2.createLockConstraint(collisionObject, bubble, [0, 0], 0);
    }
}

//game fruit related functions
function buildFruit(game,screenPositionX, screenPositionY, imageIdentifier){
    var fruit = game.add.sprite(screenPositionX,screenPositionY, imageIdentifier);

    fruit.anchor.setTo(0.3,0.2);
    fruit.enableBody = true;
    //  game.physics.arcade.enableBody(fruit);
    game.physics.p2.enable(fruit);
    fruit.frame = game.rnd.integerInRange(0,2);
    fruit.physicsBodyType = Phaser.Physics.P2JS;
    fruit.body.setCircle(33);
    //   fruit.body.acceleration.y= 100;
    fruit.body.mass = 1;

    return fruit;
}

function omnomFruitCollision(game,fruit,omnom){
    if(fruit.exists){
       // omnom.animations.stop('wait');
        //game.physics.p2.createRevoluteConstraint(fruit, [fruit.width/2, 0], omnom, [omnom.width/2, 0], 2000);
        game.physics.p2.createLockConstraint(fruit, omnom, [0, -30], 0);

        omnom.animations.play('eat');

        omnom.events.onAnimationComplete.add(function(){
            fruit.kill();
        //    omnom.frame = 0;
            omnom.animations.play('wait');
        }, this);
      //   omnom.animations.stop('eat');
         
       
    }
}

function antFruitCollision(fruit,ant){
    if(fruit.exists){
        // ant.animations.stop('walk');
        ant.animations.play('eat');
        ant.events.onAnimationLoop.add(function(){
            fruit.kill();
            ant.animations.stop('eat');
            ant.animations.play('walk');
        }, this);

    }
}

function buildPeg(game,screenPositionX, screenPositionY, imageIdentifier){
    var peg = game.add.sprite(screenPositionX, screenPositionY, imageIdentifier);
    game.physics.p2.enable(peg);
    //peg.body.setRectangle(22, 22);
    peg.body.setCircle(22);
    peg.body.static = true;
    return peg;
}

function buildRope(game,obj1,obj2,ropeLength){
    var rope ={
        beads:game.add.group(),
        myRevoluteConst: []
    };
    var width = 16;
    var maxForce = 2000; //  The force that holds the rectangles together.

    for (var i = 0; i <= ropeLength; i++) {
        x = obj1.x+ (i * width);     //  Every new rect is positioned below the last
        y = obj1.y ;     //  All rects are on the same y position
        var newBead = rope.beads.create(x, y, 'bead');
        //  Enable physicsbody
        game.physics.p2.enable(newBead);
        //  Set custom circle
        newBead.body.setCircle(width/2);
        // newBead.body.mass=1;
        if(i==0){
            rope.myRevoluteConst.push( game.physics.p2.createRevoluteConstraint(newBead, [-width/2, 0], obj1, [obj1.width/2, 0], maxForce) );
        }
        else{
            rope.myRevoluteConst.push( game.physics.p2.createRevoluteConstraint(newBead, [-width/2, 0], lastBead, [width/2, 0], maxForce) );
        }
        lastBead = newBead;
    }
    game.physics.p2.createRevoluteConstraint(obj2, [0, -40], rope.beads.children[rope.beads.children.length-1], [2, 0], maxForce);
    rope.beads.setAll('inputEnabled', true);
    return rope;
}

function breakRope(stateObj){
    if(stateObj.IS_MOUSE_HELD){
        var length = stateObj.rope.beads.length,
            strike=false,
            game= stateObj.game;
        for(var i= 0; i<length; i++){
            strike = stateObj.rope.beads.children[i].input.checkPointerOver(game.input.mousePointer);
            if(strike) {
                //breakRope(i);
                game.physics.p2.removeConstraint(stateObj.rope.myRevoluteConst[i]);
                break;
            }

        }
    }
}

function breakBubble(game,bubbleRevoluteConstraint){
    game.bubble.events.onInputDown.addOnce(function(){
        game.physics.p2.removeConstraint(bubbleRevoluteConstraint);

        game.bubble.kill();
    },game);



}

function distroyCoin(game){

}

function buildCoins(gameObj, coinPosArray, bodyGrp1, bodyGrp2, callback){
    var coins=[], tempCoin;
    for(var i=0; i< coinPosArray.length; i++){
        tempCoin = buildCoin(gameObj, coinPosArray[i].x, coinPosArray[i].y,'coin');
        tempCoin.body.setCollisionGroup(bodyGrp1);
        tempCoin.body.collides(bodyGrp2, function(coin, omnom){
            callback();
            coin.sprite.kill();
        },this);
        coins.push(tempCoin);
    }

    return coins;
}
