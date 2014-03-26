var light2;
var dirLicht;
var dirLich2;
function setupLights()
{
    var ambient = new THREE.AmbientLight( 0x101030 );
    // scene.add( ambient );

    light2 = new THREE.PointLight(0xffffff, 0.72);
    // scene.add(light2);



    dirLicht = new THREE.DirectionalLight(0xffffff);
    dirLicht.position.set(0,100,20 );
    dirLicht.castShadow = true;
    dirLicht.shadowCameraCisible = true;
    scene.add(dirLicht);

    dirLicht2 = new THREE.DirectionalLight(0xffffff);
    dirLicht2.position.set(45,-200,45 );
    dirLicht2.castShadow = true;
    // dirLicht2.shadowCameraVisible = true;
    // scene.add(dirLicht2);
}

