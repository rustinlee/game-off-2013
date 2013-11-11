function creature(x, y, width, height, color, maxHP) {
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.width = width; //sprites will define these
	this.height = height; //
	this.color = color; //
	this.maxHP = maxHP;
	this.HP = this.maxHP;
	this.facing = 5; //numpad notation: 4 = left, 6 = right, 8 = up, 2 = down
	this.runSpeed = 6;
	this.isJumping = false;
	this.jumpHeight = 25;
	this.firePower = 3;
	this.fireDelay = 30;
	this.sinceFired = this.fireDelay;
	this.alive = true;
	this.collided = false;
	this.collisionNormal = [0.0,0.0];
	this.step = function() {
		this.collided = false; //innocent until proven guilty

		this.yv+=gravity;

		if(this.yv > gravity && this.collided && this.collisionNormal[1] == -1) {
			this.yv = gravity;
		}

		var broadphasebox = getSweptBroadphaseBox(this);
		for (var i = walls.length - 1; i >= 0; i--) {
			if (checkAABB(broadphasebox,walls[i])) {
				var collisiontime = sweptAABB(this, walls[i]);
				var remainingtime = 1.0 - collisiontime;
				if(remainingtime != 0) { //if there was a collision
					this.x += this.xv * collisiontime;
					this.y += this.yv * collisiontime;
					var dotprod = (this.xv * this.collisionNormal[1] + this.yv * this.collisionNormal[0]) * remainingtime;
					this.xv = dotprod * this.collisionNormal[1];
					this.yv = dotprod * this.collisionNormal[0];
					this.collided = true;
				}
			}
		};

		this.x += this.xv;
		this.y += this.yv;

		if (this.xv>0) {
			this.xv-=friction;
			if (this.xv<0) {
				this.xv = 0;
			}
		} else if (this.xv<0) {
			this.xv+=friction;
			if (this.xv>0) {
				this.xv = 0;
			}
		}

		if (this.HP <= 0 || this.y > pitThreshold) {
			this.alive = false; //mark for removal from array
			this.die(); //perform death function
		}

		this.sinceFired += 1;
	};
	this.die = function() {
		//once I make an enemy class this will award XP 
	};
	this.setNormal = function(x, y) {
		this.collisionNormal[0] = x;
		this.collisionNormal[1] = y;
	};
	this.jump = function() { //better handling all around needed
		if(this.collided && this.collisionNormal[1] == -1){
			this.yv -= this.jumpHeight;
		}
	};
	this.fire = function() { //firing needs to be its own module that the AI module will then pass parameters to
		if(this.sinceFired >= this.fireDelay){
			var radx = (player.x+player.width/2) - (this.x+this.width/2);
			var rady = ((player.y+player.height/2) - (this.y+this.height/2))*-1;
			var angle = Math.atan(rady/radx)/(Math.PI/180);
		    if (radx <0) {
		        angle += 180;
		    }
		    angle = angle*-1;			
			projectiles.push(new projectile(this.x + this.width/2, this.y + this.height/2, Math.cos(angle*Math.PI/180)*this.firePower, Math.sin(angle*Math.PI/180)*this.firePower, false));
			this.sinceFired = 0;
		}
	}
	this.AI = function() { //going to write different modules for each type of enemy
		this.fire();
	}
}

creature.prototype = new entity();

creatures = new Array();