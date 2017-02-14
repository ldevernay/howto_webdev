
BasicGame.FirstLvl = function (game) {
};

function violentDeath (player, baddie) {

  // Removes the star from the screen
  player.kill();

  //TODO : rediriger vers l'écran de fin, qui redirige lui-même vers le MainMenu
  this.state.start('MainMenu');
}

function animateBaddie(player, baddie){
  baddie.body.velocity.x = -300;

  if (localStorage.getItem('color') == 'other' ){
    if (localStorage.getItem('gender') == 'other' ){
      baddie.body.velocity.x = -600;
    } else {
      baddie.body.velocity.x = -450;
    }
  }

  baddie.animations.play('left');
}

BasicGame.FirstLvl.prototype = {

  create: function () {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    this.game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, this.game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // Create baddie
    baddie = this.game.add.sprite(750, this.game.world.height - 150, 'baddie');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(baddie);

    //  Player physics properties. Give the little guy a slight bounce.
    baddie.body.bounce.y = 0.2;
    baddie.body.gravity.y = 300;
    baddie.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    baddie.animations.add('left', [0, 1], 10, true);
    baddie.animations.add('right', [2, 3], 10, true);

    //  Our controls.
    cursors = this.game.input.keyboard.createCursorKeys();

  },

  update: function () {

    //  Collide the player and with the platforms
    this.game.physics.arcade.collide(player, platforms);


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
      //  Move to the left
      player.body.velocity.x = -150;

      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      //  Move to the right
      player.body.velocity.x = 150;

      player.animations.play('right');
    }
    else
    {
      //  Stand still
      player.animations.stop();

      player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
      player.body.velocity.y = -350;
    }

    // Collide baddie and platforms
    var baddieHitPlatform = this.game.physics.arcade.collide(baddie, platforms);

    animateBaddie(player, baddie);


    // Collide player and baddie
    this.game.physics.arcade.overlap(player, baddie, violentDeath, null, this);

  }

};
