function buildMonster(game,screenPositionX, screenPositionY, imageIdentifier, startImageName) {
           
    var monster = createAnimation(game,screenPositionX, screenPositionY,                                        imageIdentifier, startImageName);
    monster = addAnimation(monster,game, 'rest',1,58);
    monster = addAnimation(monster,game, 'walk',68,107);
    monster = addAnimation(monster,game, 'full');
    return monster;
    
    /** var monsterGroup = game.add.group();
            monsterGroup.enableBody = true;
            var monster=monsterGroup.create(screenPositionX,                                       screenPositionY, imageIdentifier, startImageName);
            monster.anchor.setTo(0.5, 0.5);
            monster.body.moves = false;
            monster.animations.add('Rest', game.math.numberArray(1,58));
            monster.animations.add('Walk', game.math.numberArray(68,107));
           // b.animations.play('Rest', 24, true);
            return monster;
            */
        
    }