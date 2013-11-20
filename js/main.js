var gravity = 1;
var friction = 1;

var pitThreshold = Number.POSITIVE_INFINITY;

function init() {
	world = new createjs.Container();

	initLevel();

	stage.addChild(world);

	hud = new HeadsUpDisplay();
	hud.init();	

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
	}

	projectiles = projectiles.filter(function(projectile) {
		return projectile.alive;
	});

	for (var i = creatures.length - 1; i >= 0; i--) {
		creatures[i].AI();
		creatures[i].step();
	}

	creatures = creatures.filter(function(creature) {
		return creature.alive;
	});

	hud.step();
}

function handleComplete() {
	level1 = queue.getResult("level1");

	playerSheet = new createjs.SpriteSheet({images:[queue.getResult("playerSprite")],frames:{width:15,height:46}});
	playerSprite = new createjs.Sprite(playerSheet);

	walkerBaseSheet = new createjs.SpriteSheet({
		images: [queue.getResult("walkerBase")],
		frames: {width:18, height:13},
		animations: {idle:[0], run:[1,6,true,0.2]}
	});
	walkerGunSheet = new createjs.SpriteSheet({
		images: [queue.getResult("walkerGun")],
		frames: {width:22, height:11, regX: 2, regY: 9},
		animations: {idle:[0], shoot:[0,6,"idle",0.2]}
	});
	walkerProjectileSheet = new createjs.SpriteSheet({
		images:[queue.getResult("walkerProjectile")],
		frames:{width:7,height:6, regY:3},
		animations: {flying:[0,4,true,0.2]}
	});

	tileSheet = queue.getResult("tileSheet");
	wallSprites = new createjs.SpriteSheet({images:[tileSheet],frames:{width:32,height:32}});

	projectileSheet = new createjs.SpriteSheet({images:[queue.getResult("throwing1")],frames:{width:8,height:8}});

	turretSheet = new createjs.SpriteSheet({images:[queue.getResult("turretSprite")],frames:[[0,0,20,14,0,10,11],[20,0,4,17,0,2,17]]});

	init();
}

var queue = new createjs.LoadQueue();
$.getJSON("data/manifest.json", function(data){
	queue.loadManifest(data);
});
queue.addEventListener("complete", handleComplete);