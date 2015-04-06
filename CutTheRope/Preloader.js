CutTheRope.Preloader = function(game) {
   
    this.ready = false;
};

CutTheRope.Preloader.prototype = {
	
	preload: function () {
		
		    


	},

	create: function () {
		
	},

	update: function () {
	   	this.ready = true;
        this.state.start('level1');
	}
};