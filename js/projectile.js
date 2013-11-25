function Projectile(x, y, xv, yv, spriteSheet, damage, friendly) {
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	if(spriteSheet !== null && spriteSheet !== undefined){
		this.sprite = new createjs.Sprite(spriteSheet);
	} else {
		this.sprite = new createjs.Sprite(defaultProjectile);
	}
	this.width = this.sprite.spriteSheet._frameWidth;
	this.height = this.sprite.spriteSheet._frameHeight;
	this.sprite.x = this.x;
	this.sprite.y = this.y;	
	//this.width = 4; //these should be defined by the object that's firing
	//this.height = 4; //
	this.friendly = friendly;
	this.damage = damage;
	this.penetrating = false;
	this.ttl = 300;
	this.alive = true;
	this.step = function() {
		this.x += this.xv;
		this.y += this.yv;

		this.sprite.x = this.x;
		this.sprite.y = this.y;

		this.sprite.rotation = Math.atan(this.yv/this.xv)/(Math.PI/180);
		if (this.xv < 0) {
			this.sprite.rotation += 180;
		}

		this.ttl -= 1;
		if(this.ttl <= 0) {
			this.alive = false;
		}

		for (var i = walls.length - 1; i >= 0; i--) {
			if(checkAABB(this,walls[i])){
				this.alive = false;
			}
		}

		if(this.friendly) {
			for (var i = creatures.length - 1; i >= 0; i--) {
				if(checkAABB(this,creatures[i])){
					creatures[i].HP -= this.damage;
					if(!this.penetrating) {
						this.alive = false;
					}
				}
			}
		} else {
			if(checkAABB(this,player)){
				player.HP -= this.damage;
				this.alive = false;
			}
		}
	};
}

Projectile.prototype = new Entity();

var projectiles = [];
