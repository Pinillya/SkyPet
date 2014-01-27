
//-------Globals-------
var lastTime = 0;
var deltaTime = 0;

var stopEverything = false; //Temp for testing
function draw () 
{
	if (!stopEverything){
		//deltaTime will be used to adjust updates
		var timeNow = new Date().getTime();
		if (lastTime != 0) {
	      deltaTime = timeNow - lastTime;
	    }
	    lastTime = timeNow;
		movePets();
	}

	playerInput();
	renderer.render( scene, camera );
	requestAnimationFrame(draw);
}

var frameCounter = 0;
function movePets () 
{	
	//framecounter is used to regulate how often the pet checks for objects
	//So it wont do it too often.
	if (frameCounter > 100)
	{
		frameCounter = 0;
	}
	else {
		frameCounter++;
	}

	//Smells and listen for objects around it - see description in the Pet class under "checkObjects"
	if (frameCounter == 1 || frameCounter == 50) 
	{
		for (var i = pets.length-1; i >= 0; i--) 
		{
			for (var j = objects.length - 1; j >= 0; j--) {
				pets[i].checkObjects(i, j);
			};
		};
	};

	//Moves the pet in the pets own moving function, framecount will be
	//used to make random positions for the pet.
	for (var i = pets.length - 1; i >= 0; i--) 
	{
		pets[i].moving(frameCounter);
	};
}