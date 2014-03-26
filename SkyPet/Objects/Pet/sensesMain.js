Pet.prototype.senses = function()
{
	var ObjLength = ObjPos.length;
	var i, j;
	var posX = pet.position.x;
	var posZ = pet.position.y;
	var objNum = [];

	//Checking what objects is relevant to test against.
	for (i = 0; i < ObjLength; i++)
	{
		var isInRange = ObjPos[i].x > (posX - 500) && ObjPos[i].x < (posX + 500) && ObjPos[i].z > (posZ - 500) && ObjPos[i].z < (posZ + 500);
		if (isInRange)
		{
			objNum.push(i);
		}
	};
	pet.vision(objNum);
};

Pet.prototype.vision = function(objNum)
{
	var i, j;
	var ObjLength = objNum.length;
	var posX = pet.position.x;
	var posZ = pet.position.y;
	var dist = 0;
	var visDist = 0;
	var testNum = 0;
	var absl = Math.abs;

	if (this.movementInfo == 3) //Down
	{
		for (i = 0; i < ObjLength; i++)
		{
			testNum = objNum[i];
			if (ObjPos[testNum].z > posZ)
			{
				dist = absl(ObjPos[testNum].z - posZ);
				visDist = dist * 3;
				if (dist < this.visionFront)
				{
					var check = ObjPos[testNum].x > (posX - visDist) && ObjPos[testNum].x < (posX + visDist);
					if (check)
					{
						pet.visionThought(objects[testNum]);
					}
				}
			}
		};
	}
	else if (this.movementInfo == 4) //Up
	{
		for (i = 0; i < ObjLength; i++)
		{
			testNum = objNum[i];
			if (ObjPos[testNum].z < posZ)
			{
				dist = absl(ObjPos[testNum].z - posZ);
				visDist = dist * 3;
				if (dist < this.visionFront)
				{
					var check = ObjPos[testNum].x > (posX - visDist) && ObjPos[testNum].x < (posX + visDist);
					if (check)
					{
						pet.visionThought(objects[testNum]);
					}
				}
			}
		};
	}
	else if (this.movementInfo == 2) //Left
	{
		for (i = 0; i < ObjLength; i++)
		{
			testNum = objNum[i];
			if (ObjPos[testNum].x < posX)
			{
				dist = absl(ObjPos[testNum].x - posX);
				visDist = dist * 3;
				if (dist < this.visionFront)
				{
					var check = ObjPos[testNum].z > (posZ - visDist) && ObjPos[testNum].z < (posZ + visDist);
					if (check)
					{
						pet.visionThought(objects[testNum]);
					}
				}
			}
		};
	}
	else if (this.movementInfo == 1) //Right
	{
		for (i = 0; i < ObjLength; i++)
		{
			testNum = objNum[i];
			if (ObjPos[testNum].x > posX)
			{
				dist = absl(ObjPos[testNum].x - posX);
				visDist = dist * 3;
				if (dist < this.visionFront)
				{
					var check = ObjPos[testNum].z > (posZ - visDist) && ObjPos[testNum].z < (posZ + visDist);
					if (check)
					{
						pet.visionThought(objects[testNum]);
					}
				}
			}
		};
	}
};

Pet.prototype.smellHearObject = function(itemNumber)
{
	/*
	
	if(itemNumber === undefined)
	{
		return;
	}

	//petObjectInput =  smellInRange(0), soundInRange(1), touching(2), nameID(3)
	var petObjectInput = objects[itemNumber].encounter(pet.position, itemNumber);

	//Touching
	if (petObjectInput[2])
	{
		//console.log (petObjectInput[0]);
		//console.log (petObjectInput[3] + " 2");
	}
	//Smells
	else if (petObjectInput[0] == 2 || petObjectInput[0] == 1)
	{
		pet.checkInterest(itemNumber, petObjectInput[3], petObjectInput[0]+1);
	}
	//Hears
	else if (petObjectInput[1] == 2 || petObjectInput[1] == 1)
	{
		pet.checkInterest(itemNumber, petObjectInput[3], petObjectInput[1]+1);
	};*/
};