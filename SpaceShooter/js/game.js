SpaceShooter.Game = function(game) {
    this.far;
    this.ship;
    this.cursors;
}

SpaceShooter.Game.prototype = {

    create: function () {

        //  To make the sprite move we need to enable Arcade Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        background = this.add.tileSprite(0, 0, 560, 560, 'background');
        ship = this.add.sprite(10,200,'player'); 
    
        this.physics.enable(ship,Phaser.Physics.ARCADE);
        arrowKeys = this.input.keyboard.createCursorKeys();

      //  this.camera.follow(ship);
        
        // ship.body.velocity.x=20;
    },

    update: function () {

        background.tilePosition.x -= 1;  

        // mouse cursor movement 
        //  If the ship is > 8px away from the pointer then let's move to it.        
        /*if (this.physics.arcade.distanceToPointer(ship, this.input.activePointer) > 8) {
            //  Make the object seek to the active pointer (mouse or touch).
            this.physics.arcade.moveToPointer(ship, 300);
        } else {
            //  Otherwise turn off velocity because we're close enough to the pointer
            ship.body.velocity.set(0);
        }*/
        
        // keyboard arrow keys movement 
        // Reset the player, then check for movement keys
        ship.body.velocity.setTo(0, 0);

        if (arrowKeys.left.isDown) {
            ship.body.velocity.x = -200;
        } else if (arrowKeys.right.isDown) {
            ship.body.velocity.x = 200;
        } else if (arrowKeys.down.isDown) {
            ship.body.velocity.y = 200;
        } else if (arrowKeys.up.isDown) {
            ship.body.velocity.y = -200;
        }
    }

};