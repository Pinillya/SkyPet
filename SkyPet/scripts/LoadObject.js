var manager = new THREE.LoadingManager();
var loaderIMG = new THREE.ImageLoader( manager );
var loaderJSON = new THREE.JSONLoader();
var loaderOBJ = new THREE.ObjectLoader();
var texture = new THREE.Texture();

var meshesJSON = {};

manager.onProgress = function ( item, loaded, total )
{
    console.log( item, loaded, total );
};

function loadModel(texUrl, modelUrl)
{
    // TODO make it differenciate between different model formats
    if(!modelUrl)
    {
        alert("Need model URL");
        return;
    }
    if(texUrl !== null)
    {
        loadTexture(texUrl);
    }
}
function loadTexture()
{
  //maybe make it just return texture?
    loaderIMG.load( "../models/island/island_texture.png", function ( image )
    {
        texture.image = image;
        texture.needsUpdate = true;
    } );
}

var geom = new THREE.CubeGeometry(5,5,5);
var cubes = new THREE.Object3D();
var range = 40;

function pcubes(ile)
{
     for (var i = 0; i < ile; i++)
    {
        var grayness = Math.random() * 0.5 + 0.25,
            mat = new THREE.MeshPhongMaterial(),
            box = new Physijs.BoxMesh( geom, mat );
        mat.color.setRGB (grayness, grayness, grayness );
        box.position.set( range * (0.5 - Math.random()), range * (0.5 - Math.random())+40 , range * (0.5 - Math.random()) );
        box.rotation.set(Math.random(), Math.random(), Math.random() );
        box.grayness = grayness;
        box.castShadow = true;
        box.material.opacity = 0.7;
        box.castShadow = true;
        // scene.add(box);
        scene.add(box);
    }
}



// TO ACCES IT meshesJSON.meshName.position.set(0,15,0)
function addJSONtoList(meshName, material, tex) {
    return function(geometry) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map: tex}));
        scene.add(mesh);
        meshesJSON[meshName] = mesh;
        meshesJSON[meshName].position.set(0,15,0);
        isMovingObj = true;
    };
}
function loadJSONmodel(texurl, modelUrl)
{
   var tex = THREE.ImageUtils.loadTexture(texurl);
   var material = Physijs.createMaterial(
           new THREE.MeshPhongMaterial({ map: tex}),
           0.8, // high friction
           0.4 // low restitution
           );

   loaderJSON.load( modelUrl, function( geometry)
    {

       mesh = new Physijs.BoxMesh(geometry, material, 20);
       // mesh.scale.set(2,2,2);

       mesh.position.set(15,15,0);
       mesh.recieveShadow = true;
       scene.add(mesh);
       // mesh.position = new THREE.Vector3(0, 10, 0);
     });
}
function loadJSONmodelNoP(texurl, modelUrl)
{
  var _texurl = texurl || "../img/mushroom.png";
  var _modelUrl = modelUrl || "../models/mushroom.js";
  var tex = THREE.ImageUtils.loadTexture(_texurl);
  // var name = name || modelUrl.split("/")[1].split(".")[0];
 var name = "shroom";
  var material = new THREE.MeshPhongMaterial( { map: tex } );
  loaderJSON.load( _modelUrl, addJSONtoList(name, material, tex));
}



