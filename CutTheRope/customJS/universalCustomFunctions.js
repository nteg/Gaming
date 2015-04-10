function createAnimationWithXmlFile(game,screenPositionX, screenPositionY, imageIdentifier, startImageName){
    var animationGroup = game.add.group();
    animationGroup.enableBody = true;
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
    return animationObject;
}

function addAnimation(game,animationObject, animationIdentifier, animationStartArrayPoint, animationStopArrayPoint, animationFramesPerSecond, animationRepet ){
    if(animationStartArrayPoint != NaN && animationStopArrayPoint != NaN){
      //  animationObject.animations.add('left', [0, 1, 2, 3], 10, true);//.animations.add(animationIdentifier, [0, 1, 2, 3], animationFramesPerSecond, animationRepet);
       // animationObject.frame = 4;
    }
    else{
        animationObject.animations.add(animationIdentifier);
    }
    return animationObject;
}


function resizeGame(game) {
var height = $(window).height();
var width = $(window).width();
	
game.width = width;
game.height = height;
game.stage.bounds.width = width;
game.stage.bounds.height = height;
	
if (game.renderType == Phaser.WEBGL)
{
	game.renderer.resize(width, height);
}
}