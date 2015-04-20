function createAnimationWithXmlFile(game,screenPositionX, screenPositionY, imageIdentifier, startImageName){
    var animationGroup = game.add.group();
    var animationObject=animationGroup.create(screenPositionX,screenPositionY, imageIdentifier, startImageName);
    animationObject.anchor.setTo(0.5, 0.5);
    animationObject.body.moves = false;
    return animationObject;
}

function addAnimationWithXmlFile(animationObject, game, animationIdentifier, animationStartArrayPoint, animationStopArrayPoint){
    if(animationStartArrayPoint != NaN && animationStopArrayPoint != NaN){
        animationObject.animations.add(animationIdentifier, game.math.numberArray(animationStartArrayPoint,animationStopArrayPoint));
    }
    else{
        animationObject.animations.add(animationName);
    }
    return animationObject;
}

function createAnimation(game,screenPositionX, screenPositionY, imageIdentifier){

    var animationObject = game.add.sprite(screenPositionX, screenPositionY, imageIdentifier);
    animationObject.anchor.setTo(0.5, 0.5);
    animationObject.enableBody = true;
    return animationObject;
}

function addAnimation(game,animationObject, animationIdentifier, animationStartArrayPoint, animationStopArrayPoint, animationFramesPerSecond, animationRepet ){
    if(animationStartArrayPoint != NaN && animationStopArrayPoint != NaN){
        animationObject.animations.add(animationIdentifier, game.math.numberArray(animationStartArrayPoint,animationStopArrayPoint), animationFramesPerSecond, animationRepet);

    }
    else{
        animationObject.animations.add(animationIdentifier);
    }
    return animationObject;
}



//methods added by nitin:

function resizeGame(game) {
    var width = window.innerWidth,
        height = window.innerHeight;

    game.width = width;
    game.height = height;

    if (game.renderType == Phaser.WEBGL)
    {
        game.renderer.resize(width, height);
    }
}

function setCollisions (game,obj1, obj2, callback)
{
    var omnomCollisionGroup = game.physics.p2.createCollisionGroup(),
        duckCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.updateBoundsCollisionGroup();

    obj1.body.setCollisionGroup(omnomCollisionGroup);
    obj1.body.collides([duckCollisionGroup]);

    obj2.body.setCollisionGroup(duckCollisionGroup);
    //obj1.body.collides([omnomCollisionGroup, gameObjects.ropes.beads],[callback, function(){}], this);
    obj2.body.collides(omnomCollisionGroup, callback, this);
}


function blockHit (body1,body2) {

    //	The block hit something
    //	This callback is sent: the Body it collides with
    //	shapeA is the shape in the calling Body involved in the collision
    //	shapeB is the shape in the Body it hit
    //	equation is an array with the contact equation data in it

    console.log( 'You last hit: ' + body1.sprite.key+" with "+body2.sprite.key);
    body2.sprite.animations.play('eat');
    body2.sprite.events.onAnimationComplete.add(function(){
        body1.sprite.kill();
        body2.sprite.frame = 0;
    }, this);

}