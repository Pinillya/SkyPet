var imagePrefix = "../img/skybox/sky1-";
var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
var imageSuffix = ".jpg";
var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
var materialArray = [];


for (var i = 0; i < 6; i++)
	materialArray.push(new THREE.MeshBasicMaterial(
	{
		map: THREE.ImageUtils.loadTexture(imagePrefix + directions[i] + imageSuffix),
		side: THREE.BackSide,
		color: 0xffffff
	}));
var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);

function addSky()
{
	scene.add(skyBox);
}
