var camera = {
	x: 0,
	y: 0,
	panSpeed: player.runSpeed * 1.5,
	step: function() {
		switch(player.facing){
			case 8:
				var targetPos = (player.y+player.height/2)-(CANVAS_HEIGHT*0.6);
				camera.y -= camera.panSpeed;
				if(camera.y < targetPos) {
					camera.y = targetPos;
				}								
				break;
			case 2:
				var targetPos = (player.y+player.height/2)-(CANVAS_HEIGHT*0.4);
				camera.y += camera.panSpeed;
				if(camera.y > targetPos) {
					camera.y = targetPos;
				}								
				break;
			case 4:
				var targetPos = (player.x+player.width/2)-(CANVAS_WIDTH*0.6);
				camera.x -= camera.panSpeed;
				if(camera.x < targetPos) {
					camera.x = targetPos;
				}													
				break;
			case 6:
				var targetPos = (player.x+player.width/2)-(CANVAS_WIDTH*0.4);
				camera.x += camera.panSpeed;
				if(camera.x > targetPos) {
					camera.x = targetPos;
				}							
				break;
		}

		if(camera.x < 0) {
			camera.x = 0;
		}
	}
}

function draw() {
	//camera.step();

	stage.update();
}