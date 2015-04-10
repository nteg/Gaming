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
    omnom = addAnimation(game,omnom, 'eat',0,5 , 6, false );
    return omnom;
    
}