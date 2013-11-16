function updateCamera() {
	var panSpeed = player.runSpeed * 1.5;
	switch(player.facing){
		case 8:
			var targetPos = ((player.y+player.height/2)-(CANVAS_HEIGHT*0.6))*-1;
			world.y += panSpeed;
			if(world.y > targetPos) {
				world.y = targetPos;
			}								
			break;
		case 2:
			var targetPos = ((player.y+player.height/2)-(CANVAS_HEIGHT*0.4))*-1;
			world.y -= panSpeed;
			if(world.y < targetPos) {
				world.y = targetPos;
			}
			break;
		case 4:
			var targetPos = ((player.x+player.width/2)-(CANVAS_WIDTH*0.6))*-1;
			world.x += panSpeed;
			if(world.x > targetPos) {
				world.x = targetPos;
			}
			break;
		case 6:
			var targetPos = ((player.x+player.width/2)-(CANVAS_WIDTH*0.4))*-1;
			world.x -= panSpeed;
			if(world.x < targetPos) {
				world.x = targetPos;
			}							
			break;
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