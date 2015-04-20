CutTheRope.Level1 = function(){
    this.anchors = [];
    this.ropes   = [];
    this.IS_MOUSE_HELD = false;

};



CutTheRope.Level1.prototype = {

    preload: function () {

        this.titleText = this.add.bitmapText(70, 70, 'eightbitwonder', 'Cut The Rope', 34);

    },

    create: function () {

        var me= this,
            game= me.game,
            tempAnchor = game.add.sprite(400, 100, "orb"),
            ropeObj, pendulum,
            gameObjects =  me;


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
            },
            game: game
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

        gameObjects.omnom = createOmnom(game);
debugger;
        setCollisions (game, gameObjects.omnom, pendulum, blockHit);

        /*this.omnom = buildOmnom(this,750,800,'omnom');
        this.omnom.frame = 0;

        this.ant = buildAnt(this,400,800,'ant');
        this.ant.animations.play('walk');

        this.apple = buildFruit(this,this.world.centerX,this.world.centerY-220, 'apples');
        this.apple1 = buildFruit(this,500,200, 'apples');

        this.bubble =  buildBubble(this,this.world.centerX,this.world.centerY, 'bubble');
*/

    },

    update: function () {
        var me= this;

        if(me.IS_MOUSE_HELD){
            var length = me.ropes[0].beads.length,
                strike=false;
            for(var i= 0; i<length; i++){
                strike = me.ropes[0].beads.children[i].input.checkPointerOver(me.game.input.mousePointer);
                if(strike) {
                    me.breakRope(i);
                    break;
                }

            }

        }

        /*this.ready = true;
        this.physics.arcade.overlap(this.apple, this.omnom, omnomFruitCollision, null, this);
        this.physics.arcade.overlap(this.apple, this.bubble, bubbleCollisionWithAnObject, null, this);
        this.physics.arcade.overlap(this.apple1, this.ant, antFruitCollision, null, this);

        this.apple.body.maxVelocity.y = 130;
        if(!this.bubble.exists){

            this.apple.body.acceleration.y= 100;
        }*/

    },

    breakRope: function(item){
        var me = this,
            ropeJoints = me.ropes[0].joints;
        //itemIndex  = gameObjects.ropes[0].beads.getChildIndex(item),

        me.game.physics.p2.removeConstraint(ropeJoints[item]);
    }
};

