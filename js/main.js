setInterval(function() {
	step();
	draw();
}, 1000/60);

var gravity = 2;
var friction = 1;

var pitThreshold = Number.POSITIVE_INFINITY;

initLevel();

function step() {
	handleKeys();
	handleMouse();

	player.step();

	for (var i = projectiles.length - 1; i >= 0; i--) {
		projectiles[i].step();
	};

	projectiles = projectiles.filter(function(projectile) {
		return projectile.alive;
	});

	for (var i = creatures.length - 1; i >= 0; i--) {
		creatures[i].AI();
		creatures[i].step();
	};

	creatures = creatures.filter(function(creature) {
		return creature.alive;
	});
}

