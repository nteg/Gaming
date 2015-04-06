var CutTheRope = {};

CutTheRope.level1 = function(game){
    this.monster = null;
    
}


CutTheRope.level1.prototype = {

    preload: function(){
        this.load.image('monster','images/origional/Om-nom.png');
        this.monster = this.add.image(this.world.centerX,this.world.centerY,'monster');
    },

    create: function(){

    },

    update: function(){
    }


}



}