var simplex;
var islandHolder;

function initIsland(x, y, z, rad)
{
	simplex = new SimplexNoise();
	islandHolder = new THREE.Object3D();
	var islandPts = [];
	var radius = rad || 250; // sette in min radius, men hvor skal den brukes?
	var offset = {};
	offset.x = 150;
	offset.y = 150;
	for (var i = 0; i < Math.PI * 2.0; i += 0.2)
	{
		var aRadius = simplex.noise(i, i) * (radius / 7) + radius;
		var shapeX = Math.sin(i) * aRadius + offset.x;
		var shapeY = Math.cos(i) * aRadius + offset.y;
		islandPts.push(new THREE.Vector2(shapeX, shapeY));
	}
	var tPts = [];

	var islandShape = new THREE.Shape(islandPts);
	islandShape.name = "ass";
	// scene.add(islandShape);

	var extrudeSettings = {
		amount: 1
	};
	var geometry = new THREE.ExtrudeGeometry(islandShape, extrudeSettings);
	geometry.computeCentroids();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals(); // requires correct face normals


	var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [new THREE.MeshPhongMaterial(
	{
		color: 0x55dd55
	}), new THREE.MeshPhongMaterial(
	{
		color: 0x000000,
		wireframe: true,
		transparent: false
	})]);

	mesh.position.set(x, y, z);
	mesh.rotation.set(Math.PI / 2, 0, 0);
	mesh.scale.set(1, 1, 1);
	mesh.name = "Floating Island";
	mesh.recieveShadow = true;
	// meshesJSON["island"] = mesh;
	// objects.push(mesh);
	islandHolder.add(mesh);
	scene.add(islandHolder);

}
