var centerOnPlayerDelay = 15;
var framesSinceMoved = 0;

function updateCamera() {
	if(player.xv == 0){
		framesSinceMoved++;
	} else {
		framesSinceMoved = 0;
	}

	if(framesSinceMoved >= centerOnPlayerDelay){
		var targetPos = ((player.x+player.width/2)-(CANVAS_WIDTH*0.5))*-1;
		if(world.x > targetPos) {
			world.x -= (world.x-targetPos)*0.05;
		}
		if(world.x < targetPos) {
			world.x -= (world.x-targetPos)*0.05;
		}
	} else {
		var panSpeedX = Math.round(Math.abs(player.xv)*1.5);
		var panSpeedY = 0;
		switch(player.facing){
			case 4:
				var targetPos = ((player.x+player.width/2)-(CANVAS_WIDTH*0.6))*-1;
				world.x += panSpeedX;
				if(world.x > targetPos) {
					world.x = targetPos;
				}
				break;
			case 6:
				var targetPos = ((player.x+player.width/2)-(CANVAS_WIDTH*0.4))*-1;
				world.x -= panSpeedX;
				if(world.x < targetPos) {
					world.x = targetPos;
				}
				break;
		}	
	}

	if(world.x > 0) {
		world.x = 0;
	}

	world.x = Math.round(world.x);
	world.y = Math.round(world.y);
}

function draw() {
	updateCamera();
	stage.update();
}