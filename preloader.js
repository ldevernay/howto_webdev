
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  //this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    //  Show the loading progress bar asset we loaded in boot.js
    this.stage.backgroundColor = '#2d2d2d';

    this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
    this.add.text(this.game.width / 2, this.game.height / 2 - 30, "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    //  Here we load the rest of the assets our game needs.
    this.load.image('titlepage', 'assets/titlepage.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('empty', 'assets/empty.png');
    this.load.image('gender', 'assets/gender.png');
    this.load.image('color', 'assets/color.png');
    this.load.image('school', 'assets/school.png');
    this.load.image('university', 'assets/university.png');
    this.load.image('factory', 'assets/factory.png');
    this.load.image('firstLvlDone', 'assets/firstLvlDone.png');
    this.load.image('bullet', '/assets/bullet.png');
    this.load.image('question', '/assets/question.png');
    this.load.image('simplon', '/assets/simplon.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
  },

  create: function () {

    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;

  },

  update: function () {

    //  You don't actually need to do this, but I find it gives a much smoother game experience.
    //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //  You can jump right into the menu if you want and still play the music, but you'll have a few
    //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //  it's best to wait for it to decode here first, then carry on.

    //  If you don't have any music in your game then put the game.state.start line into the create function and delete
    //  the update function completely.

    //if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    //{
    //  this.ready = true;
    this.state.start('MainMenu');
    //}

  }

};
