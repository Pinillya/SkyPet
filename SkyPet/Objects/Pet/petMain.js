//Illy Binfield, 2014, pet.js
//Pet class. The pet class will be initiated as the pet is created.
//the pet class holds all the functiuons used in conection with the pet.
function Pet()
{
	console.log("Making the pet");

	//***Pet basic attributes**************
	//Setting up the unique pets variables:
	this.position = new THREE.Vector3(300, 50, 300);
	this.nameId = 'pet';
	this.sizeX = 100;
	this.sizeY = 100;
	this.smellRad = 90;
	this.soundRad = 0; //Adjustable
	this.visionFront = 400;

	//***Pet texture**************
	//create an Animator instance within
	this.animator = new Animator(this);
	//setting up URL to where the .json and .png files are stored
	this.animator.setSheetsURL("../../img/Pet/anim/");
	// Preparing sprite sheets. Array["filename1", "desiredAnimationID1", "filename2" etc..]
	// making in public so that we can showe in some more later if needed, although there are other ways to do that such as "addSheet()" method.
	this.sheets = ["Fly2Sprite", "fly", "IdleSprite2", "idle2", "Walk2", "walk"];
	//loading sheets from json files
	this.animator.loadSheets(this.sheets);
	this.animator.preloadTextures();
	this.animator.setDefaultAnimation("idle2", 0, 23);

	var texture;
	//animID as paramenter. Will find it in aviable sheets and load proper .png image
	texture = this.animator.textureFromSheet("idle2", true);

	//just material
	this.material = new THREE.MeshBasicMaterial(
	{
		map: texture,
		side: THREE.DoubleSide,
		transparent: true,
	});

	// set material needsUpdate property to true
	this.material.map.needsUpdate = true;
	//Reference material to the Animator so it can do all the operations it needs such as swapping maps and all that goood stuff. Important to remeber this step.
	this.animator.referenceMaterial(this.material);

	//standard mesh setup apart from one thing
	var geometry = new THREE.PlaneGeometry(50, 75, 1, 1);
	var mesh = new THREE.Mesh(geometry, this.material);
	mesh.position = this.position;
	//mesh.position.set(100, 50, 110);
	// rotating mesh upside down basicly. reason for that is we do not flip texture Y at import because if we do so animation goes bonkers. To compensate for upside down texture we might as well do this. Or something else, as you prefer.
	mesh.rotation.x = 180 * (Math.PI / 180);
	scene.add(mesh);

	//***Brain**************
	//As the pets starts it knows no items: 
	//A list of all the items the pet has encounterd before, and how many times it has encountered it. 
	this.petItemsKnown = new Array();
	this.petEncounterCounter = new Array();
	petItemsKnown[0] = "0";

	//***ShortTerm Memorie:
	//Observe
	this.StmO1 = new Array();
	this.StmO2 = new Array();
	this.StmO3 = new Array();
	//HearingSound
	this.StmHS1 = new Array();
	this.StmHS2 = new Array();
	this.StmHS3 = new Array();
	//Interaction
	this.StmI1 = new Array();
	this.StmI2 = new Array();
	this.StmI3 = new Array();
	//***LoongTerm Memorie:
	//Observe
	this.LtmO1 = new Array();
	this.LtmO2 = new Array();
	this.LtmO3 = new Array();
	//HearingSound
	this.LtmHS1 = new Array();
	this.LtmHS2 = new Array();
	this.LtmHS3 = new Array();
	//Interaction
	this.LtmI1 = new Array();
	this.LtmI2 = new Array();
	this.LtmI3 = new Array();
	//***Sunconshious Memorie:
	//Observe
	this.SubO1 = new Array();
	this.SubO2 = new Array();
	this.StmO3 = new Array();
	//HearingSound
	this.SubHS1 = new Array();
	this.SubHS2 = new Array();
	this.SubHS3 = new Array();
	//Interaction
	this.SubI1 = new Array();
	this.SubI2 = new Array();
	this.SubI3 = new Array();

	//***Making the pet Mood and actionList*****************
	//The pets mood is a vector2 on a mood scale.
	this.petCurrentMood = new THREE.Vector2(-9, 9);
	this.petMoodPersonality = {
		useOfEnergy: 0.5,
		digestion: 2,
		enegry: 0.9,
		anger: 0.9,
		moodSwings: 1
	};
	this.mood = new Mood(this.petMoodPersonality, this.petCurrentMood);
	this.actionList = new Action(this.mood);

	//***Pet movement*****************
	//The position the pet is currently walking towards
	this.petTargetPos = new THREE.Vector3(0, 0, 0);
	this.currentPath = [];
	this.movementInfo = 1;
	this.stopMoving = false;

};

Pet.prototype.activatingPet = function()
{
	pet.senses();
	setTimeout(pet.activatingPet, 4000);
}

Pet.prototype.update = function()
{
	if (!this.stopMoving)
	{
		this.soundRad = 20;
		pet.move();
	};
};
/*
Pet.prototype.render = function()
{
	//pet.visual();
};
*/