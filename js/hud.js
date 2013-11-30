function HeadsUpDisplay() {
	this.container = new createjs.Container();

	this.container.addChild(HUDSprite);

	this.xpBar = new createjs.Shape();
	this.hpBar = new createjs.Shape();
	this.boostBar = new createjs.Shape();

	xpBarSprite.x = 13;
	xpBarSprite.y = 16;
	this.container.addChild(xpBarSprite);
	hpBarSprite.x = 11;
	hpBarSprite.y = 30;
	this.container.addChild(hpBarSprite);
	boostBarSprite.x = 13;
	boostBarSprite.y = 44;	
	this.container.addChild(boostBarSprite);

	//this.container.y = 

	/*
	var lifeBar = new createjs.Container();
	var emptyBar = new createjs.Shape(); //Sprite later on
	emptyBar.graphics.beginFill('#FF0000').drawRect(0,0,CANVAS_WIDTH,20);
	var currentBar = new createjs.Shape();
	currentBar.graphics.beginFill('#00FF00').drawRect(0,0,CANVAS_WIDTH,20);
	lifeBar.addChild(emptyBar, currentBar);
	lifeBar.y = CANVAS_HEIGHT-20;
	this.container.addChild(lifeBar);
	*/

	this.init = function(){
		this.container.x = (CANVAS_WIDTH - HUDSprite.image.width) / 2;
		this.container.y = CANVAS_HEIGHT - (HUDSprite.image.height + 30);		
		stage.addChild(this.container);
	};
	this.step = function(){
		//xp boost and life bars
		//xpBarSprite.cache(xpBarSprite.x, xpBarSprite.y, xpBarSprite.image.width * (), xpBarSprite.image.height);
		hpBarSprite.cache(0, 0, hpBarSprite.image.width * (player.HP / player.maxHP), hpBarSprite.image.height);
		//xpBarSprite.cache(xpBarSprite.x, xpBarSprite.y, xpBarSprite.image.width * (), xpBarSprite.image.height);
	};
}