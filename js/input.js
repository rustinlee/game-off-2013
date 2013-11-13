function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

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
	}

	if (keydown.d) {
		player.xv += 2;
		if(player.xv>player.runSpeed){
			player.xv = player.runSpeed;
		}
		player.facing = 6;
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
}

function handleMouse() {
	if (mouseDown) {
		player.fire();
	}
}