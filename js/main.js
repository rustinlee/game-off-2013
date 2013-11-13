var gravity = 2;
var friction = 1;

var pitThreshold = Number.POSITIVE_INFINITY;

function init() {
	world = new createjs.Container();

	initLevel();

	var shape = new createjs.Shape();
	shape.graphics.beginFill("#FFFFFF").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	stage.addChild(shape);

	stage.addChild(world);

	setInterval(function() {
		step();
		draw();
	}, 1000/60);
}

function step() {
	handleKeys();
	handleMouse();

	player.step();

	for (var i = projectiles.length - 1; i >= 0; i--) {
		projectiles[i].step();
		if(!projectiles[i].alive){
			world.removeChild(projectiles[i].sprite);
		}
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

function handleComplete() {
	playerSprite = new createjs.Bitmap(queue.getResult("playerSprite"));
	basicSprite = new createjs.Bitmap(queue.getResult("basicSprite"));
	tileSheet = queue.getResult("tileSheet");
	wallSprites = new createjs.SpriteSheet({images:[tileSheet],frames:{width:32,height:32}});
	projectileSheet = new createjs.SpriteSheet({images:[queue.getResult("throwing1")],frames:{width:16,height:16}});
	init();
}

var queue = new createjs.LoadQueue();
queue.addEventListener("complete", handleComplete);
$.getJSON("data/manifest.json", function(data){
	queue.loadManifest(data);
});