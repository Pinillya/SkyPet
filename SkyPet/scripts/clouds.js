var cloudGeometry, cloudMaterial, cloudMesh;
var cloudContainer = [];
function initClouds()
{
    cloudGeometry = new THREE.Geometry();
    var cloudTexture = THREE.ImageUtils.loadTexture("../img/cloud_sprite.png", null, animate);
    cloudTexture.magFilter = THREE.LinearMipMapLinearFilter;
    cloudTexture.minFilter = THREE.LinearMipMapLinearFilter;

    var skyFog = new THREE.Fog( 0xff0000, - 100, 3000 );

    cloudMaterial = new THREE.MeshBasicMaterial({color: 0xffffff,map: cloudTexture, depthTest: true, depthWrite: true, transparent: true});

    cloudMaterial2 = new THREE.ShaderMaterial(
    {
        uniforms:
        {
            "map": {type: "t", value: cloudTexture },
            "fogColor": {type: "c", value: skyFog.color},
            "fogNear": {type: "f", value: skyFog.near},
            "fogFar": {type: "f", value: skyFog.far},
        },
        vertexShader: cloudVertexShader,
        fragmentShader: cloudFragmentShader,
        depthWrite: false,
        depthTest: false,
        transparent: true
    });
    var cloudPlane = new THREE.Mesh( new THREE.PlaneGeometry(64,64) );
    for(var i = 0; i < 2000; i++)
    {
        cloudPlane.position.x = Math.random() * 1000 - 500;
        cloudPlane.position.y = Math.random() * 20 - 50;
        cloudPlane.position.z = i - 30;
        cloudPlane.rotation.z = Math.random() * Math.PI;
        cloudPlane.scale.x = cloudPlane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
        THREE.GeometryUtils.merge(cloudGeometry, cloudPlane);
    }
    cloudMesh = new THREE.Mesh ( cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);
    // cloudContainer.push(cloudMesh);
    cloudMesh = new THREE.Mesh ( cloudGeometry, cloudMaterial);
    cloudMesh.position.z = -2000;
    scene.add(cloudMesh);

}

var cloudVertexShader =
"varying vec2 vUv;" +
"void main()" +
"{" +
"vUv = uv;" +
"gl_Position = projectionMatrix * modelViewMatrix * vec4(posiiton, 1.0);" +
"}"
;
var cloudFragmentShader =
"uniform sampler2D map;" +
"uniform vec3 fogColor;" +
"uniform float fogNear;" +
"uniform flaot fogFar;" +
"varying vec2 vUv;" +
"void main()" +
"{" +
"flaot depth = gl_FragCoord.z / gl_FragCoord.w;" +
"float fogFactor = smoothstep(fogNear, fogFarm depth);" +
"gl_FragColor = texture2D(map, vUv);" +
"gl_FragColor.w *= pow(gl_FragCoord.z, 20.0);" +
"gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);" +
"}"
;
