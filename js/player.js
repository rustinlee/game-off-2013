function PlayerClass(x, y, maxHP, sprite) {
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.sprite = sprite;
	if(sprite !== null && sprite !== undefined){
		this.width = this.sprite.spriteSheet._frameWidth;
		this.height = this.sprite.spriteSheet._frameHeight;
	} else {
		this.width = 0;
		this.height = 0;
	}
	this.maxHP = maxHP;
	this.HP = this.maxHP;
	this.facing = 5; //numpad notation: 4 = left, 6 = right, 8 = up, 2 = down
	this.runSpeed = 6;
	this.isJumping = false;
	this.jumpHeight = 18;
	this.firePower = 3;
	this.fireDelay = 30;
	this.sinceFired = this.fireDelay;
	this.alive = true;
	this.collided = false;
	this.collisionNormal = [0.0,0.0];
	this.groundRect = {
		x: this.x+1,
		y: this.y + this.height,
		width: this.width-2,
		height: 1
	};
	this.onGround = true;	
	this.die = function() {
		this.x = this.checkpointX;
		this.y = this.checkpointY;
		this.xv = 0;
		this.yv = 0;

		this.alive = true;
		this.HP = this.maxHP;
		//more consequences for death soon
	};
	this.fire = function() { //projectiles need to be centered completely
		if(this.sinceFired >= this.fireDelay){
			var radx = (currentMousePos.x - world.x) - (this.x+this.width/2);
			var rady = ((currentMousePos.y - world.y) - (this.y+this.height/2))*-1;
			var angle = Math.atan(rady/radx)/(Math.PI/180);
			if (radx <0) {
				angle += 180;
			}
			angle = angle*-1;	
			projectiles.push(new Projectile(this.x + this.width/2, this.y + this.height/2, Math.cos(angle*Math.PI/180)*this.firePower, Math.sin(angle*Math.PI/180)*this.firePower, this.projectileSprite, true));
			world.addChild(projectiles[projectiles.length-1].sprite);
			this.sinceFired = 0;
		}
	};
}

PlayerClass.prototype = new Creature();

var player = new PlayerClass(null, null, 100);