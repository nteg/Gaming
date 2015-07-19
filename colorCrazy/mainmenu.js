var MenuItems=function(game){}

MenuItems.prototype={

	preload:function(){
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("playgame","assets/playBtn.png");		
		this.game.load.image("backgroundImg","assets/background.png");
	},

	create:function(){
		var background=this.game.add.sprite(0,0,"backgroundImg");		
		var gameTitle = this.game.add.sprite(330,0,"gametitle");		
		var playButton = this.game.add.button(490,220,"playgame",this.playTheGame,this);		
		var developers= this.game.add.text(450, 560, "Developed By Shivam Sharma and Akshay Chauhan", { font: "20px Arial", fill: "#000000" });
	},

	playTheGame:function(){
		this.game.state.start("thegame");
	}
}