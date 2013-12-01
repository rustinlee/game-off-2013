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

	if(keydown.a || keydown.d) {
		if(player.sprite.children[0].currentAnimation != "run"){
			player.sprite.children[0].gotoAndPlay("run");	
		}
	} else {
		player.sprite.children[0].gotoAndStop("idle");
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
}

function handleMouse() {
	if (mouseDown) {
		player.fire();
	}
}