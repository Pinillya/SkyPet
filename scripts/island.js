var simplex;
function initIsland()
{
    simplex = new SimplexNoise();
    var islandPts = [];
    var radius = 250; // sette in min radius, men hvor skal den brukes?
    var offset = {};
        offset.x = 150;
        offset.y = 150;
    for(var i=0; i<Math.PI*2.0; i+= 0.2)
    {
        var aRadius = simplex.noise(i,i)*(radius/7)+radius;
        var shapeX = Math.sin(i) * aRadius + offset.x;
        var shapeY = Math.cos(i) * aRadius + offset.y;
        islandPts.push( new THREE.Vector2 (shapeX , shapeY) );
    }
    var tPts = [];

    var islandShape = new THREE.Shape( islandPts );
    var extrudeSettings = {amount : 1};
    var geometry = new THREE.ExtrudeGeometry( islandShape, extrudeSettings );
    geometry.computeCentroids()   ;
    geometry.computeFaceNormals();
    geometry.computeVertexNormals(); // requires correct face normals

                    var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [ new THREE.MeshPhongMaterial( { color: 0x55dd55 } ), new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: false, transparent: false } ) ] );
                    mesh.position.set( -70, 0, -50  );
                    mesh.rotation.set( Math.PI / 2, 0, 0 );
                    mesh.scale.set( 1, 1, 1 );
                    mesh.name = "Floating Island";
                    // meshesJSON["island"] = mesh;
                    // objects.push(mesh);
                    scene.add( mesh );

}
