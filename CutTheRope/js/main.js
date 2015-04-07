
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

    game.load.image('bead', 'images/origional/obj_pollen_hd.png');
    game.load.image('duck', 'images/phaser/darkwing_crazy.png');
    game.load.image('orb', 'images/phaser/orb-blue.png');

    //game.load.spritesheet('chain', 'assets/sprites/chain.png', 16, 26);

}

function create() {

    //game.add.tileSprite(0, 0, 800, 800, 'clouds');
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 200;

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



    // attach pointer events
    game.input.onDown.add(function(){gameObjects.IS_MOUSE_HELD =true}, this);
    game.input.onUp.add(function(){gameObjects.IS_MOUSE_HELD =false}, this);

    ropeObj.beads.setAll('inputEnabled', true);

    //  Now using the power of callAll we can add the same input event to all beads in the group:
    //ropeObj.beads.callAll('events.onInputDown.add', 'events.onInputDown', breakRope);
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

}

function render(){
}


function breakRope(item){
    var ropeJoints = gameObjects.ropes[0].joints;
    //itemIndex  = gameObjects.ropes[0].beads.getChildIndex(item),

    game.physics.p2.removeConstraint(ropeJoints[item]);
}
