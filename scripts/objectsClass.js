//Illy Binfield, 2014, objectClass.js
//The object class will be used as a baseclass for all the objects on the scene.
// the objects inherite from this class all the basic attributes like small, sound and so on.
var touching = false;
function Object (parimiters)
{
	//Different variables all the objects will have
	//We make them local to the spesific item by using THIS.X = X;
	this.idNumber = parimiters.nameId;
	this.position = parimiters.position;
	this.texture = parimiters.texture;

	this.testSmell = false;
	this.smellRadius = parimiters.smellRad;
	this.hasSound = parimiters.hasSound;
	this.soundRadius = parimiters.soundRad;

	this.isStatic = parimiters.isStatic;
	this.hasAnimation = parimiters.hasAni;
	this.initialValue = parimiters.initValue;

	this.touching = touching;

	if (this.hasAnimation)
	{
		//this.meshAnimation();
	}
	if (!this.isStatic)
	{
		//this.physics();
	}

    //Texture:
	var planeMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(this.texture), transparent: true});

	this.plane = new THREE.Mesh(
		new THREE.PlaneGeometry(
		parimiters.sizeX,
		parimiters.sizeY),
		planeMaterial);

	scene.add(this.plane);
	this.plane.position = this.position;
}

//Generates a random point towards the target object
Object.prototype.objectSmellSound = function(petPos, areaDevider)
{
	var objToPetTargetPos = new THREE.Vector3(0,0,0);

	if (this.testSmell)
	{
		console.log(" Testing smell");
		errorArea = this.smellRadius/areaDevider;
	}
	else if (this.hasSound)
	{
		console.log ("Testing Sound");
		errorArea = this.soundRadius/areaDevider;
	};


    //Pos X
	if (petPos.x > this.position.x)
	{
		objToPetTargetPos.x = this.position.x + THREE.Math.random16() * errorArea;
	}
	else if (petPos.x < this.position.x)
	{
		objToPetTargetPos.x = this.position.x - errorArea + THREE.Math.random16() * errorArea;
	};

    //Pos Z
	if (petPos.z > this.position.z)
	{
		objToPetTargetPos.z = this.position.z + THREE.Math.random16() * errorArea;
	}
	else if (petPos.z < this.position.z)
	{
		objToPetTargetPos.z = this.position.z - errorArea + THREE.Math.random16() * errorArea;
	};
	return objToPetTargetPos;
};

Object.prototype.meshAnimation = function()
{
	console.log ("animation");
};


//encounters the object, returns frue/false if item is in smelling or sound range
//returns the item "number"
//The different stages of finding an object based on the likelyhood of finding
//the object using that sense.
//If the pet is touching the object,- dont check for the object anymore.
//If the pet can see the object there is no use for the smell check or the sound check.
//As it is easier to locate the origo of a sound, this will be checked by the pet before smell.
Object.prototype.encounter = function(petPos, itemNumber) //name is Encountering instead?
{
	var distanceToPet = this.plane.position.distanceTo(petPos);
	var soundInRange = 0, smellInRange = 0, seesObject = false;

	if (!this.touching){
		if (distanceToPet < 10)
		{
			this.touching = true;
			console.log("touching = true");
		}
		
		if (this.hasSound)
		{
			soundInRange = objects[itemNumber].distanceCheck(this.soundRadius, distanceToPet);
		}
		
		smellInRange = objects[itemNumber].distanceCheck(this.smellRadius, distanceToPet);

		if (smellInRange == 1 || smellInRange == 2)
		{
			this.testSmell = true;
			return [smellInRange, soundInRange, this.touching, this.idNumber];
		}
		else 
		{
			this.testSmell = false;
			return [smellInRange, soundInRange, this.touching, "0"];
		}
	}
	
	return [0, 0, this.touching, "0"];
};

//Checks distance to target based on the relevant range to check against.
Object.prototype.distanceCheck = function(radiusCheck, distanceToPet)
{
	if (distanceToPet < radiusCheck*1.3)
	{
		if (distanceToPet < radiusCheck/2)
		{
			return 2;
		}
		else if (distanceToPet < radiusCheck)
		{
			return 1;
		};
	};
};

/*
	Object.prototype.visionCheck = function(petPos)
	{
	};

	Object.prototype.interact = function(petPos)
	{
	};

	Object.prototype.sendNewPetTarget = function()
	{
		console.log ("sendNewPetTarget");
	};

	Object.prototype.functionSender = function()
	{
		console.log ("functionSender");
	};

	Object.prototype.physics = function()
	{
		console.log ("physics");
	};
*/

