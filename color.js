
BasicGame.Color = function (game) {

};


var leftHalf, righttHalf, isMale;

BasicGame.Color.prototype = {


  create: function () {

    this.add.sprite(0, 0, 'color');
    leftHalf = new Phaser.Rectangle(0,0,this.game.width/2,this.game.height/2);

    righttHalf = new Phaser.Rectangle(this.game.width/2,0,this.game.width/2,this.game.height/2);
  },

  update: function () {

        if (this.input.activePointer.isDown) {
          var insideLeft = leftHalf.contains(this.game.input.mousePointer.x, this.game.input.mousePointer.y);
          if (insideLeft){
            localStorage.setItem('color', 'white');
          } else {
            localStorage.setItem('color', 'other');
          }
          this.state.start('FirstLvl');
        }
  },

};
