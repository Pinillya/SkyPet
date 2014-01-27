//Illy Binfield, 2014, pet.js
//Pet class. The pet class will be initiated as the pet is created. 
//the pet class holds all the functiuons used in conection with the pet. 

//Global pet variables that will be turned into pet spesific "this" 
var petItemsKnown = [];
var petTargetPos = new THREE.Vector3(0,0,0);
//Global variables designed to make the pet move. Global so that the value can be changed 
var hovering = 100;
var exploring = true;
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
	
	//Initiate the targeting system of the pet so it wont come upp blank.
	//We use the pets xyz coordinates so that the pets target position is the point it starts on(thus it wont move.)
	petTargetPos = new THREE.Vector3(xCoordinates,yCoordinates,zCoordinates);
    this.targetPosition = petTargetPos;
    this.exploring = exploring;

    //Initiate all the variables as THIS variables, making them unique to the pet in question.
    this.petItemsKnown = petItemsKnown;
}

//Function to make the pet move with a target pos, 
//Finding random target points the pet can walk to if bored
//Generate hovering on the pet if the pet is flying. 
Pet.prototype.moving = function(frameCounter) 
{
    //The pet finds random positions to walk to if it wants to explore
	if (frameCounter == 50 && this.exploring) 
	{
		var ranNumX = 100, ranNumZ = 0, ranNumY = 0;
		
		ranNumX = THREE.Math.random16() * 50;
		ranNumY = THREE.Math.random16() * 50;
		ranNumZ = THREE.Math.random16() * 50;

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

//Pet X checks objectX as initiated in the main script in "makeAMesh"
//We initiate the items "encounter" to gain insight into the items distance to the pet
//and weather or not the pet smells/hears or hits the target.
//The item will return values needed for the pet to assess its interest in the item, and if
//the pet finds the item interested, the pet will call the items relevant locater to find the item. (smell/sound function)
Pet.prototype.checkObjects = function(petNumber, itemNumber) 
{
	//Returns values: smellInRange(0), soundInRange(1), touching(2), nameID(3)
	var petObjectInput = objects[itemNumber].encounter(this.pet.position, itemNumber);
	
	if (petObjectInput[2])
	{
		//Run touching code
	}
	else if (petObjectInput[0] == 2 || petObjectInput[0] == 1)
	{
		this.exploring = false;
		this.targetPosition = objects[itemNumber].objectSmellSound(this.pet.position, petObjectInput[0]+1);
		console.log (petObjectInput[0]);
	}
	else if (petObjectInput[1] == 2 || petObjectInput[1] == 1)
	{
		this.exploring = false;
		this.targetPosition = objects[itemNumber].objectSmellSound(this.pet.position, petObjectInput[1]+1);
		console.log (petObjectInput[1]);
	};
};

Pet.prototype.petInterst = function() 
{
};


