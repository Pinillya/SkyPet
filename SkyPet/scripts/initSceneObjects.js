//Items
var testChar = null;
var pet;
var objects = [];
var ObjPos = [];
var petKnownObjPos = [];

//World
var worldGrid = [
	[]
];
var worldX;
var worldZ;

function initSceneObjects()
{
	//SKyBox
	addSky();
	//Island
	initIsland(100, 0, 100);
	initIsland(-350, 90, -250, 100);
	initIsland(-100, -80, 250, 80);
	//Pet
	makeAMesh();
	testChar = new tChar();
	pet = new Pet();
	makeWorldGrid();
	pet.activatingPet();
	//testCube
	// makeCube();
}

function makeAMesh()
{

	//Objects
	ObjPos[0] = new THREE.Vector3(100, 0, 100);
	objects[0] = new Toy(ObjPos[0]);

	ObjPos[1] = new THREE.Vector3(180, 0, 300);
	objects[1] = new Food(ObjPos[1]);

	ObjPos[2] = new THREE.Vector3(400, 0, 200);
	objects[2] = new Toy(ObjPos[2]);
}

function makeWorldGrid()
{
	var floored = Math.floor;
	var plane = [];
	var worldSizeX = 1200;
	var worldSizeZ = 1200;
	worldX = floored(worldSizeX / 50); //800/50 = 16
	worldZ = floored(worldSizeZ / 50); //800/50 = 16

	var
	i,
		j;

	var material = new THREE.MeshBasicMaterial(
	{
		vertexColors: THREE.FaceColors,
		overdraw: 0.5
	});

	for (i = 0; i < worldX; i++)
	{
		worldGrid[i] = [];
		for (j = 0; j < worldZ; j++)
		{
			worldGrid[i][j] = 0;
			var gridPos = new THREE.Vector3(i * worldX, +10, j * worldZ);

			//Check to see if the item is within range of the nodes in the grid. 
			//We will give the peth a wide walking space.
			for (var k = 0, l = ObjPos.length; k < l; k++)
			{
				//Is there actually a object there? 
				if ((gridPos.x < ObjPos[k].x + worldX) && (gridPos.x > ObjPos[k].x - worldX))
				{
					if ((gridPos.z < ObjPos[k].z + worldZ) && (gridPos.z > ObjPos[k].z - worldZ))
					{
						var tempPosTester = false;
						//Does the pet know about this object?
						for (var m = 0; m < petKnownObjPos.length; m++)
						{
							if (ObjPos[k] == petKnownObjPos[m])
							{
								worldGrid[i][j] = 2;
								tempPosTester = true;
							}
							else
							{

							}
						};

						if (!tempPosTester)
						{
							worldGrid[i][j] = 1;
						}
					}
				}
				//else if ()
			};

			//Visual Test Grid: Need to turn on material and if you want to test with effect when a path is made,
			//make plane[] global and activate the test loop in "PetMovement"

			if (worldGrid[i][j] == 0)
			{
				plane[j + (i * worldX)] = new THREE.Mesh(
					new THREE.PlaneGeometry(
						5,
						5),
					material);
				scene.add(plane[j + (i * worldX)]);
				plane[j + (i * worldX)].position = gridPos;
			}

			if (worldGrid[i][j] == 1)
			{
				plane[j + (i * worldX)] = new THREE.Mesh(
					new THREE.PlaneGeometry(
						10,
						10),
					material);
				scene.add(plane[j + (i * worldX)]);
				plane[j + (i * worldX)].position = gridPos;
			}

			if (worldGrid[i][j] == 2)
			{
				plane[j + (i * worldX)] = new THREE.Mesh(
					new THREE.PlaneGeometry(
						0,
						0),
					material);
				scene.add(plane[j + (i * worldX)]);
				plane[j + (i * worldX)].position = gridPos;
			}


		}
	}
}