function Walker(x, y, facing){
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.facing = facing;
	this.sprite = new createjs.Container;
	this.base = new createjs.Sprite(walkerBaseSheet, "run");
	this.gun = new createjs.Sprite(walkerGunSheet, "idle");
	if(this.facing == 6){
		this.sprite.scaleX = -1;
	}	
	this.sprite.addChild(this.gun, this.base);
	this.width = this.base.spriteSheet._frameWidth;
	this.height = this.base.spriteSheet._frameHeight;
	this.sprite.x = this.x;
	this.sprite.y = this.y;
	this.maxHP = 10;
	this.HP = this.maxHP;
	this.runSpeed = 1;
	this.firePower = 3;
	this.fireDelay = 150;
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
	this.fire = function(){
		projectiles.push(new Projectile(this.x + this.width/2, this.y - this.gun.spriteSheet._frameHeight/2, this.firePower, 0, false));
		world.addChild(projectiles[projectiles.length-1].sprite);
	}
	this.AI = function(){
		if(facing == 4){
			this.xv -= 2;
			if(this.xv < -(this.runSpeed)){
				this.xv = -(this.runSpeed);
			}
			this.sprite.scaleX = 1;
			this.sprite.x = this.x;			
		} else if(facing == 6){
			this.xv += 2;
			if(this.xv > this.runSpeed){
				this.xv = this.runSpeed;
			}
			this.sprite.scaleX = -1;
			this.sprite.x = this.x + this.width;
		}

		if(this.sinceFired >= this.fireDelay){
			this.fire();
			this.sinceFired = 0;
		}		
	}
}

Walker.prototype = new Creature();

function Turret(){
	this.step = function(){
		if (this.HP <= 0) {
			this.alive = false; //mark for removal from array
			this.die(); //perform death function
		}

		this.sinceFired += 1;
	};
	this.die = function() {
		world.removeChild(this.sprite);
	};	
	this.fire = function(angle){
		if(this.sinceFired >= this.fireDelay){	
			projectiles.push(new Projectile((this.x + this.width/2 - 8)+20*Math.cos(angle*Math.PI/180), (this.y + this.height/2 - 8)+20*Math.sin(angle*Math.PI/180), Math.cos(angle*Math.PI/180)*this.firePower, Math.sin(angle*Math.PI/180)*this.firePower, false));
			world.addChild(projectiles[projectiles.length-1].sprite);
			this.sinceFired = 0;
		}
	};
	this.AI = function() {
		var radx = (player.x+player.width/2) - (this.x+this.width/2);
		var rady = ((player.y+player.height/2) - (this.y+this.height/2))*-1;
		var angle = Math.atan(rady/radx)/(Math.PI/180);
		if (radx <0) {
			angle += 180;
		}
		angle = angle*-1;
		if(angle >= -60 && angle <= 60) {
			this.fire(angle);
		} else if(angle < -60) {
			//angle = -60;
			angle = 0;
		} else if(angle > 60) {
			//angle = 60;
			angle = 0;
		}
		this.barrel.rotation = angle;
	};
}

Turret.prototype = new Entity();

function BulletTurret(x, y, facing){
	this.x = x;
	this.y = y;
	this.sprite = new createjs.Container();
	this.base = new createjs.Sprite(turretSheet, 0);
	this.base.stop();
	this.barrel = new createjs.Sprite(turretSheet, 1);
	this.barrel.stop();
	this.barrel.y = -3;
	this.sprite.addChild(this.barrel, this.base);	
	var cases = {
		8: 0,
		6: 90,
		2: 180,
		4: 270
	};
	if(cases[facing]){
		this.sprite.rotation = cases[facing];
	}
	this.width = this.base.spriteSheet._frameWidth;
	this.height = this.base.spriteSheet._frameHeight;
	this.sprite.x = this.x;
	this.sprite.y = this.y;
	this.maxHP = 10;
	this.HP = this.maxHP;
	this.firePower = 3;
	this.fireDelay = 30;
	this.sinceFired = this.fireDelay;
	this.alive = true;
}

BulletTurret.prototype = new Turret();

function LaserTurret(x, y, facing){
	this.x = x;
	this.y = y;
	this.fireDelay = 30;
	this.sinceFired = this.fireDelay;
	this.alive = true;
}

LaserTurret.prototype = new Turret();

function createEnemy(x, y, facing, type){
	switch(type){
		case 'Walker':
			return new Walker(x, y, facing);

		case 'BulletTurret':
			return new BulletTurret(x, y, facing);

		case 'LaserTurret':
			return new LaserTurret(x, y, facing);
	}
}