var lastTime = 0;
var deltaTime = 0;
var clock = new THREE.Clock();
var stopEverything = false; //Temp for testing
var que = [];

function animate()
{
	requestAnimationFrame(animate);
	var delta = clock.getDelta();
	moveCamera();

	//checking for objects to highlioght on mouse over
	//callt to render
	// checkIntersections();
	handlePressedDownKeys();

	if (testChar !== null)
	{
		testChar.tchar.update(1000 * delta);
	}
	// checkIntersections();
	if (pet) // for tresting naimations
	{
		pet.update();
		pet.animator.update(1000 * delta);
	}
	if (s)
	{
		s.animate(1000 * delta);
		s.sphere.visible = false;
		s.sphereCamera.updateCubeMap(renderer, scene);
		s.sphere.visible = true;
	}
	skyBox.rotation.y += 0.0001;
	/*	if (!stopEverything)
	{
		//deltaTime will be used to adjust updates
		var timeNow = new Date().getTime();
		if (lastTime !== 0)
		{
			deltaTime = timeNow - lastTime;
		}
		lastTime = timeNow;
		if (pets.length > 0)
			movePets();
	}*/
	render();
}

function render()
{
	renderer.render(scene, camera);
}

var frameCounter = 0;

/*
function movePets()
{
	//framecounter is used to regulate how often the pet checks for objects
	//So it wont do it too often.
	if (frameCounter > 100)
	{
		frameCounter = 0;
	}
	else
	{
		frameCounter++;
	}

	//Smells and listen for objects around it - see description in the Pet class under "checkObjects"
	if (frameCounter == 1 || frameCounter == 50)
	{
		for (var i = pets.length - 1; i >= 0; i--)
		{
			for (var j = objects.length - 1; j >= 0; j--)
			{
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
}*/