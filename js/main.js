var gravity = 1;
var friction = 1;

var pitThreshold = Number.POSITIVE_INFINITY;

function init() {
	initConfigs();

	world = new createjs.Container();

	initLevel(level1);

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
	player.configs[player.currentConfig].step();

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

	playerSheet = new createjs.SpriteSheet({
		images:[queue.getResult("playerSheet")],
		frames:{width:32,height:48},
		animations: {idle:[0], run:[1,12,true,0.2]}
	});

	playerSprite = new createjs.Sprite(playerSheet, "idle");

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

	throwing1 = new createjs.SpriteSheet({images:[queue.getResult("throwing1")],frames:{width:8,height:8,regY:4}});
	throwing2 = new createjs.SpriteSheet({images:[queue.getResult("throwing2")],frames:{width:16,height:16,regY:4}});
	throwing3 = new createjs.SpriteSheet({images:[queue.getResult("throwing3")],frames:{width:16,height:16,regY:8}});
	throwing4 = new createjs.SpriteSheet({images:[queue.getResult("throwing4")],frames:{width:32,height:16,regY:8}});
	throwing5 = new createjs.SpriteSheet({images:[queue.getResult("throwing5")],frames:{width:16,height:16,regX:8,regY:8}});
	throwing6 = new createjs.SpriteSheet({images:[queue.getResult("throwing6")],frames:{width:16,height:16,regX:8,regY:8}});

	fistSheet = new createjs.SpriteSheet({images:[queue.getResult("fistSheet")],frames:{width:18,height:13,regY:3}});
	fistSprite = new createjs.Sprite(fistSheet);

	kiSheet = new createjs.SpriteSheet({images:[queue.getResult("kiSheet")],frames:{width:20,height:36,regY:36}})

	defaultProjectile = new createjs.SpriteSheet({images:[queue.getResult("defaultProjectile")],frames:{width:8,height:8,regY:4}})

	turretSheet = new createjs.SpriteSheet({images:[queue.getResult("turretSprite")],frames:[[0,0,20,14,0,10,11],[20,0,4,17,0,2,17]]});

	xpBarSprite = new createjs.Bitmap(queue.getResult("xpBar"));
	hpBarSprite = new createjs.Bitmap(queue.getResult("hpBar"));
	boostBarSprite = new createjs.Bitmap(queue.getResult("boostBar"));

	HUDSprite = new createjs.Bitmap(queue.getResult("HUD"));

	init();
}

var queue = new createjs.LoadQueue();
$.getJSON("data/manifest.json", function(data){
	queue.loadManifest(data);
});
queue.addEventListener("complete", handleComplete);