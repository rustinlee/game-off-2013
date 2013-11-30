function HeadsUpDisplay() {
	this.container = new createjs.Container();

	this.container.addChild(HUDSprite);

	xpBarSprite.x = 13;
	xpBarSprite.y = 16;
	this.container.addChild(xpBarSprite);
	hpBarSprite.x = 11;
	hpBarSprite.y = 30;
	this.container.addChild(hpBarSprite);
	boostBarSprite.x = 13;
	boostBarSprite.y = 44;	
	this.container.addChild(boostBarSprite);

	this.init = function(){
		this.container.x = (CANVAS_WIDTH - HUDSprite.image.width) / 2;
		this.container.y = CANVAS_HEIGHT - (HUDSprite.image.height + 30);		
		stage.addChild(this.container);
	};
	this.step = function(){
		//xp, boost and life bars
		//xpBarSprite.cache(0, 0, xpBarSprite.image.width * (), xpBarSprite.image.height);
		hpBarSprite.cache(0, 0, hpBarSprite.image.width * (player.HP / player.maxHP), hpBarSprite.image.height);
		//boostBarSprite.cache(0, 0, boostBarSprite.image.width * (), boostBarSprite.image.height);
	};
}