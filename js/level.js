function initLevel() {
	$.getJSON("data/levels/level1.json", function(data){
		walls = data.walls;
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
			};
			for (var ii = walls[i].height - 1; ii >= 0; ii--) {
				var spriteToAdd = new createjs.Sprite(wallSprites);
				spriteToAdd.gotoAndStop(Math.floor(Math.random()*3));
				spriteToAdd.y = ii * 32;
				container.addChild(spriteToAdd);
			};			
			walls[i].sprite = container;
			walls[i] = new wall(walls[i].width, walls[i].height, walls[i].x, walls[i].y, walls[i].sprite, walls[i].collision);
			world.addChild(walls[i].sprite);
		};
		creatures = data.enemies;
		for (var i = creatures.length - 1; i >= 0; i--) {
			creatures[i] = new creature(creatures[i].x, creatures[i].y, creatures[i].maxHP, basicSprite);
			world.addChild(creatures[i].sprite);
		};

		player = new playerClass(player.x, player.y, 100, playerSprite);

		player.checkpointX = player.x = data.startPosition.x;
		player.checkpointY = player.y = data.startPosition.y;

		world.addChild(player.sprite);

		var tmp;
		pitThreshold = Number.NEGATIVE_INFINITY;
		for (var i = walls.length - 1; i >= 0; i--) {
			tmp = walls[i].y;
			if (tmp > pitThreshold) pitThreshold = tmp;
		};
		pitThreshold += 500; //threshold after which to consider the player to have fallen into a pit
	});
}