function initConfigs(){
	throwingWeaponConfig = {
		curEXP: 0,
		EXPtoNext: 100,
		projectileSpriteSheet: throwing1,
		damage: 5,
		firePower: 2,
		fireDelay: 30,
		fire: function() {
			if(player.sinceFired >= this.fireDelay){
				var radx = (currentMousePos.x - world.x) - (player.x+player.width/2);
				var rady = ((currentMousePos.y - world.y) - (player.y+player.height/2))*-1;
				var angle = Math.atan(rady/radx)/(Math.PI/180);
				if (radx <0) {
					angle += 180;
				}
				angle = angle*-1;	
				projectiles.push(new Projectile(player.x + player.width/2, player.y + player.height/2, Math.cos(angle*Math.PI/180)*this.firePower, Math.sin(angle*Math.PI/180)*this.firePower, this.projectileSpriteSheet, this.damage, true));
				world.addChild(projectiles[projectiles.length-1].sprite);
				player.sinceFired = 0;
			}
		}
	}
}

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

	this.currentConfig = 1;
	var configs = {
		1: throwingWeaponConfig
	}
	this.die = function() {
		this.x = this.checkpointX;
		this.y = this.checkpointY;
		this.xv = 0;
		this.yv = 0;

		this.alive = true;
		this.HP = this.maxHP;
		//more consequences for death soon
	};
	this.fire = function() {
		configs[this.currentConfig].fire();
	};
}

PlayerClass.prototype = new Creature();