var pets = [];
var pet1;
function initPet()
{
    pet1 = new Pet("img/Pet/pet.png", 75, 25 );
    pets.push( pet1);
}

function Pet (petTexture, xCoordinates, yCoordinates)
{
    //var pet;
    var petMaterial;
    var texture = THREE.ImageUtils.loadTexture(petTexture);


    ///Make the man
    var petHight = 10, petWith = 10, petQuality = 10, petYPos = petHight/2;
    petMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true});

    this.pet = new THREE.Mesh(
        new THREE.PlaneGeometry(
        petWith,
        petHight,
        2,
        petQuality,
        petQuality),
        petMaterial);
    this.pet.castShadow = true;
    this.pet.rotation.x = -25 * (Math.PI / 180);
    this.pet.scale.set(8,8,8);
    // this.pet.position.set(0,5,0);

    scene.add(this.pet);
    this.pet.position.y = petYPos + yCoordinates;
    this.pet.position.x = xCoordinates;
}
