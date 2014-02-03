//Illy Binfield, 2014, pet.js
//Pet class. The pet class will be initiated as the pet is created.
//the pet class holds all the functiuons used in conection with the pet.

//Global pet variables that will be turned into pet spesific "this"
var petItemsKnown = new Array();
var petTargetPos = new THREE.Vector3(0,0,0);
//Global variables designed to make the pet move. Global so that the value can be changed
var hovering = 100;
var exploring = true;
var encounterTouching = false;

//The pets mood is a vector2 on a mood scale.
var petsCurrentMood = new THREE.Vector2(5,0);

// If the pet reacts to something unexpected, the pet will addjust its mood
var petMoodAdjusters =
{
    "disapointed"       : [-2,-2],
    "surprised"         : [0,+7]
};

//Pet needs - needs that will decrease as time passes
var petNeeds =
{
    "hungerLevel"      : 100,
    "foodDigesting"    : 0,
    "sleepLevel"       : 100,
    "hungerAdjuster"   : 0.99,
    "sleepAdjuster"    : 0.99,
};

//Depending on where the pet is on the XY mood scale, it will be in different moods. 
var petMoods =
{
    "agressive"         : [-7,5],
    "scared"            : [-3,5],
    "uncomfertable"     : [-3,-2],
    "curious"           : [-3,-2],
    "playfull"          : [0,2],
    "relaxed"           : [0,0],
    "sad"               : [0,0],
    "depressed"         : [-3,-2]
};

var petMoodsBool =
{
    "agressive"         : false,
    "scared"            : false,
    "uncomfertable"     : false,
    "curious"           : false,
    "playfull"          : false,
    "relaxed"           : false,
    "sad"               : false,
    "depressed"         : false
};

//Depending on the pets different moods, it will have different actions it wants to do.
var petActions =
{
    "eat"            : 'food',
    "sleep"          : 'sleep',
    "washSelf"       : 'washSelf',
    "fight"          : 'fight',
    "runAway"        : 'run',
    "threaten"       : 'threaten',
    "talkTo"         : 'talkTo',
    "washOther"      : 'washOther',
    "grabb"          : 'grabb',
    "push"           : 'push',
    "exlore"         : 'explore',
    "jumpOnToppOff"  : 'jumpOn'
};

function Pet (petTexture, xCoordinates, yCoordinates, zCoordinates)
{
	///Make the pet
	var petMaterial;
	var petHight = 20, petWith = 20, petQuality = 1;
	//Make the pet material.
	petMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(petTexture), transparent: true});
	//Make the pet
	this.pet = new THREE.Mesh(
		new THREE.PlaneGeometry(
		petWith,
		petHight,
		petQuality,
		petQuality),
		petMaterial);

	scene.add(this.pet);

	//Place the pet according to the variables given when the pet was initiated in the main script
	this.pet.position.x = xCoordinates;
	this.pet.position.y = yCoordinates;
	this.pet.position.z = zCoordinates;
	this.pet.scale.set(3,3,3);

	//Initiate the targeting system of the pet so it wont come upp blank.
	//We use the pets xyz coordinates so that the pets target position is the point it starts on(thus it wont move.)
	petTargetPos = new THREE.Vector3(xCoordinates,yCoordinates,zCoordinates);
    this.targetPosition = petTargetPos;
    this.exploring = exploring;

    //Initiate all the variables as THIS variables, making them unique to the pet in question.
    this.petItemsKnown = petItemsKnown;

    this.encounterTouching = encounterTouching;
}
//Function to make the pet move with a target pos,
//Finding random target points the pet can walk to if bored
//Generate hovering on the pet if the pet is flying.
Pet.prototype.moving = function(frameCounter)
{
    //The pet finds random positions to walk to if it wants to explore
	if (frameCounter == 50 && this.exploring)
	{
		//console.log(this.pet.position.x + " is exploring! " + this.pet.position.z);
		var ranNumX = 100, ranNumZ = 0, ranNumY = 0;

		ranNumX = Math.floor(-100 + THREE.Math.random16() * 400);
		//ranNumY = THREE.Math.random16() * 0;
		ranNumZ = -100 + THREE.Math.random16() * 400;

		this.targetPosition = new THREE.Vector3(ranNumX,ranNumY,ranNumZ);
	};

	//Making the pet hover slightly up and down fr a flying effet. Sin() wave based
	var hoverDistance = 1;
	var hoverSpeed = 1.1;

	//HoveringPet
	if (hovering > hoverDistance)
	{
		hoverSpeed = Math.sin(hovering);
		this.pet.position.y += hoverSpeed/20;
		hovering -= 0.1;
	}
	else
	{
		hovering = 100;
	};

	//Moving the pet by use of the "is the pet.x lower then pos.x?" system
	//Walk X
	if (this.targetPosition.x > this.pet.position.x)
	{
		this.pet.position.x += 0.1;
	}
	else if (this.targetPosition.x < this.pet.position.x)
	{
		this.pet.position.x -= 0.1;
	};

	//Walk Z
	if (this.targetPosition.z > this.pet.position.z)
	{
		this.pet.position.z += 0.1;
	}
	else if (this.targetPosition.z < this.pet.position.z)
	{
		this.pet.position.z -= 0.1;
	};
};

Pet.prototype.moodsAdjusters = function()
{
	if (petNeeds.sleepLevel < 1 && petNeeds.sleepLevel > 0) 
	{
		petsCurrentMood.y -= 1;
		petNeeds.sleepLevel = 0;
		pets[0].moods();
		console.log (petsCurrentMood.y + " petsCurrentMood.y " );
	} else {
		petNeeds.sleepLevel *= petNeeds.sleepAdjuster;
	};
};


