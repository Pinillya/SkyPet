  var mouse = {
  	x: 0,
  	y: 0
  };
  var listOfPressedKeys = [];

  function onDocumentMouseDown(event)
  {
  	var hit = intersect(event);
  	if (!hit[0]) return false;

  	// inverse.getInverse(islandHolder.matrix);
  	worldMouse.set(hit[0].point.x, hit[0].point.y, hit[0].point.z);
  	checkIfPlaced();

  	s = new Shockwave(worldMouse.x, worldMouse.y + 8, worldMouse.z);
  	// worldMouse.applyMatrix4(inverse);
  	// last.set(worldMouse.x, worldMouse.y, worldMouse.z, 1);
  	// console.log("worldMouse: " + worldMouase.x + worldMouse.y + worldMouse.z);
  	// makeCube(worldMouse.x, worldMouse.y +8, worldMouse.z, 0.25);

  }
   // var inverse = new THREE.Matrix4();
  var vect = new THREE.Vector3();
  var ray = new THREE.Raycaster();
   // var last = new THREE.Vector4();s
  var worldMouse = new THREE.Vector3();

  function intersect(e)
  {
  	vect.set((e.pageX / window.innerWidth) * 2 - 1, -(e.pageY / window.innerHeight) * 2 + 1, 0.5);

  	projector.unprojectVector(vect, camera);
  	ray.set(camera.position, vect.sub(camera.position).normalize());

  	return ray.intersectObjects(scene.children, true);
  }
  var mouseDown = false;

  function onDocumentMouseUp(e)
  {
  	mouseDown = true;

  }

  function onDocumentMouseMove(event)
  {
  	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  	mouse.z = 0.5;

  	var hit = intersect(event);
  	if (!hit[0]) return false;
  	worldMouse.set(hit[0].point.x, hit[0].point.y, hit[0].point.z);

  	checkIntersections();
  	checkObjectsToPlace();
  }



  function handleKeyDown(event)
  {
  	listOfPressedKeys[event.keyCode] = true;
  	if (String.fromCharCode(event.keyCode) == "F")
  	{

  	}
  	// If you want to have a log for keydown you can uncomment the two lines below.
  	// console.log("keydown - keyCode=%d, charCode=%d",
  	//             event.keyCode, event.charCode);
  	//STOPS SCROLLING OURWEBSITE WOHOOOO or does it
  	if (String.fromCharCode(event.keyCode) == "W")
  	{
  		if (testChar.tchar.startTile != 1)
  			testChar.tchar.currentTile = 1;
  	}
  	else if (String.fromCharCode(event.keyCode) == "S")
  	{
  		if (testChar.tchar.startTile != 9)
  			testChar.tchar.currentTile = 9;
  	}
  	else if (String.fromCharCode(event.keyCode) == "A")
  	{
  		if (testChar.tchar.startTile != 18)
  			testChar.tchar.currentTile = 19;
  	}
  	else if (String.fromCharCode(event.keyCode) == "D")
  	{
  		if (testChar.tchar.startTile != 18)
  			testChar.tchar.currentTile = 18;
  	}
  	return false;
  }

  function handleKeyUp(event)
  {


  	if (listOfPressedKeys[87] || listOfPressedKeys[83] || listOfPressedKeys[65] || listOfPressedKeys[68])
  	{
  		if (testChar !== null && testChar.tchar.moving == true)
  		{
  			testChar.tchar.moving = false;
  		}
  	}
  	listOfPressedKeys[event.keyCode] = false;

  	// If you want to have a log for keyup you can uncomment the two lines below.
  	// console.log("keyup - keyCode=%d, charCode=%d",
  	//             event.keyCode, event.charCode);


  }

  function handleKeyPress(event)
  {
  	// If you want to have a log for keypress you can uncomment the two lines below.
  	// console.log("keypress - keyCode=%d, charCode=%d",
  	//             event.keyCode, event.charCode);


  }


  function handlePressedDownKeys()
  {
  	if (listOfPressedKeys[38])
  	{


  	}
  	if (listOfPressedKeys[40])
  	{

  	}
  	if (listOfPressedKeys[87]) //"w"
  	{
  		// stopEverything = !stopEverything;
  		if (testChar !== null)
  		{
  			testChar.mesh.position.z -= testChar.walkSpeed;
  			testChar.tchar.moving = true;
  			testChar.tchar.startTile = 1;
  			testChar.tchar.lastTile = 8;

  		}
  	}
  	if (listOfPressedKeys[83]) // s
  	{
  		if (testChar !== null)
  		{
  			testChar.mesh.position.z += testChar.walkSpeed;

  			testChar.tchar.moving = true;
  			// testChar.tchar.currentTile = 9;
  			testChar.tchar.startTile = 9;
  			testChar.tchar.lastTile = 17;


  			// console.log(testChar.startTile, + " " + testChar.lastTile);
  		}
  	}
  	if (listOfPressedKeys[65]) //a
  	{
  		if (testChar !== null)
  		{
  			if (testChar.tchar.currentTile < 23)
  			{
  				testChar.mesh.position.x -= 1.5;
  			}
  			else
  				testChar.mesh.position.x -= 0.75;
  			testChar.tchar.moving = true;
  			// testChar.tchar.currentTile = 18;
  			testChar.tchar.startTile = 18;
  			testChar.tchar.lastTile = 26;
  			testChar.mesh.rotation.y = 0;
  		}
  	}
  	if (listOfPressedKeys[68]) //d
  	{
  		if (testChar !== null)
  		{

  			if (testChar.tchar.currentTile < 23)
  			{
  				testChar.mesh.position.x += 1.5;
  			}
  			else
  				testChar.mesh.position.x += 0.75;
  			testChar.tchar.moving = true;
  			// testChar.tchar.currentTile = 18;
  			testChar.tchar.startTile = 18;
  			testChar.tchar.lastTile = 26;
  			testChar.mesh.rotation.y = 180 * (Math.PI / 180);
  		}
  	}
  	if (listOfPressedKeys[81]) //q
  	{
  		testChar.mesh.rotation.y += 0.1;
  		console.log(testChar.mesh.rotation.y);
  	}
  	if (listOfPressedKeys[69]) //e
  	{

  	}
  	if (listOfPressedKeys[70]) //f
  	{
  		if (!p)
  		{
  			p = new aPet();
  			p.animator.addSheet(idle1, "idle1");
  		}

  	}
  	if (listOfPressedKeys[49]) //1
  	{
  		camera.position.x = 0;
  		camera.position.z = camZ;
  		lookAtVec.x = 0;
  		lookAtVec.z = 0;
  	}
  	if (listOfPressedKeys[50]) //2
  	{
  		camera.position.x = pets[0].pet.position.x;
  		camera.position.z = pets[0].pet.position.z + camZ;
  		lookAtVec.x = pets[0].pet.position.x;
  		lookAtVec.z = pets[0].pet.position.z;
  	}
  	if (listOfPressedKeys[51]) //3
  	{
  		camera.position.x = pets[1].pet.position.x;
  		camera.position.z = pets[1].pet.position.z + camZ;
  		lookAtVec.x = pets[1].pet.position.x;
  		lookAtVec.z = pets[1].pet.position.z;
  	}
  	if (listOfPressedKeys[52]) //4
  	{
  		if (p)
  		{
  			var a = p.getTex();
  			a.offset.x -= 0.0009;
  			console.log("offset.x: " + a.offset.x + ", offset.y: " + a.offset.y);
  		}
  	}
  	if (listOfPressedKeys[53]) //5
  	{
  		if (p)
  		{
  			var a = p.getTex();
  			a.offset.x += 0.0009;
  			console.log("offset.x: " + a.offset.x + ", offset.y: " + a.offset.y);

  		}
  	}
  	if (listOfPressedKeys[54]) //6
  	{
  		if (p)
  		{
  			var a = p.getTex();
  			a.offset.y += 0.0009;
  			console.log("offset.x: " + a.offset.x + ", offset.y: " + a.offset.y);
  		}
  	}
  	if (listOfPressedKeys[55]) //8
  	{
  		if (p)
  		{
  			var a = p.getTex();
  			a.offset.y -= 0.0009;
  			console.log("offset.x: " + a.offset.x + ", offset.y: " + a.offset.y);
  		}
  	}
  }
