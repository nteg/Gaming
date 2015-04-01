window.onload = function() {

    var game = new Phaser.Game(560, 560, Phaser.CANVAS, 'gamecontainer', { preload:preload, create: create ,update:update});

    function create () {
        
    }

    var far;
    var ship;

function preload() {

    game.load.image('background', 'images/galaxyBackground.png');
    game.load.image('player','images/speedship.png');
}

function create() {

        //  To make the sprite move we need to enable Arcade Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.tileSprite(0, 0, 560, 560, 'background');
    ship = game.add.sprite(10,200,'player'); 
    
     game.physics.enable(ship,Phaser.Physics.ARCADE);
     game.camera.follow(ship);
    // ship.body.velocity.x=20;
}

function update() {

    background.tilePosition.x -= 1;
    


    //  If the ship is > 8px away from the pointer then let's move to it.
    if (game.physics.arcade.distanceToPointer(ship, game.input.activePointer) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        game.physics.arcade.moveToPointer(ship, 300);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        ship.body.velocity.set(0);
    

}

}
};