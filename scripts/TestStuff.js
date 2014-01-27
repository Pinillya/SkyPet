function makeCube(px, pz, ps)
{
    var x = px || 150;
    var z = pz || 50;
    var s = ps || 1;
    var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );
    var cubeMaterial =
        new THREE.MeshLambertMaterial( { color: 0x000088 } );

        cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
        cube.position.set(x,15,z);
        cube.scale.set(s,s,s);
        cube.name = "Cube";

        scene.add(cube);
}