Pet.prototype.moods = function()
{
	//Setting the moods:
	//First Check Bad
	if (petsCurrentMood.x < petMoods.agressive[0])
	{
		if(petsCurrentMood.y > petMoods.agressive[1])
		{
			petMoodsBool.agressive  = true;
			console.log (petMoodsBool.agressive + "petMoodsBool.agressive")
		}
	};
	if (petsCurrentMood.x < petMoods.scared[0])
	{
		if(petsCurrentMood.y > petMoods.scared[1])
		{
			petMoodsBool.scared  = true;
			console.log (petMoodsBool.scared + "petMoodsBool.scared")
		}
	};
	if (petsCurrentMood.x < petMoods.uncomfertable[0])
	{
		if(petsCurrentMood.y > petMoods.uncomfertable[1])
		{
			petMoodsBool.uncomfertable  = true;
			console.log (petMoodsBool.uncomfertable + "petMoodsBool.uncomfertable")
		}
	};
	//SeconCheck Bad
	if (petsCurrentMood.x < petMoods.sad[0])
	{
		if(petsCurrentMood.y < petMoods.sad[1])
		{
			petMoodsBool.sad  = true;
			console.log (petMoodsBool.sad + "petMoodsBool.sad")
		}
	};
	if (petsCurrentMood.x < petMoods.depressed[0])
	{
		if(petsCurrentMood.y < petMoods.depressed[1])
		{
			petMoodsBool.depressed  = true;
			console.log (petMoodsBool.depressed + "petMoodsBool.depressed")
		}
	};
	//Thirs Check Good
	if (petsCurrentMood.x > petMoods.curious[0])
	{
		if(petsCurrentMood.y > petMoods.curious[1])
		{
			petMoodsBool.curious  = true;
			console.log (petMoodsBool.curious + "petMoodsBool.curious")
		}
	};
	if (petsCurrentMood.x > petMoods.playfull[0])
	{
		if(petsCurrentMood.y > petMoods.playfull[1])
		{
			petMoodsBool.playfull  = true;
			console.log (petMoodsBool.playfull + "petMoodsBool.playfull")
		}
	};
	//Final good check
	if (petsCurrentMood.x > petMoods.relaxed[0])
	{
		if(petsCurrentMood.y < petMoods.relaxed[1])
		{
			petMoodsBool.relaxed  = true;
			console.log (petMoodsBool.relaxed + "petMoodsBool.relaxed")
		}
	};
};


//Pet X checks objectX as initiated in the main script in "makeAMesh"
//We initiate the items "encounter" to gain insight into the items distance to the pet
//and weather or not the pet smells/hears or hits the target.
//The item will return values needed for the pet to assess its interest in the item, and if
//the pet finds the item interested, the pet will call the items relevant locater to find the item. (smell/sound function)
Pet.prototype.checkObjects = function(petNumber, itemNumber)
{
	//Returns values: smellInRange(0), soundInRange(1), touching(2), nameID(3)

	//Adding some handlers in case objects is not defind or something, so that i does not crash the whole thing. Roger
	// console.log("checing");
	if(itemNumber === undefined || itemNumber === 0)
	{
		return;
	}
	var petObjectInput = objects[itemNumber].encounter(this.pet.position, itemNumber);
	//console.log(this.pet.position + " has ecnountered item #" + itemNumber);

	//Touching
	if (petObjectInput[2])
	{
		this.encounterTouching = true;
	}
	//Smells
	else if (petObjectInput[0] == 2 || petObjectInput[0] == 1)
	{
		pets[petNumber].petBehaviour(itemNumber, petObjectInput[3], petObjectInput[0]+1, petNumber);
		//this.exploring = false;
		//this.targetPosition = objects[itemNumber].objectSmellSound(this.pet.position, petObjectInput[0]+1);
		//console.log (petObjectInput[0]);
	}
	//Hears
	else if (petObjectInput[1] == 2 || petObjectInput[1] == 1)
	{
		//console.log ("This fare");
		pets[petNumber].petBehaviour(itemNumber, petObjectInput[3], petObjectInput[1]+1, petNumber);
		//this.exploring = false;
		//this.targetPosition = objects[itemNumber].objectSmellSound(this.pet.position, petObjectInput[1]+1);
		//console.log (petObjectInput[1]);
	};
};

Pet.prototype.petBehaviour = function(itemNumber, itemNameId, radInput, petNumber)
{	

	//console.log(this.petItemsKnown[0]  + " " + petNumber + " testing the other pets");

	var isItemKnown = false;

	if (itemNameId == '0')
	{
		//console.log (" itemNameId = 0 , " + petNumber);
		//check if interested
	} else
	{
		//console.log (" itemNameId != 0 ");
		for (var i = this.petItemsKnown.length - 1; i >= 0; i--) 
		{
			if (this.petItemsKnown[i] == itemNameId) 
			{
				isItemKnown = true;
				//console.log (" itemNameId != 0knows it " + petNumber);
			}
		};

		if (!isItemKnown)
		{
			//console.log (" itemNameId != 0 didntKnow " + petNumber);
			this.petItemsKnown[0] = itemNameId;
		};
	};

	pets[petNumber].testingInterest(itemNumber, radInput, itemNameId);
};

Pet.prototype.testingInterest = function(itemNumber, radInput, itemNameId)
{
	if (itemNameId == petActions.eat)
	{
		//Find expected emotion, if not, se how fare off it is and act on that
		//console.log ('This is the food you are looking for')
		this.targetPosition = objects[itemNumber].objectSmellSound(this.pet.position, radInput);
		this.exploring = false;
	}
};




