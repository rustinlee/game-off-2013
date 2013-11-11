function entity() {
}

entity.prototype = {
	draw: function() {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
	}
}

function wall(width, height, x, y, color, collision) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.color = color;
	this.collision = collision;
}

wall.prototype = new entity();

var walls = new Array();