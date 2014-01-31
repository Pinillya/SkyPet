var pets = [];
var objects = [];

function initSceneObjects()
{
     //SKyBox
    addSky();
    //Island
    initIsland();
    //Pet
    makeAMesh();
    //testCube
    // makeCube();
}

function makeAMesh ()
{
    //Making pets
    pets[0] = new Pet("img/Pet/pet.png", -50, 25, 0);

    //Making food object
    var parametersObject =
    {
        "position" : new THREE.Vector3(70,25,70),
        "texture"  : '../img/Inside/food.png',
        "nameId"   : 'food01',
        "sizeX"    : 25,
        "sizeY"    : 25,
        "smellRad" : 50,
        "soundRad" : 100,
        "isStatic" : true,
        "hasSmell" : true,
        "hasSound" : true,
        "hasAni"   : false,
        "initValue": 60
    };
    objects[1] = new Object(parametersObject);
    parametersObject.position = new THREE.Vector3(50,25,120);
    //objects[2] = new Object(parametersObject);
    parametersObject.position = new THREE.Vector3(140,25,150);
    //objects[2] = new Object(parametersObject);
}
