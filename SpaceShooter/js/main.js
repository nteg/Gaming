window.onload = function() {

    var game = new Phaser.Game(700, 700, Phaser.CANVAS, 'gamecontainer');
            game.state.add('Boot', SpaceShooter.Boot);
            game.state.add('Preloader', SpaceShooter.Preloader);
            game.state.add('Game', SpaceShooter.Game);
            game.state.add('Level2', SpaceShooter.Level2);
            game.state.start('Boot');
    
}