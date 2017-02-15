
BasicGame.Failure = function (game) {

};


BasicGame.Failure.prototype = {


  create: function () {

    this.add.sprite(0, 0, 'empty');
    if (localStorage.getItem('done') == 'firstLvl'){
      this.loadingText = this.add.text(this.game.width / 4 , this.game.height / 2, "Désolé!", { font: "30px monospace", fill: "#fff" });
      this.loadingText = this.add.text(this.game.width / 4, this.game.height / 2 + 40, "Tu n'as pas eu le bac.", { font: "30px monospace", fill: "#fff" });
      this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Clique pour recommencer.", { font: "20px monospace", fill: "#fff" });
    } else if (localStorage.getItem('done') == 'secondLvl'){
      this.loadingText = this.add.text(this.game.width / 4, this.game.height / 2, "Désolé!", { font: "30px monospace", fill: "#fff" });
        this.loadingText = this.add.text(this.game.width / 4, this.game.height / 2 + 40, "Tu n'as pas eu ton diplôme.", { font: "30px monospace", fill: "#fff" });
      this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Clique pour recommencer.", { font: "20px monospace", fill: "#fff" });
    } else if (localStorage.getItem('done') == 'thirdLvl'){
        this.loadingText = this.add.text(this.game.width / 4, this.game.height / 2, "Désolé!", { font: "30px monospace", fill: "#fff" });
          this.loadingText = this.add.text(this.game.width / 4, this.game.height / 2 + 40, "Ton profil ne convient pas.", { font: "30px monospace", fill: "#fff" });
        this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 100, "Clique pour recommencer.", { font: "20px monospace", fill: "#fff" });
    }
    this.loadingText.anchor.setTo(0.5, 0.5);
  },

  update: function () {

    if (this.input.activePointer.isDown) {
        this.state.start('MainMenu');
    }
  },

};
