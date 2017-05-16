var mainState = {
    preload: function() {
    	game.load.audio('music', 'assets/audio/Bag Raiders - Shooting Stars.mp3');
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        game.load.spritesheet('q0', 'assets/q0.png', 196, 196, 8);
        game.load.spritesheet('q1', 'assets/q1.png', 196, 196, 4);
        game.load.spritesheet('q2', 'assets/q2.png', 196, 196, 4);
        game.load.spritesheet('q3', 'assets/q3.png', 196, 196, 8);
        game.load.spritesheet('q4', 'assets/q4.png', 196, 196, 10);
        game.load.spritesheet('q5', 'assets/q5.png', 196, 196, 8);
        game.load.spritesheet('q6', 'assets/q6.png', 196, 196, 8);
        game.load.spritesheet('q7', 'assets/q7.png', 196, 196, 8);
        game.load.spritesheet('q8', 'assets/q8.png', 196, 196, 8);
        game.load.spritesheet('q9', 'assets/q9.png', 196, 196, 4);
        game.load.spritesheet('q10', 'assets/q10.png', 196, 196, 8);
        game.load.spritesheet('death', 'assets/RIP.png', 196, 196, 8);
  
        // game.load.image('bkg1', 'assets/images/bkg1.jpg');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('grass', 'assets/bkgr-03.png');
    },

    create: function() {

    	// to resize visible sprite size
		// this.plant_seed.scale.x = 1;
		// this.plant_seed.scale.y = 1;

    	music = game.add.audio('music');
    	music.play();

    	this.bkg = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
    	this.bkgr3 = game.add.tileSprite(0, game.height-55, game.width, game.height/2, 'grass');

    	this.q0 = game.add.sprite(0, 165, 'q0');
		game.physics.enable(this.q0);
		this.q0.collideWorldBounds = true;
		this.q0.animations.add('q0', [0, 1, 2, 3, 4, 5, 6, 7], 8,true);
		

		this.q1 = game.add.sprite(100, 165, 'q1');
		game.physics.enable(this.q1);
		this.q1.collideWorldBounds = true;
		this.q1.animations.add('q1', [0, 1, 2, 3], 8, true);


		this.q2 = game.add.sprite(200, 165, 'q2');
		game.physics.enable(this.q2);
		this.q2.collideWorldBounds = true;
		this.q2.animations.add('q2', [0, 1, 2, 3], 8, true);


		this.q3 = game.add.sprite(300, 165, 'q3');
		game.physics.enable(this.q3);
		this.q3.collideWorldBounds = true;
		this.q3.animations.add('q3', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		

		this.q4 = game.add.sprite(400, 165, 'q4');
		game.physics.enable(this.q4);
		this.q4.collideWorldBounds = true;
		this.q4.animations.add('q4', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
		

		this.q5 = game.add.sprite(500, 165, 'q5');
		game.physics.enable(this.q5);
		this.q5.collideWorldBounds = true;
		this.q5.animations.add('q5', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		

		this.q6 = game.add.sprite(600, 165, 'q6');
		game.physics.enable(this.q6);
		this.q6.collideWorldBounds = true;
		this.q6.animations.add('q6', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		

		this.q7 = game.add.sprite(700, 165, 'q7');
		game.physics.enable(this.q7);
		this.q7.collideWorldBounds = true;
		this.q7.animations.add('q7', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);

		this.q8 = game.add.sprite(800, 165, 'q8');
		game.physics.enable(this.q8);
		this.q8.collideWorldBounds = true;
		this.q8.animations.add('q8', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);

		this.q9 = game.add.sprite(900, 165, 'q9');
		game.physics.enable(this.q9);
		this.q9.collideWorldBounds = true;
		this.q9.animations.add('q9', [0, 1, 2, 3], 8, true);

		this.q10 = game.add.sprite(1000, 165, 'q10');
		game.physics.enable(this.q10);
		this.q10.collideWorldBounds = true;
		this.q10.animations.add('q10', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		

		this.death = game.add.sprite(1100, 165, 'death');
		game.physics.enable(this.death);
		this.death.collideWorldBounds = true;
		// this.death.animations.add('death', [0, 1, 2, 3, 4, 5, 6, 7], 10 ,true);
		

		//resize sprite hitbox setSize(width, height, offsetX, offsetY)
		// this.plant.body.setSize(25,90,50,15);


		//start physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.camera.follow(this.plant);	

		// game.world.bringToTop(this.plant);
		game.physics.arcade.checkCollision.right = false;
		game.physics.arcade.checkCollision.bottom = false;

		// this.timer = game.time.events.loop(1500, this.addPlatforms, this);

		//show controls
    	previewLabel = game.add.text(game.world.centerX+25, game.world.centerY-100, '『sun flower』', {font: '24px Roboto', fill: '#151515'});
		previewLabel.anchor.setTo(0.5, 0.5);

		//fade animation
    	game.time.events.add(3000, function() {
    	    game.add.tween(previewLabel).to({y: 0}, 500, Phaser.Easing.Linear.None, true);
    	    game.add.tween(previewLabel).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
    	}, this);
    },

 	update: function() {
 		this.bkg.tilePosition.x -= 0.25;
    	this.q0.play('q0');
    	this.q1.play('q1');
    	this.q2.play('q2');
    	this.q3.play('q3');
    	this.q4.play('q4');
    	this.q5.play('q5');
    	this.q6.play('q6');
    	this.q7.play('q7');
    	this.q8.play('q8');
    	this.q9.play('q9');
    	this.q10.play('q10');
    	// this.death.play('death');
    },
};

var game = new Phaser.Game(1300, 400, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');


// state 0 == seed
// state 10 == seedling
// state 20 == disease

// transition function
// state   input  next_state
// 0      0       20
// 0      1       20
// 0      2       20
// 0      3       20
// 0      4       2
// 0      5       10
// 0      6       10
// 0      7       20
// 0      8       2
// 0      9       10
// 0      10      10
// 0      11      10
// 0      12      2
// 0      13      10
// 0      14      10
// 0      15      10
// 0      16      2
// 0      17      10
// 0      18      10
// 0      19      10
// 0      20      2
// 0      21      10
// 0      22      10
// 0      23      10
// 0      24      2
// 0      25      10
// 0      26      10
// 0      27      10
// 0      28      2
// 0      29      10
// 0      30      10
// 0      31      10
// 10     0       20
// 10     1       20
// 10     2       20
// 10     3       10
// 10     4       2
// 10     5       10
// 10     6       10
// 10     7       20
// 10     8       2
// 10     9       10
// 10     10      20
// 10     11      20
// 10     12      2
// 10     13      10
// 10     14      
// 10     15
// 10     16
// 10     17
// 10     18
// 10     19
// 10     20
// 10     24
// 10     21
// 10     22
// 10     23
// 10     25
// 10     26
// 10     27
// 10     28
// 10     29
// 10     30
// 10     31
