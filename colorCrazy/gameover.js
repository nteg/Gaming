var GameOver = function(game){	}

GameOver.prototype={
	
	preload:function(){
		this.game.load.image("gameover","assets/gameover.png");
		this.game.load.image("scoreLabel","assets/scorelabel.png");
	},

	create:function(){
		//this.labelScore = this.game.add.text(10, 10, "1900", { font: "30px Arial", fill: "#ffffff" });   
		
		var background=this.game.add.sprite(0,0,"backgroundImg");		
		var gameover=this.game.add.sprite(375,0,"gameover");
		var scorelabel=this.game.add.sprite(500,180,"scoreLabel");
		
		if(this.game.score == 0){
			this.game.score="0";
		}
		else{
			this.game.score = "0" + this.game.score;
		}


		var scoreCard = this.game.add.text(900,190, this.game.score,{ font: "100px Arial", fill: "#4c7cff" });  
		var playButton = this.game.add.button(510,325,"playgame",this.playTheGame,this);
		var developers= this.game.add.text(475, 560, "Developed By Shivam Sharma and Akshay Chauhan", { font: "20px Arial", fill: "#000000" });
	},

	playTheGame:function(){
		this.game.state.start("thegame");
	}
}