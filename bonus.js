
BasicGame.Bonus = function (game) {
};

function violentDeathBonus (player, sprite) {

  // Removes the star from the screen
  sprite.animations.add('kaboom');
  var explosion = explosions.getFirstExists(false);
  explosion.reset(sprite.body.x, sprite.body.y);
  explosion.play('kaboom', 30, false, true);
  sprite.kill();
  explosion.kill();
}

function nxtLvlBonus (player, school) {
  localStorage.setItem('done', 'thirdLvl');
  localStorage.setItem('gender', 'male');
  localStorage.setItem('color', 'white');
  this.state.start('Success');
}


function animateBaddieBonus(player, baddieBonus){
  baddieBonus.body.velocity.x = -300;
  baddieBonus.body.velocity.x = -600;
  baddieBonus.animations.play('left');
}

BasicGame.Bonus.prototype = {

  shootBulletBonus : function() {
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

    // Set the bullet position to the building position.
    if (localStorage.getItem('done') == 'firstLvl'){
      bullet.reset(school.x, school.y + 30);
    } else if (localStorage.getItem('done') == 'secondLvl'){
      bullet.reset(school.x, school.y + 150);
    }

    // Shoot it
    bullet.body.velocity.x = this.BULLET_SPEED;
    bullet.body.velocity.y = 0;

  },

  shootBaddiesBonus : function() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBaddieShotAt === undefined) this.lastBaddieShotAt = 0;
    if (this.game.time.now - this.lastBaddieShotAt < this.BADDIE_SHOT_DELAY) return;
    this.lastBaddieShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    baddieFactoryBonus = this.baddiePoolBonus.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (baddieFactoryBonus === null || baddieFactoryBonus === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    baddieFactoryBonus.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    baddieFactoryBonus.checkWorldBounds = true;
    baddieFactoryBonus.outOfBoundsKill = true;

    // Set the bullet position to the building position.
    baddieFactoryBonus.reset(factory.x, factory.y + 150);

    // Shoot it
    // baddieFactory.body.velocity.x = this.BULLET_SPEED;
    // baddieFactory.body.velocity.y = 0;


    this.game.physics.arcade.collide(baddieFactoryBonus, platforms);

    animateBaddieBonus(player, baddieFactoryBonus);

  },

  create: function () {


    // Define constants
    this.SHOT_DELAY = 1000; // milliseconds (10 bullets/second)
    this.BULLET_SPEED = -150; // pixels/second
    this.NUMBER_OF_BULLETS = 200;
    this.NUMBER_OF_BADDIES = 200;
    this.BADDIE_SHOT_DELAY = 1000;

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
    baddieBonus = this.game.add.sprite(750, this.game.world.height - 150, 'baddie');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(baddieBonus);

    //  Player physics properties. Give the little guy a slight bounce.
    baddieBonus.body.bounce.y = 0.2;
    baddieBonus.body.gravity.y = 300;
    //baddie.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    baddieBonus.animations.add('left', [0, 1], 10, true);
    baddieBonus.animations.add('right', [2, 3], 10, true);

    //  Our controls.
    cursors = this.game.input.keyboard.createCursorKeys();
    buildings = this.game.add.group();

    buildings.enableBody = true;
    // Add buildings
    school = buildings.create(this.game.world.width / 4, 475, 'school');
    university = buildings.create(this.game.world.width / 2, 440, 'university');
    factory = buildings.create(this.game.world.width - 100, 330, 'factory');

    school.body.immovable = true;
    university.body.immovable = true;
    factory.body.immovable = true;

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

    // Create an object pool of baddies
    this.baddiePoolBonus = this.game.add.group();
    for(var j = 0; j < this.NUMBER_OF_BADDIES; j++) {
      // Create each baddie and add it to the group.
      baddieFactoryBonus = this.game.add.sprite(0, 0, 'baddie');
      this.baddiePoolBonus.add(baddieFactoryBonus);

      // Set its pivot point to the center of the baddie
      baddieFactoryBonus.anchor.setTo(0.5, 0.5);
      //  We need to enable physics on the player
      this.game.physics.arcade.enable(baddieFactoryBonus);

      //  Player physics properties. Give the little guy a slight bounce.
      baddieFactoryBonus.body.bounce.y = 0.2;
      baddieFactoryBonus.body.gravity.y = 300;
      //baddieFactory.body.collideWorldBounds = true;

      //  Our two animations, walking left and right.
      baddieFactoryBonus.animations.add('left', [0, 1], 10, true);
      baddieFactoryBonus.animations.add('right', [2, 3], 10, true);

      // Set its initial state to "dead".
      baddieFactoryBonus.kill();
    }
    // Enable physics on the bullet
    this.game.physics.arcade.enable(this.baddiePoolBonus);
    this.baddiePoolBonus.enableBody = true;
    this.game.physics.arcade.collide(player, this.baddiePoolBonus);
    this.baddiePoolBonus.physicsBodyType = Phaser.Physics.ARCADE;

    //  An explosion pool
    explosions = this.game.add.group();
    explosions.createMultiple(30, 'kaboom');
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;
    player.animations.add('kaboom');

  },

  update: function () {

    //  Collide the player and with the platforms
    this.game.physics.arcade.collide(player, platforms);


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
      //  Move to the left
      player.body.velocity.x = -250;

      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      //  Move to the right
      player.body.velocity.x = 250;

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
    var baddieHitPlatform = this.game.physics.arcade.collide(baddieBonus, platforms);

    animateBaddieBonus(player, baddieBonus);

    // Collide player and bullets
    this.shootBulletBonus();
    // Make it lethal
    this.game.physics.arcade.overlap(player, bullet, violentDeathBonus, null, this);
    // Collide player and bullets
    this.shootBaddiesBonus();
    // Make it lethal

    var baddieFactoryHitPlatform = this.game.physics.arcade.collide(baddieFactoryBonus, platforms);
    this.game.physics.arcade.overlap(player, baddieFactoryBonus, violentDeathBonus, null, this);

    // Collide player and buildings
    this.game.physics.arcade.overlap(player, school, violentDeathBonus, null, this);
    this.game.physics.arcade.overlap(player, university, violentDeathBonus, null, this);

    // Collide player and baddie
    this.game.physics.arcade.overlap(player, baddieBonus, violentDeathBonus, null, this);

    //  Collide the player and with the platforms
    //this.game.physics.arcade.collide(player, buildings);

    // Collide player and school
    this.game.physics.arcade.overlap(player, factory, nxtLvlBonus, null, this);

  }

};
