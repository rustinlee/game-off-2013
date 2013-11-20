function initLevel() {
//	$.getJSON("level1/levels/level1.json", function(level1){
		background = level1.background;
		for (var i = background.length - 1; i >= 0; i--) {
			var container = new createjs.Container();
			var imageID = background[i];
			var image = new createjs.Bitmap(queue.getResult(imageID));
			if(i != background.length -1){
				image.regY = image.image.height;
				image.y = CANVAS_HEIGHT;
			}

			var numNeeded = Math.ceil(CANVAS_WIDTH/image.image.width) + 2;

			for (var ii = 0; ii < numNeeded; ii++) {
				var imageToAdd = image.clone();
				imageToAdd.x = ii*imageToAdd.image.width;
				container.addChild(imageToAdd);
			};

			parallax.images.push(container);
		};

		for (var i = 0; i < parallax.images.length; i++) {
			stage.addChild(parallax.images[i]);
		};

		walls = level1.walls;
		for (var i = walls.length - 1; i >= 0; i--) {
			var container = new createjs.Container();
			for (var ii = walls[i].width - 1; ii >= 0; ii--) {
				var spriteToAdd = new createjs.Sprite(wallSprites);
				spriteToAdd.gotoAndStop(Math.floor(Math.random()*3));
				spriteToAdd.x = ii * 32;
				container.addChild(spriteToAdd);

				var spriteToAdd = new createjs.Sprite(wallSprites);
				spriteToAdd.gotoAndStop(Math.floor(Math.random()*5)+8);
				spriteToAdd.x = ii * 32;
				spriteToAdd.y = walls[i].height * 32;
				container.addChild(spriteToAdd);
			}
			for (var ii = walls[i].height - 1; ii >= 0; ii--) {
				var spriteToAdd = new createjs.Sprite(wallSprites);
				spriteToAdd.gotoAndStop(Math.floor(Math.random()*3));
				spriteToAdd.y = ii * 32;
				container.addChild(spriteToAdd);
			}		
			walls[i].sprite = container;
			walls[i] = new Wall(walls[i].width, walls[i].height, walls[i].x, walls[i].y, walls[i].sprite, walls[i].collision);
			world.addChild(walls[i].sprite);
		}
		creatures = level1.enemies;
		for (var i = creatures.length - 1; i >= 0; i--) {
			//creatures[i] = new Creature(creatures[i].x, creatures[i].y, creatures[i].maxHP, basicSprite);
			//world.addChild(creatures[i].sprite);
			creatures[i] = createEnemy(creatures[i].x, creatures[i].y, creatures[i].facing, creatures[i].type);
			world.addChild(creatures[i].sprite);
		}

		player = new PlayerClass(level1.startPosition.x, level1.startPosition.y, 100, playerSprite);

		player.checkpointX = player.x = level1.startPosition.x;
		player.checkpointY = player.y = level1.startPosition.y;

		world.addChild(player.sprite);

		var tmp;
		pitThreshold = Number.NEGATIVE_INFINITY;
		for (var i = walls.length - 1; i >= 0; i--) {
			tmp = walls[i].y;
			if (tmp > pitThreshold) pitThreshold = tmp;
		}
		pitThreshold += 500; //threshold after which to consider the player to have fallen into a pit
//	});
}