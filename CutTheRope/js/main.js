
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', {
    preload: preload,
    create: create,
    update : update,
    render : render
});

var gameObjects = {
    anchors : [],
    ropes   : [],
    IS_MOUSE_HELD : false
};

function preload() {

    this.load.image('bead', 'images/origional/obj_pollen_hd.png');
    this.load.image('duck', 'images/phaser/darkwing_crazy.png');
    this.load.image('orb', 'images/phaser/orb-blue.png');

    //game.load.spritesheet('chain', 'assets/sprites/chain.png', 16, 26);

    this.load.spritesheet('omnom', 'images/spritesheets/omnom-eat.png', 161, 161);
    this.load.spritesheet('ant', 'images/spritesheets/ant.png', 47, 23);
    this.load.spritesheet('bubble','images/bubble.png',34,34);
    this.load.spritesheet('apples','images/spritesheets/apples.png',82,82);

}

function create() {

    //game.add.tileSprite(0, 0, 800, 800, 'clouds');
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 200;
    game.physics.p2.setImpactEvents(true);


    var tempAnchor = game.add.sprite(400, 100, "orb"),
        ropeObj, pendulum;


    //  Enable physicsbody
    game.physics.p2.enable(tempAnchor);
    //tempAnchor.body.setRectangle(22, 22);
    tempAnchor.body.setCircle(22);
    tempAnchor.body.static = true;

    gameObjects.anchors.push(tempAnchor);

    //  Length, xAnchor, yAnchor
    ropeObj = createRope({
        length : 15,
        startPoint :{x: 422,y: 100},
        imageConfig : {name: "bead"},
        anchor : {
            obj : gameObjects.anchors[0],
            width : 22
        }
    });

    gameObjects.ropes.push(ropeObj);

    tempAnchor.body.rotation=3.14/2;

    pendulum = game.add.sprite( (ropeObj.lastBeadPos.x + 16), ropeObj.lastBeadPos.y, 'duck');
    game.physics.p2.enable(pendulum);
    pendulum.body.setRectangle(53, 49);
    //pendulum.body.static = true;
    game.physics.p2.createRevoluteConstraint(pendulum, [0, -25], ropeObj.beads.children[ropeObj.beads.children.length-1], [8, 0], 10000);

    gameObjects.pendulum = pendulum;

    // attach pointer events
    game.input.onDown.add(function(){gameObjects.IS_MOUSE_HELD =true}, this);
    game.input.onUp.add(function(){gameObjects.IS_MOUSE_HELD =false}, this);

    ropeObj.beads.setAll('inputEnabled', true);

    //  Now using the power of callAll we can add the same input event to all beads in the group:
    //ropeObj.beads.callAll('events.onInputDown.add', 'events.onInputDown', breakRope);

    gameObjects.omnom = createOmnom();

    setCollisions (gameObjects.omnom, pendulum, blockHit);

    //	Check for the block hitting another object
    //gameObjects.omnom.body.onBeginContact.add(blockHit, this);



}


function update(){

    if(gameObjects.IS_MOUSE_HELD){
        var length = gameObjects.ropes[0].beads.length,
            strike=false;
        for(var i= 0; i<length; i++){
            strike = gameObjects.ropes[0].beads.children[i].input.checkPointerOver(game.input.mousePointer);
            if(strike) {
                breakRope(i);
                break;
            }

        }

    }

    //game.physics.arcade.overlap(gameObjects.pendulum, gameObjects.omnom, omnomFruitCollision, null, this);

}

function render(){
}


function breakRope(item){
    var ropeJoints = gameObjects.ropes[0].joints;
    //itemIndex  = gameObjects.ropes[0].beads.getChildIndex(item),

    game.physics.p2.removeConstraint(ropeJoints[item]);
}

function createOmnom (game){

    var omnom;

    omnom = game.add.sprite(game.world.centerX-100,game.world.height-100,'omnom', 0);
    omnom.frame = 0;
    game.physics.p2.enable(omnom);
    omnom.body.static = true;
    omnom.body.setCircle(30);
    omnom.scale.setTo(0.5);

    return omnom;

    /*gameObjects.omnom = buildOmnom(game,game.world.centerX-100,game.world.height-100,'omnom');
    gameObjects.omnom.frame = 0;
    gameObjects.apple = buildFruit(game,game.world.centerX,game.world.centerY-220, 'apples');
    gameObjects.bubble =  buildBubble(game,game.world.centerX,game.world.centerY, 'bubble');*/

}

function setCollisions (obj1, obj2, callback)
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
    body2.animations.play('eat');
    body2.events.onAnimationComplete.add(function(){
        body1.sprite.kill();
        body1.sprite.frame = 0;
    }, this);

}