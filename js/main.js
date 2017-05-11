var mainState = {
    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 
        game.load.spritesheet('plant', 'assets/images/spriteplant.png', 128, 128, 8);
        // game.load.image('bkg1', 'assets/images/bkg1.jpg');
        game.load.image('bkg3', 'assets/images/bkg3.jpg');

    	// game.load.audio('jump', 'assets/audio/jump.wav');
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  
    	
    	// this.game.stage.backgroundColor = "#FFFFFF";
    	this.bkg = game.add.tileSprite(0, 0, 200, 800, 'bkg3');

	    //add and animate plant
		this.plant = game.add.sprite(650, 275, 'plant');
		game.physics.enable(this.plant);
		this.plant.body.collideWorldBounds = true;
		// this.plant.body.gravity.y = 1000;
		hmove = 200;
		vmove = -300;
		jumpTimer = 0;

		//animate sprite
		this.plant.animations.add('grow', [0, 1, 2, 3, 4, 5, 6, 7], 3, true);
		//resize visible sprite size
		this.plant.scale.x = 0.65;
		this.plant.scale.y = 0.65;

		//resize sprite hitbox setSize(width, height, offsetX, offsetY)
		// this.plant.body.setSize(25,90,50,15);

		//start physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.camera.follow(this.plant);

		game.world.bringToTop(this.plant); 
		game.physics.arcade.checkCollision.right = false;
		game.physics.arcade.checkCollision.bottom = false;

		// this.timer = game.time.events.loop(1500, this.addPlatforms, this);
    
		//show controls
    	previewLabel = game.add.text(game.world.centerX+25, game.world.centerY-100, '『sun flower』', {font: '24px Roboto', fill: '#151515'});
		previewLabel.anchor.setTo(0.5, 0.5);

		//fade controls
    	game.time.events.add(3000, function() {
    	    game.add.tween(previewLabel).to({y: 0}, 500, Phaser.Easing.Linear.None, true);    
    	    game.add.tween(previewLabel).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
    	}, this);
    },
 	
 	update: function() {
 		this.bkg.tilePosition.x -= 1;
    	// this.plant.animations.play('grow');
    	this.plant.animations.play('grow');
		
    },
};

var game = new Phaser.Game(1300, 400, Phaser.AUTO, 'game');
// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state to actually start the game
game.state.start('main');