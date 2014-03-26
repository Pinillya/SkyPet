function Food(position)
{
	//Wont remember:
	this.texture = '../img/Inside/food.png';
	this.nameId = 'food';
	this.sizeX = 50;
	this.sizeY = 50;

	//Might remember:
	//Observe
	this.position = position;
	this.position.y = position.y + this.sizeY / 2;
	this.O1Output = {
		"position": position,
		"isStatic": 1,
		"hasAni": 0,
		//How many colors, Blue, Cyan, Green, Yellow, Brown, Red, Magenta, White, Black, Gray
		"colors": [2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
		//How many colors, Sphere, Prism, Cuboid, Cude, Cone, Cylinder, Pyramide, LongSide, LongUp
		"shapes": [2, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		//From smooth 0 - bumpy 10.
		"bumpySmooth": 5,
		//Is it one form or many smaller forms (Like ear sticking out).
		"varyingShapes": 1
	};

	//HearingSound
	this.smellRad = 30;
	this.soundRad = 50;
	//Fragrent, woody, noneCitrus, fruty, sharp, camical, minty, sweet, popcorn, sickening, lemon
	this.smells = [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0];
	//Cold vs Warm 1-10(3-7 being safe), smooth vs rough 1-10(texture), 
	//unsolide(soft) vs solide (0 = liquid, 1 = mud), slippery vs sticky (0 = ice)
	this.feels = [5, 3, 8, 5];

	//Interactios
	//Tast: Bitter(Poison?), Sour(Ph, Spoild food), Salty(opens Taste), Sweet(likes the most) 1-10
	this.eat = 0, 2, 0, 1;
	//Not to hot or sticky is important for sleep:
	if (this.feels[0] > 3 && this.feels[0] < 7 && this.feels[3] > 4 && this.feels[3] <= 5)
	{
		if (this.feels[2] > 3 && this.feels[2] < 7)
		{
			this.sleep = 100;
		}
		else
		{
			this.sleep = 70;
		}
	}
	else
	{
		this.sleep = 0;
	}

	if (!this.isStatic)
	{};
	this.fight = 0;
	this.runAway = 0;
	this.threaten = 0;

	this.talkTo = 0;
	this.washOther = 0;
	this.grabb = 70;
	this.push = 80;
	this.jumpOnToppOff = 60; //This should be able to change as if they jump on it they wont get to eat it

	//Call the parent constructor
	BaseObject.call(this);
	//Call the parent constructor
	BaseObject.call(this);
}

//inherits Object
Food.prototype = new BaseObject();
//Setts the food constructor as the constructor
Food.prototype.constructor = Food;

Food.prototype.emitValues = function() {

};

Food.prototype.checking = function() {};