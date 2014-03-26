//Illy 2014 - petMovement.js
//As this is a project where we aim to create a proof of concept,
//this code will have a lot of comments to make it easier to understand for people with limited programming experience.
//I also feel that I must point out that there is a lot of hardcoded pet brain here. Please read our raport if
//you better with so understand the choises we have made and how this still work towards prooving our theory.

//Make the pet move with a target pos,
//Finding random target points the pet can walk to if bored
Pet.prototype.move = function()
{
	//Do we need a new path? 
	var newPath = false;
	// The pets grid position:
	var petGridPos = new THREE.Vector3(Math.floor(pet.position.x / worldX), 0, Math.floor(pet.position.z / worldZ));

	if (this.petTargetPos != null)
	{
		//The pet finds random positions to walk to if it wants to explore, it will automatickly get a 
		//new position, if it has gone to the last postion in the path.
		if (this.actionList[10] != undefined)
		{
			if (this.actionList[10].prio <= 10 && !newPath && this.currentPath.length == 0)
			{
				var ranNumX = 100,
					ranNumZ = 0,
					ranNumY = 0;
				ranNumX = Math.floor(THREE.Math.random16() * worldX);
				ranNumZ = Math.floor(THREE.Math.random16() * worldZ);
				//this.petTargetPos = new THREE.Vector3(3,0,5);
				this.petTargetPos = new THREE.Vector3(ranNumX, ranNumY, ranNumZ);
				console.log(ranNumX + " , " + ranNumZ)
				newPath = true;
			}
		}

		//If a new path is needed, we scrub the last one and make a new one
		//We take out the first part of the path. (The position the pet is already standing on.)
		if (newPath)
		{
			this.currentPath = [];
			this.currentPath = FindPath(worldGrid, petGridPos, this.petTargetPos);
			newPath = false;
			this.currentPath.splice(0, 1)[0];
		}

		//If the path is actually there, and we are working with a defined value;
		//First we check to see if the pet is standing on the path node, if so we need to take it out
		//as the pet then has reached its goal. Then we send the pet to the next goal. 
		//If there is any undefined or null value in the path, we will scrubb it and start again. 
		if (this.currentPath.length != 0)
		{
			if (this.currentPath[0].x != undefined && this.currentPath[0].z != undefined)
			{
				if (petGridPos.x == this.currentPath[0].x && petGridPos.z == this.currentPath[0].z)
				{
					if (worldGrid[this.currentPath[0].x][this.currentPath[0].z] == 1)
					{
						console.log("Hitting object");
						//Here we have a new object to investigate! 
						this.currentPath = [];
						this.stopMoving = true;
					}
					else
					{
						this.currentPath.splice(0, 1)[0];
					}
				}
				else
				{
					this.soundRad = 50;
					pet.walkPet(petGridPos, this.currentPath[0].x, this.currentPath[0].z);
				}
			}
			else
			{
				this.currentPath = [];
			}
		}
	};
};

Pet.prototype.walkPet = function(petPos, targetPosX, targetPosZ)
{
	this.movingUp = false;
	this.movingDown = false;
	this.movingRight = false;
	this.movingLeft = false;
	//this.movementInfo = 0;
	movementSpeed = 0.8;
	//Moving the pet by use of the "is the pet.x lower then pos.x?" system
	//Walk X

	if (this.movementInfo != undefined)
	{
		if (targetPosX > petPos.x)
		{
			if (this.movementInfo != 1)
			{
				this.animator.playOnce("fly", 10, 20);
				this.movementInfo = 1;
			}
			pet.position.x += movementSpeed;
		}
		else if (targetPosX < petPos.x)
		{
			if (this.movementInfo != 2)
			{
				this.animator.playOnce("fly", 10, 20);
				this.movementInfo = 2;
			}
			pet.position.x -= movementSpeed;
		};

		//Walk Z
		if (targetPosZ > petPos.z)
		{
			if (this.movementInfo != 3)
			{
				this.animator.playOnce("fly", 10, 20);
				this.movementInfo = 3;
			}
			pet.position.z += movementSpeed;
		}
		else if (targetPosZ < petPos.z)
		{
			if (this.movementInfo != 4)
			{
				this.animator.playOnce("fly", 10, 20);
				this.movementInfo = 4;
			}
			pet.position.z -= movementSpeed;
		};
	}
};