
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', {
    preload: preload,
    create: create,
    update : update,
    render : render
});


var gameObjects = {
    anchors : [],
    ropes   : []

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
        startPoint :{x: 410,y: 100},
        imageConfig : {name: "bead"},
        anchor : {
            obj : gameObjects.anchors[0],
            width : 22
        }
    });

    gameObjects.ropes.push(ropeObj);

    tempAnchor.body.rotation=3.14/2;

    console.log(ropeObj.lastBead);
    pendulum = game.add.sprite( (ropeObj.lastBead.pos.x + 16), ropeObj.lastBead.pos.y, 'duck');
    game.physics.p2.enable(pendulum);
    pendulum.body.setRectangle(53, 49);
    //pendulum.body.static = true;
    game.physics.p2.createRevoluteConstraint(pendulum, [0, -25], ropeObj.lastBead.obj, [8, 0], 10000);



    // attach pointer events
    game.input.onDown.add(onUserClick, this);

}



function update(){

}

function render(){

}

function onUserClick(pointer){
    console.log(pointer);
    game.physics.p2.removeConstraint(gameObjects.ropes[0].joints[10]);
    
}

