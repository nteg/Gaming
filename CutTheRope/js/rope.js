
/**
 * Creates a rope of given image
 * @arg =
 *  {
 *      length : <no of repeated beads>
 *      anchor :{x: #,y: #}    // inital pos to start
 *      imageConfig : {name: #, radius: #}
 *  }
 */


function createRope(arg) {

    var newBead, lastBead, myRevoluteConst = [], beads,
        length = arg.length,
        anchor = arg.anchor,
        startPoint =arg.startPoint,
        beadImg = arg.imageConfig.name,
        height = arg.imageConfig.radius || 16,        //  Height for the physics body
        width = arg.imageConfig.radius || 16,         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
        maxForce = 20000,   //  The force that holds the rectangles together.
        x, y,
        game= arg.game;

    //  Here we create our rope group
    beads = game.add.group();

    for (var i = 0; i <= length; i++) {
        x = startPoint.x+ (i * width);     //  Every new rect is positioned below the last
        y = startPoint.y ;     //  All rects are on the same y position

        newBead = beads.create(x, y, beadImg);

        //  Enable physicsbody
        game.physics.p2.enable(newBead);

        //  Set custom circle
        newBead.body.setCircle(width/2);
        if(i==0){
            myRevoluteConst.push( game.physics.p2.createRevoluteConstraint(newBead, [-width/2, 0], anchor.obj, [anchor.width/2, 0], maxForce) );
        }
        else{
            myRevoluteConst.push( game.physics.p2.createRevoluteConstraint(newBead, [-width/2, 0], lastBead, [width/2, 0], maxForce) );
        }

        lastBead = newBead;

    }

    return {
        lastBeadPos : {
            x : x,
            y : y
        },
        joints  : myRevoluteConst,
        beads   : beads
    }

}