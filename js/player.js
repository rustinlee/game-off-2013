player = new creature(null, null, 32, 32, "#00A", 100);

player.fire = function() {
	if(this.sinceFired >= this.fireDelay){
		var radx = (currentMousePos.x + camera.x) - (this.x+this.width/2);
		var rady = ((currentMousePos.y + camera.y) - (this.y+this.height/2))*-1;
		var angle = Math.atan(rady/radx)/(Math.PI/180);
	    if (radx <0) {
	        angle += 180;
	    }
	    angle = angle*-1;			
		projectiles.push(new projectile(this.x + this.width/2, this.y + this.height/2, Math.cos(angle*Math.PI/180)*this.firePower, Math.sin(angle*Math.PI/180)*this.firePower, true));
		this.sinceFired = 0;
	}
};

player.die = function() {
	this.x = this.checkpointX;
	this.y = this.checkpointY;
	this.xv = 0;
	this.yv = 0;

	this.alive = true;
	//more consequences for death soon
}
