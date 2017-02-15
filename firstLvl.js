
BasicGame.FirstLvl = function (game) {
};

function violentDeath (player, sprite) {

  // Removes the star from the screen
  player.kill();

  //TODO : rediriger vers l'écran de fin, qui redirige lui-même vers le MainMenu
  this.state.start('MainMenu');
}

function nxtLvl (player, school) {
  if (localStorage.getItem('done') == 'firstLvl'){
    localStorage.setItem('done', 'secondLvl');
  } else {
    localStorage.setItem('done', 'firstLvl');
  }

  this.state.start('Success');
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

  shootBullet : function() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    bullet = this.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(school.x, school.y + 30);

    // Shoot it
    bullet.body.velocity.x = this.BULLET_SPEED;
    bullet.body.velocity.y = 0;

  },

  create: function () {


    // Define constants
    this.SHOT_DELAY = 2000; // milliseconds (10 bullets/second)
    this.BULLET_SPEED = -150; // pixels/second
    this.NUMBER_OF_BULLETS = 20;

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
    buildings = this.game.add.group();

    buildings.enableBody = true;
    // Add school
    if (localStorage.getItem('done') == 'firstLvl'){
      school = buildings.create(650, 305, 'university');
      this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Réussis tes études", { font: "30px monospace", fill: "#fff" });
    } else {
      school = buildings.create(700, 338, 'school');
      this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Passe ton bac", { font: "30px monospace", fill: "#fff" });
    }
    school.body.immovable = true;

    this.loadingText.anchor.setTo(0.5, 0.5);

    // Create an object pool of bullets
    this.bulletPool = this.game.add.group();
    for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
      // Create each bullet and add it to the group.
      bullet = this.game.add.sprite(0, 0, 'bullet');
      this.bulletPool.add(bullet);

      // Set its pivot point to the center of the bullet
      bullet.anchor.setTo(0.5, 0.5);

      // Set its initial state to "dead".
      bullet.kill();
    }

    // Enable physics on the bullet
    this.game.physics.arcade.enable(this.bulletPool);
    this.bulletPool.enableBody = true;
    this.game.physics.arcade.collide(player, this.bulletPool);
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;


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

    if (localStorage.getItem('done') == 'firstLvl'){
      // Collide player and bullets
      this.shootBullet();
      // Make it lethal
      this.game.physics.arcade.overlap(player, bullet, violentDeath, null, this);
    }


    // Collide player and baddie
    this.game.physics.arcade.overlap(player, baddie, violentDeath, null, this);

    //  Collide the player and with the platforms
    //this.game.physics.arcade.collide(player, buildings);

    // Collide player and school
    this.game.physics.arcade.overlap(player, buildings, nxtLvl, null, this);

  }

};
