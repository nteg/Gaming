function createAnimation(game,screenPositionX, screenPositionY, imageIdentifier, startImageName){
    var monsterGroup = game.add.group();
    monsterGroup.enableBody = true;
    var monster=monsterGroup.create(screenPositionX,                                       screenPositionY, imageIdentifier, startImageName);
    monster.anchor.setTo(0.5, 0.5);
    monster.body.moves = false;
    return monster;
}

function addAnimation(monster, game, animationName, animationStartArrayPoint, animationStopArrayPoint){
    if(animationStartArrayPoint != NaN && animationStopArrayPoint != NaN){
        monster.animations.add(animationName, game.math.numberArray(animationStartArrayPoint,animationStopArrayPoint));
    }
    else{
        monster.animations.add(animationName);
    }
    return monster;
}


function resizeGame() {
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