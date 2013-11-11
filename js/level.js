function initLevel() {
	$.getJSON("data/levels/level1.json", function(data){
		walls = data.walls;
		for (var i = walls.length - 1; i >= 0; i--) {
			walls[i] = new wall(walls[i].width, walls[i].height, walls[i].x, walls[i].y, walls[i].color, walls[i].collision);
		};
		creatures = data.enemies;
		for (var i = creatures.length - 1; i >= 0; i--) {
			creatures[i] = new creature(creatures[i].x, creatures[i].y, creatures[i].width, creatures[i].height, creatures[i].color, creatures[i].maxHP);
		};
		player.checkpointX = player.x = data.startPosition.x;
		player.checkpointY = player.y = data.startPosition.y;

		var tmp;
		pitThreshold = Number.NEGATIVE_INFINITY;
		for (var i = walls.length - 1; i >= 0; i--) {
			tmp = walls[i].y;
			if (tmp > pitThreshold) pitThreshold = tmp;
		};
		pitThreshold += 500; //threshold after which to consider the player to have fallen into a pit
	});
}