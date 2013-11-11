function projectile(x, y, xv, yv, friendly) {
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	this.width = 4; //these should be defined by the object that's firing
	this.height = 4; //
	this.color = "#00A";
	this.friendly = friendly;
	this.damage = 1;
	this.penetrating = false;
	this.ttl = 300;
	this.alive = true;
	this.step = function() {
		this.x += this.xv;
		this.y += this.yv;

		this.ttl -= 1;
		if(this.ttl <= 0) {
			this.alive = false;
		}

		for (var i = walls.length - 1; i >= 0; i--) {
			if(checkAABB(this,walls[i])){
				this.alive = false;
			}
		};

		if(this.friendly) {
			for (var i = creatures.length - 1; i >= 0; i--) {
				if(checkAABB(this,creatures[i])){
					creatures[i].HP -= this.damage;
					if(!this.penetrating) {
						this.alive = false;
					}
				}
			};
		} else {
			if(checkAABB(this,player)){
				player.HP -= this.damage;
				this.alive = false;
			}
		}
	};
}

projectile.prototype = new entity();

var projectiles = new Array();
