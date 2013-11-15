function HeadsUpDisplay() {
	this.container = new createjs.Container();

	var lifeBar = new createjs.Container();
	var emptyBar = new createjs.Shape(); //Sprite later on
	emptyBar.graphics.beginFill('#FF0000').drawRect(0,0,CANVAS_WIDTH,20);
	var currentBar = new createjs.Shape();
	currentBar.graphics.beginFill('#00FF00').drawRect(0,0,CANVAS_WIDTH,20);
	lifeBar.addChild(emptyBar, currentBar);
	lifeBar.y = CANVAS_HEIGHT-20;
	this.container.addChild(lifeBar);

	this.init = function(){
		stage.addChild(this.container);
	};
	this.step = function(){
		currentBar.scaleX = player.HP / player.maxHP;
	};
}