var currentMousePos = { x: -1, y: -1 };

var mouseDown = false;
$(document).mousedown(function() {
    mouseDown = true;
}).mouseup(function() {
    mouseDown = false;  
});

$(function() {
  window.keydown = {};
  
  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }
  
  $(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
  });
  
  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});

function handleKeys() {
	// player controls
	if (keydown.a) {
		player.xv -= 2;
		if(player.xv<-(player.runSpeed)){
			player.xv = -(player.runSpeed);
		}
		player.facing = 4;
		player.sprite.scaleX = -1;
	}

	if (keydown.d) {
		player.xv += 2;
		if(player.xv>player.runSpeed){
			player.xv = player.runSpeed;
		}
		player.facing = 6;
		player.sprite.scaleX = 1;
	}

	if (keydown.w) {
		player.facing = 8;
	}

	if (keydown.s) {
		player.facing = 2;
	}

	if (keydown.space && !player.isJumping) { //need to figure out how to bind keypress
		player.jump();
		player.isJumping = true;
	}

	if (!keydown.space) {
		player.isJumping = false;
	}

	// camera controls (debug)
	if (keydown.up) {
		world.y += 5;
	}

	if (keydown.down) {
		world.y -= 5;
	}

	if (keydown.left) {
		world.x += 5;
	}

	if (keydown.right) {
		world.x -= 5;
	}

	if (keydown.shift) {
		world.scaleX += world.scaleX*0.01;
		world.scaleY += world.scaleY*0.01;
	}

	if (keydown.ctrl) {
		world.scaleX -= world.scaleX*0.01;
		world.scaleY -= world.scaleY*0.01;
	}	
}

function handleMouse() {
	if (mouseDown) {
		player.fire();
	}
}