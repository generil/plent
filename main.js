var mainState = {
    preload: function() {
    	game.load.audio('music', 'assets/audio/Bag Raiders - Shooting Stars.mp3');
        game.load.spritesheet('q0', 'assets/q0.png', 196, 196, 8);
        game.load.spritesheet('q1', 'assets/q1.png', 196, 196, 4);
        game.load.spritesheet('q2', 'assets/q2.png', 196, 196, 4);
        game.load.spritesheet('q3', 'assets/q3.png', 196, 196, 8);
        game.load.spritesheet('q4', 'assets/q4.png', 196, 196, 10);
        game.load.spritesheet('q5', 'assets/q5.png', 196, 196, 8);
        game.load.spritesheet('q6', 'assets/q6.png', 196, 196, 8);
        game.load.spritesheet('q7', 'assets/q7.png', 196, 196, 8);
        game.load.spritesheet('q8', 'assets/q8.png', 196, 196, 4);
        game.load.spritesheet('q9', 'assets/q9.png', 196, 196, 8);
        game.load.spritesheet('q17', 'assets/q17.png', 196, 196, 1);

  		game.load.image('dock', 'assets/images/dock');
  		game.load.image('fert', 'assets/images/fertilizer-01.png');
  		game.load.image('sprinkler', 'assets/images/sprinkler-01.png');
  		game.load.image('drip', 'assets/images/drip-01.png');
  		game.load.image('shovel', 'assets/images/shovel-01.png');
  		game.load.image('warning', 'assets/images/infected-01.png');
  		game.load.image('severe', 'assets/images/severe-01.png');
  		game.load.image('seed_inv', 'assets/images/seed-inventory.png');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('grass', 'assets/bkgr-03.png');
    },

    create: function() {
    	sunflower_states = new Array(18);
    	init_states();
    	print_state();
    	
		isOccupied = [];
		allSprites = [];

		for(var i = 0; i < 10; i++) { //index 0 = 130, index 9 = 1300
			isOccupied.push(false);
		}

    	music = game.add.audio('music');
    	music.play();

    	this.bkg = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
    	this.bkgr3 = game.add.tileSprite(0, game.height-55, game.width, game.height/2, 'grass');
    	
    	plantList = [];

		dock_scale = 0.3;
    	fert_scale = 0.3;
    	sprinkler_scale = 0.3;
    	shovel_scale = 0.3;
    	seed_inv_scale = 0.3;

    	this.dock = game.add.sprite(0, 0, 'dock');
    	this.dock.scale.x = dock_scale;
    	this.dock.scale.y = dock_scale;

    	this.seed_inv = game.add.sprite(4, 2.5, 'seed_inv');
		this.seed_inv.scale.x = seed_inv_scale;
    	this.seed_inv.scale.y = seed_inv_scale;
    	this.seed_inv.startX = 4; 
    	this.seed_inv.endX = 66;  
    	this.seed_inv.startY = 2.5; 
    	this.seed_inv.endY = 65;


    	this.sprinkler = game.add.sprite(66, 2.5, 'sprinkler');
    	this.sprinkler.scale.x = sprinkler_scale;
    	this.sprinkler.scale.y = sprinkler_scale;
    	this.sprinkler.startX = 66;
    	this.sprinkler.endX = 127;
    	this.sprinkler.startY = 2.5;
    	this.sprinkler.endY = 65;
    	
    	this.shovel = game.add.sprite(128, 2.5, 'shovel');
    	this.shovel.scale.x = shovel_scale;
    	this.shovel.scale.y = shovel_scale;
    	this.shovel.startX = 128;
    	this.shovel.endX = 187;
    	this.shovel.startY = 2.5;
    	this.shovel.endY = 65;

    	this.fert = game.add.sprite(190, 2.5, 'fert');
    	this.fert.scale.x = fert_scale;
    	this.fert.scale.y = fert_scale;
    	this.fert.startX = 190;
    	this.fert.endX = 248;
    	this.fert.startY = 2.5;
    	this.fert.endY = 65;


    	game.physics.enable(this.fert, Phaser.Physics.ARCADE);
    	game.physics.enable(this.sprinkler, Phaser.Physics.ARCADE);
    	game.physics.enable(this.shovel, Phaser.Physics.ARCADE);
    	game.physics.enable(this.seed_inv, Phaser.Physics.ARCADE);

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.checkCollision.right = false;
		game.physics.arcade.checkCollision.bottom = false;

		// this.timer = game.time.events.loop(1500, this.addPlatforms, this);

    	previewLabel = game.add.text(game.world.centerX+25, game.world.centerY-100, '『sun flower』', {font: '24px Roboto', fill: '#151515'});
		previewLabel.anchor.setTo(0.5, 0.5)

    	game.time.events.add(5000, function() {
    	    game.add.tween(previewLabel).to({y: 0}, 500, Phaser.Easing.Linear.None, true);
    	    game.add.tween(previewLabel).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
    	}, this);
    	

 		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
    },

 	update: function() {
 		// console.log("timer: " + game.time.elapsed);
 		this.bkg.tilePosition.x -= 0.25;
 		
 		if(game.input.activePointer.isDown) 
 		{
	        console.log(game.input.mousePointer.x + " ; " + game.input.mousePointer.y)

			//  Input Enable the sprites
		    this.fert.inputEnabled = true;
		    this.sprinkler.inputEnabled = true;
		    this.shovel.inputEnabled = true;
		    this.seed_inv.inputEnabled = true;


		    this.fert.events.onInputUp.add(this.onUpFert, this);
		    this.sprinkler.events.onInputUp.add(this.onUpSprinkler, this);
		    this.shovel.events.onInputUp.add(this.onUpShovel, this);
		    this.seed_inv.events.onInputUp.add(this.onUpSeedInv, this);

		    //  Allow dragging - the 'true' parameter will make the sprite snap to the center
		    
		    this.fert.input.enableDrag(true);
		    this.sprinkler.input.enableDrag(true);
		    this.shovel.input.enableDrag(true);
		    this.seed_inv.input.enableDrag(true);
		    
			this.fert.inputEnabled = true;
		    this.sprinkler.inputEnabled = true;
		    this.shovel.inputEnabled = true;
		    this.seed_inv.inputEnabled = true;
    	}
    },

    onUpFert: function() {
    	this.fert.x = this.fert.startX;
    	this.fert.y = this.fert.startY;
    	
    	for(var i = 0; i < 10; i++) {
    		xcoord = (i + 1) * 130; 
    		if((game.input.mousePointer.x < xcoord) && plantList && plantList[i]) {
    			index = i;
    			console.log("index: " + index + "  game.input.mousePointer.x: " + game.input.mousePointer.x);
    			plantList[index].hasFertilizer = true;
    			break;
    		}
    		// console.log(game.input.mousePointer.x + " < " + xcoord + "	" + "plant_at_x: " + plant_at_x + " " + isOccupied[i])
    	}
    },

	onUpSprinkler: function () {
    	this.sprinkler.x = this.sprinkler.startX;
    	this.sprinkler.y = this.sprinkler.startY;

    	for(var i = 0; i < 10; i++) {
    		xcoord = (i + 1) * 130; 
    		if((game.input.mousePointer.x < xcoord) && plantList && plantList[i]) {
    			index = i;
    			console.log("index: " + index + "  game.input.mousePointer.x: " + game.input.mousePointer.x);
    			plantList[index].isWatered = true;
    			break;
    		}
    		// console.log(game.input.mousePointer.x + " < " + xcoord + "	" + "plant_at_x: " + plant_at_x + " " + isOccupied[i])
    	}

    },

    onUpShovel: function () {
    	this.shovel.x = this.shovel.startX;
    	this.shovel.y = this.shovel.startY;
    	

    	for(var i = 0; i < 10; i++) {
    		xcoord = (i + 1) * 130; 
    		if((game.input.mousePointer.x < xcoord) && plantList && plantList[i]) {
    			index = i;
    			console.log("index: " + index + "  game.input.mousePointer.x: " + game.input.mousePointer.x);
    			plantList[index].isWatered = true;
    			allSprites[i].destroy();
    			isOccupied[i] = false;
    			delete plantList[i];
    			break;
    		}
    		// console.log(game.input.mousePointer.x + " < " + xcoord + "	" + "plant_at_x: " + plant_at_x + " " + isOccupied[i])
    	}
    },

    onUpSeedInv: function () {
    	this.seed_inv.x = this.seed_inv.startX;
    	this.seed_inv.y = this.seed_inv.startY;

    	plant_at_x = 0;

    	for(var i = 0; i < 10; i++) {
    		xcoord = (i + 1) * 130; 
    		if( (game.input.mousePointer.x < xcoord) && (!isOccupied[i])) {
    			plant_at_x = (i*2) * 65;
    			isOccupied[i] = true;
    			plantList.push(new Sunflower(0, false, false, plant_at_x));
    			this.sprite = game.add.sprite(plant_at_x, 165, 'q0');
				game.physics.enable(this.sprite);
				this.sprite.collideWorldBounds = true;
				allSprites.push(this.sprite);
				this.sprite.animations.add('q0', [0, 1, 2, 3, 4, 5, 6, 7], 8,true);
				this.sprite.play('q0');
		    	console.log(this.seed_inv.x + " ; " + this.seed_inv.startX)
    			break;
    		}
    		console.log(game.input.mousePointer.x + " < " + xcoord + "	" + "plant_at_x: " + plant_at_x + " " + isOccupied[i])
    	}

    	console.log(plantList[0] + " length: " + plantList.length);	

    	if(plantList.length == 1) {
    		this.timer = game.time.events.loop(5000, this.showThirsty, this);
 			this.update = game.time.events.loop(12000, this.updateStates, this);
    	}
    },

    showThirsty: function() {
    	waterLabel = game.add.text(game.world.centerX+25, game.world.centerY-100, '『Sunflowers need water!』', {font: '24px Roboto', fill: '#151515'});
		waterLabel.anchor.setTo(0.5, 0.5);

 		game.time.events.add(2000, function() {
    	    game.add.tween(waterLabel).to({y: 0}, 500, Phaser.Easing.Linear.None, true);
    	    game.add.tween(waterLabel).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
    	}, this);
    },

    updateStates: function() {
    	for(var i = 0; i < plantList.length; i++) {
    		if(plantList[i]) {
    			watered = plantList[i].isWatered ? 1:0
	    		plantList[i].state = sunflower_states[plantList[i].state][input_token(0, watered, 0, 0)]
	    		plantList[i].isWatered = 0;	
    		}
    	}

    	for(var i = 0; i< allSprites.length; i++) {
    		allSprites[i].destroy();
    	}

    	for(var i = 0; i < plantList.length; i++) {

    		if(plantList[i]) {

	    		this.sprite = game.add.sprite(plantList[i].xLocation, 165, this.get_sprite(plantList[i].state));
				game.physics.enable(this.sprite);
				this.sprite.collideWorldBounds = true;
				allSprites.push(this.sprite);
				
				if(plantList[i].state == 1 || plantList[i].state == 2) {
					this.sprite.animations.add('q1', [0, 1, 2, 3], 8, true);
					this.sprite.play('q1');
				}
				else if(plantList[i].state == 8) {
					this.sprite.animations.add('q8', [0, 1, 2, 3], 5, true);
					this.sprite.play('q8');
				}
				else if(plantList[i].state == 9) {
					this.sprite.animations.add('q9', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
					this.sprite.play('q9');
				}
				else if(plantList[i].state == 4) {
					this.sprite.animations.add('q4', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
					this.sprite.play('q4');
				}
				else if(plantList[i].state == 17) {
					this.sprite.animations.add('q17', [0], 8, true);	
					this.sprite.play('q17');
				}
				else if(plantList[i].state == 10 ) {
					this.sprite.animations.add('q0', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
					this.sprite.play('q0');

		    		this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);
				}
				else if(plantList[i].state == 11 ) {
					this.sprite.animations.add('q1', [0, 1, 2, 3], 8, true);
					this.sprite.play('q1');

					this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);
				}
				else if(plantList[i].state == 12 ) {
					this.sprite.animations.add('q2', [0, 1, 2, 3], 8, true);
					this.sprite.play('q2');

					this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);
				}
				else if(plantList[i].state == 13 ) {
					this.sprite.animations.add('q3', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
					this.sprite.play('q3');

					this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);

				}else if(plantList[i].state == 14 ) {
					this.sprite.animations.add('q4', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
					this.sprite.play('q4');

					this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);

				}else if(plantList[i].state == 15 ) {
					this.sprite.animations.add('q5', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
					this.sprite.play('q5');

					this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);

				}else if(plantList[i].state == 16 ) {
					this.sprite.animations.add('q6', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
					this.sprite.play('q6');

					this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);

				}
				else {
					this.sprite.animations.add('q0', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
					this.sprite.play('q0');

					this.warning = game.add.sprite(plantList[i].xLocation, 365, 'warning');
					game.physics.enable(this.warning);
					allSprites.push(this.warning);

				}
			}
		}
    },

    get_sprite: function(state){
		switch(state) {
	    case 0:
	        return "q0";
	    case 1:
	        return "q1";
	    case 2:
	        return "q2";
	    case 3:
	        return "q3";
	    case 4:
	        return "q4";
	    case 5:
	        return "q5";
	    case 6:
	        return "q6";
	    case 7:
	        return "q7";
	    case 8:
	        return "q8";
	    case 9:
	        return "q9";
	    case 10:
	    	return "q0";
	    case 11:
	    	return "q1";
		case 12:
	    	return "q2";
	    case 13:
	    	return "q3";
	    case 14:
	    	return "q4";
	    case 15:
	    	return "q5";
	    case 16:
	    	return "q6";
	    case 17:
	        return "q17";
	    default:
	        return "q0";
		}
	},

	randomizer: function() {
		return Math.floor(Math.random() * 2);
	}
};

var game = new Phaser.Game(1300, 400, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');

class Sunflower{
    constructor(state, isWatered, hasFertilizer, xLocation) {
        this.state = state;
        this.isWatered = isWatered;
        this.hasFertilizer = hasFertilizer;
        this.xLocation = xLocation;
    }
}

// init_states();
// print_state();


function init_states(){
    
    for (var i = 0; i < 18; i++) {
      sunflower_states[i] = new Array(16);
    }
    for(var i = 0; i < 18; i++){
        for(var j = 0; j < 16; j++){
            sunflower_states[i][j] = 0;
        }
    }
    sunflower_states[0][0]  = 17;
    sunflower_states[0][1]  = 17;
    sunflower_states[0][2]  = 1; //fert
    sunflower_states[0][3]  = 10;
    sunflower_states[0][4]  = 1;
    sunflower_states[0][5]  = 10;
    sunflower_states[0][6]  = 1; //fert
    sunflower_states[0][7]  = 10;
    sunflower_states[0][8]  = 1;
    sunflower_states[0][9]  = 10;
    sunflower_states[0][10] = 1; //fert
    sunflower_states[0][11] = 10;
    sunflower_states[0][12] = 11;
    sunflower_states[0][13] = 10;
    sunflower_states[0][14] = 1; //fert
    sunflower_states[0][15] = 10;
    
    sunflower_states[1][0]  = 17;
    sunflower_states[1][1]  = 17;
    sunflower_states[1][2]  = 2;
    sunflower_states[1][3]  = 11;
    sunflower_states[1][4]  = 2;
    sunflower_states[1][5]  = 11;
    sunflower_states[1][6]  = 2;
    sunflower_states[1][7]  = 11;
    sunflower_states[1][8]  = 2;
    sunflower_states[1][9]  = 11;
    sunflower_states[1][10] = 2;
    sunflower_states[1][11] = 11;
    sunflower_states[1][12] = 2;
    sunflower_states[1][13] = 11;
    sunflower_states[1][14] = 2;
    sunflower_states[1][15] = 11;
    
    sunflower_states[2][0]  = 17;
    sunflower_states[2][1]  = 17;
    sunflower_states[2][2]  = 3;
    sunflower_states[2][3]  = 12;
    sunflower_states[2][4]  = 3;
    sunflower_states[2][5]  = 12;
    sunflower_states[2][6]  = 3;
    sunflower_states[2][7]  = 12;
    sunflower_states[2][8]  = 3;
    sunflower_states[2][9]  = 12;
    sunflower_states[2][10] = 3;
    sunflower_states[2][11] = 12;
    sunflower_states[2][12] = 3;
    sunflower_states[2][13] = 12;
    sunflower_states[2][14] = 3;
    sunflower_states[2][15] = 12;
    
    sunflower_states[3][0]  = 17;
    sunflower_states[3][1]  = 17;
    sunflower_states[3][2]  = 4;
    sunflower_states[3][3]  = 13;
    sunflower_states[3][4]  = 4;
    sunflower_states[3][5]  = 13;
    sunflower_states[3][6]  = 4;
    sunflower_states[3][7]  = 13;
    sunflower_states[3][8]  = 4;
    sunflower_states[3][9]  = 13;
    sunflower_states[3][10] = 4;
    sunflower_states[3][11] = 13;
    sunflower_states[3][12] = 4;
    sunflower_states[3][13] = 13;
    sunflower_states[3][14] = 4;
    sunflower_states[3][15] = 13;
    
    sunflower_states[4][0]  = 4;
    sunflower_states[4][1]  = 14;
    sunflower_states[4][2]  = 5;
    sunflower_states[4][3]  = 14;
    sunflower_states[4][4]  = 5;
    sunflower_states[4][5]  = 14;
    sunflower_states[4][6]  = 5;
    sunflower_states[4][7]  = 14;
    sunflower_states[4][8]  = 5;
    sunflower_states[4][9]  = 14;
    sunflower_states[4][10] = 5;
    sunflower_states[4][11] = 14;
    sunflower_states[4][12] = 5;
    sunflower_states[4][13] = 14;
    sunflower_states[4][14] = 5;
    sunflower_states[4][15] = 14;
    
    sunflower_states[5][0]  = 5;
    sunflower_states[5][1]  = 15;
    sunflower_states[5][2]  = 6;
    sunflower_states[5][3]  = 15;
    sunflower_states[5][4]  = 6;
    sunflower_states[5][5]  = 15;
    sunflower_states[5][6]  = 6;
    sunflower_states[5][7]  = 15;
    sunflower_states[5][8]  = 6;
    sunflower_states[5][9]  = 15;
    sunflower_states[5][10] = 6;
    sunflower_states[5][11] = 15;
    sunflower_states[5][12] = 6;
    sunflower_states[5][13] = 15;
    sunflower_states[5][14] = 6;
    sunflower_states[5][15] = 15;
    
    sunflower_states[6][0]  = 6;
    sunflower_states[6][1]  = 16;
    sunflower_states[6][2]  = 7;
    sunflower_states[6][3]  = 16;
    sunflower_states[6][4]  = 7;
    sunflower_states[6][5]  = 16;
    sunflower_states[6][6]  = 7;
    sunflower_states[6][7]  = 16;
    sunflower_states[6][8]  = 7;
    sunflower_states[6][9]  = 16;
    sunflower_states[6][10] = 7;
    sunflower_states[6][11] = 16;
    sunflower_states[6][12] = 7;
    sunflower_states[6][13] = 16;
    sunflower_states[6][14] = 7;
    sunflower_states[6][15] = 16;
    
    sunflower_states[7][0]  = 8;
    sunflower_states[7][1]  = 17;
    sunflower_states[7][2]  = 8;
    sunflower_states[7][3]  = 17;
    sunflower_states[7][4]  = 8;
    sunflower_states[7][5]  = 17;
    sunflower_states[7][6]  = 8;
    sunflower_states[7][7]  = 17;
    sunflower_states[7][8]  = 8;
    sunflower_states[7][9]  = 17;
    sunflower_states[7][10] = 8;
    sunflower_states[7][11] = 17;
    sunflower_states[7][12] = 8;
    sunflower_states[7][13] = 17;
    sunflower_states[7][14] = 8;
    sunflower_states[7][15] = 17;
    
    sunflower_states[8][0]  = 9;
    sunflower_states[8][1]  = 9;
    sunflower_states[8][2]  = 9;
    sunflower_states[8][3]  = 9;
    sunflower_states[8][4]  = 9;
    sunflower_states[8][5]  = 9;
    sunflower_states[8][6]  = 9;
    sunflower_states[8][7]  = 9;
    sunflower_states[8][8]  = 9;
    sunflower_states[8][9]  = 9;
    sunflower_states[8][10] = 9;
    sunflower_states[8][11] = 9;
    sunflower_states[8][12] = 9;
    sunflower_states[8][13] = 9;
    sunflower_states[8][14] = 9;
    sunflower_states[8][15] = 9;
    
    sunflower_states[9][0]  = 9;
    sunflower_states[9][1]  = 9;
    sunflower_states[9][2]  = 9;
    sunflower_states[9][3]  = 9;
    sunflower_states[9][4]  = 9;
    sunflower_states[9][5]  = 9;
    sunflower_states[9][6]  = 9;
    sunflower_states[9][7]  = 9;
    sunflower_states[9][8]  = 9;
    sunflower_states[9][9]  = 9;
    sunflower_states[9][10] = 9;
    sunflower_states[9][11] = 9;
    sunflower_states[9][12] = 9;
    sunflower_states[9][13] = 9;
    sunflower_states[9][14] = 9;
    sunflower_states[9][15] = 9;
    
    sunflower_states[10][0]  = 17;
    sunflower_states[10][1]  = 17;
    sunflower_states[10][2]  = 1;
    sunflower_states[10][3]  = 17;
    sunflower_states[10][4]  = 1;
    sunflower_states[10][5]  = 17;
    sunflower_states[10][6]  = 1;
    sunflower_states[10][7]  = 17;
    sunflower_states[10][8]  = 1;
    sunflower_states[10][9]  = 17;
    sunflower_states[10][10] = 1;
    sunflower_states[10][11] = 17;
    sunflower_states[10][12] = 1;
    sunflower_states[10][13] = 17;
    sunflower_states[10][14] = 1;
    sunflower_states[10][15] = 17;
    
    sunflower_states[11][0]  = 17;
    sunflower_states[11][1]  = 17;
    sunflower_states[11][2]  = 2;
    sunflower_states[11][3]  = 17;
    sunflower_states[11][4]  = 2;
    sunflower_states[11][5]  = 17;
    sunflower_states[11][6]  = 2;
    sunflower_states[11][7]  = 17;
    sunflower_states[11][8]  = 2;
    sunflower_states[11][9]  = 17;
    sunflower_states[11][10] = 2;
    sunflower_states[11][11] = 17;
    sunflower_states[11][12] = 2;
    sunflower_states[11][13] = 17;
    sunflower_states[11][14] = 2;
    sunflower_states[11][15] = 17;
    
    sunflower_states[12][0]  = 17;
    sunflower_states[12][1]  = 17;
    sunflower_states[12][2]  = 3;
    sunflower_states[12][3]  = 17;
    sunflower_states[12][4]  = 3;
    sunflower_states[12][5]  = 17;
    sunflower_states[12][6]  = 3;
    sunflower_states[12][7]  = 17;
    sunflower_states[12][8]  = 3;
    sunflower_states[12][9]  = 17;
    sunflower_states[12][10] = 3;
    sunflower_states[12][11] = 17;
    sunflower_states[12][12] = 3;
    sunflower_states[12][13] = 17;
    sunflower_states[12][14] = 3;
    sunflower_states[12][15] = 17;
    
    sunflower_states[13][0]  = 17;
    sunflower_states[13][1]  = 17;
    sunflower_states[13][2]  = 4;
    sunflower_states[13][3]  = 17;
    sunflower_states[13][4]  = 4;
    sunflower_states[13][5]  = 17;
    sunflower_states[13][6]  = 4;
    sunflower_states[13][7]  = 17;
    sunflower_states[13][8]  = 4;
    sunflower_states[13][9]  = 17;
    sunflower_states[13][10] = 4;
    sunflower_states[13][11] = 17;
    sunflower_states[13][12] = 4;
    sunflower_states[13][13] = 17;
    sunflower_states[13][14] = 4;
    sunflower_states[13][15] = 17;
    
    sunflower_states[14][0]  = 17;
    sunflower_states[14][1]  = 17;
    sunflower_states[14][2]  = 5;
    sunflower_states[14][3]  = 17;
    sunflower_states[14][4]  = 5;
    sunflower_states[14][5]  = 17;
    sunflower_states[14][6]  = 5;
    sunflower_states[14][7]  = 17;
    sunflower_states[14][8]  = 5;
    sunflower_states[14][9]  = 17;
    sunflower_states[14][10]  = 5;
    sunflower_states[14][11] = 17;
    sunflower_states[14][12] = 5;
    sunflower_states[14][13] = 17;
    sunflower_states[14][14] = 5;
    sunflower_states[14][15] = 17;
    
    sunflower_states[15][0]  = 17;
    sunflower_states[15][1]  = 17;
    sunflower_states[15][2]  = 6;
    sunflower_states[15][3]  = 17;
    sunflower_states[15][4]  = 6;
    sunflower_states[15][5]  = 17;
    sunflower_states[15][6]  = 6;
    sunflower_states[15][7]  = 17;
    sunflower_states[15][8]  = 6;
    sunflower_states[15][9]  = 17;
    sunflower_states[15][10]  = 6;
    sunflower_states[15][11] = 17;
    sunflower_states[15][12] = 6;
    sunflower_states[15][13] = 17;
    sunflower_states[15][14] = 6;
    sunflower_states[15][15] = 17;
    
    sunflower_states[16][0]  = 17;
    sunflower_states[16][1]  = 17;
    sunflower_states[16][2]  = 7;
    sunflower_states[16][3]  = 17;
    sunflower_states[16][4]  = 7;
    sunflower_states[16][5]  = 17;
    sunflower_states[16][6]  = 7;
    sunflower_states[16][7]  = 17;
    sunflower_states[16][8]  = 7;
    sunflower_states[16][9]  = 17;
    sunflower_states[16][10]  = 7;
    sunflower_states[16][11] = 17;
    sunflower_states[16][12] = 7;
    sunflower_states[16][13] = 17;
    sunflower_states[16][14] = 7;
    sunflower_states[16][15] = 17;

    sunflower_states[17][0]  = 17;
    sunflower_states[17][1]  = 17;
    sunflower_states[17][2]  = 17;
    sunflower_states[17][3]  = 17;
    sunflower_states[17][4]  = 17;
    sunflower_states[17][5]  = 17;
    sunflower_states[17][6]  = 17;
    sunflower_states[17][7]  = 17;
    sunflower_states[17][8]  = 17;
    sunflower_states[17][9]  = 17;
    sunflower_states[17][10]  = 17;
    sunflower_states[17][11] = 17;
    sunflower_states[17][12] = 17;
    sunflower_states[17][13] = 17;
    sunflower_states[17][14] = 17;
    sunflower_states[17][15] = 17;
}

function print_state(){
    
    for(var i = 0; i < 18; i++){
        var states = "";
        for(var j = 0; j < 16; j++){
            this.states = states.concat(sunflower_states[i][j]).concat(" ");  
        }
        console.log(states);
    }
}

function input_token(se,wa,fe,ab){
    if(se===0 && wa===0 && fe===0 && ab===0){
        return 0;
    }
    if(se===0 && wa===0 && fe===0 && ab===1){
        return 1;
    }
    if(se===0 && wa===0 && fe===1 && ab===0){
        return 2;
    }
    if(se===0 && wa===0 && fe===1 && ab===1){
        return 3;
    }
    if(se===0 && wa===1 && fe===0 && ab===0){
        return 4;
    }
    if(se===0 && wa===1 && fe===0 && ab===1){
        return 5;
    }
    if(se===0 && wa===1 && fe===1 && ab===0){
        return 6;
    }
    if(se===0 && wa===1 && fe===1 && ab===1){
        return 7;
    }
    if(se===1 && wa===0 && fe===0 && ab===0){
        return 8;
    }
    if(se===1 && wa===0 && fe===0 && ab===1){
        return 9;
    }
    if(se===1 && wa===0 && fe===1 && ab===0){
        return 10;
    }
    if(se===1 && wa===0 && fe===1 && ab===1){
        return 11;
    }
    if(se===1 && wa==1 && fe===0 && ab===0){
        return 12;
    }
    if(se==1 && wa==1 && fe==0 && ab==1){
        return 13;
    }
    if(se==1 && wa==1 && fe==1 && ab==0){
        return 14;
    }
    if(se==1 && wa==1 && fe==1 && ab==1){
        return 15;
    }   
}