var touching = false;

function BaseObject()
{
	if (this.texture != null)
	{
		//Texture:
		var objMaterial = new THREE.MeshBasicMaterial(
		{
			map: THREE.ImageUtils.loadTexture(this.texture),
			transparent: true
		});

		this.plane = new THREE.Mesh(
			new THREE.PlaneGeometry(
				this.sizeX,
				this.sizeY),
			objMaterial);

		scene.add(this.plane);
		this.plane.position = this.position;
	}

	console.log(this.nameId);

	this.touching = touching;
}

//encounters the object, returns frue/false if item is in smelling or sound range
//returns the item "number"
//The different stages of finding an object based on the likelyhood of finding
//the object using that sense.
//If the pet is touching the object,- dont check for the object anymore.
//If the pet can see the object there is no use for the smell check or the sound check.
//As it is easier to locate the origo of a sound, this will be checked by the pet before smell.
BaseObject.prototype.encounter = function(petPos, itemNumber) //name is Encountering instead?
{
	var soundInRange = 0,
		smellInRange = 0,
		seesObject = false;
	var distanceToPet = this.plane.position.distanceTo(petPos);

	if (distanceToPet < 10)
	{
		this.touching = true;
	}
	else
	{
		this.touching = false;
	}

	if (this.soundRad > 0)
	{
		soundInRange = objects[itemNumber].distanceCheck(this.soundRad, distanceToPet);
	}

	smellInRange = objects[itemNumber].distanceCheck(this.smellRad, distanceToPet);

	if (smellInRange == 1 || smellInRange == 2)
	{
		this.testSmell = true;
		return [smellInRange, soundInRange, this.touching, this.nameId];
	}
	else
	{
		this.testSmell = false;
		return [smellInRange, soundInRange, this.touching, "0"];
	}

	return [smellInRange, soundInRange, this.touching, this.nameId];
};

//Checks distance to target based on the relevant range to check against.
BaseObject.prototype.distanceCheck = function(radiusCheck, distanceToPet)
{
	if (distanceToPet < radiusCheck * 1.3)
	{
		if (distanceToPet < radiusCheck / 2)
		{
			return 2;
		}
		else if (distanceToPet < radiusCheck)
		{
			return 1;
		};
	};

};

BaseObject.prototype.workingStill = function() {};