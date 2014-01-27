
//THIS IS FOR PHYSI
// Physijs.scripts.worker = "../tools/Physijs/physijs_worker.js";
// Physijs.scripts.ammo = "../Physijs/examples/js/ammo.js";

// GLOBALS
//documents size
var width, height;
var container, divTop, divBottom, divLeft, divRight;

var scene, renderer;
var camera;
    var cameraFov = 50;
    var lookAtVec;
    var camZ;
var projector;


//STARTING APP
setup();
function setup ()
{
    initScene();
    animate();
}
function initScene()
{
    //get widnow dimensions
    width = window.innerWidth;
    height = window.innerHeight;

    //create div for our scene and other cools stuff

    container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0px";
    document.body.appendChild(container);

    //Get the stylesheet
{
    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = 'css/style.css';
    // cssNode.media = 'screen';
    headID.appendChild(cssNode);
}
    //ASSIGNING CAMERA DIVS
{
    divRight = document.createElement("div");
    divTop = document.createElement("div");
    divLeft = document.createElement("div");
    divBottom = document.createElement("div");

    divTop.id = "camDivTop";
    divBottom.id = "camDivBottom";
    divLeft.id = "camDivLeft";
    divRight.id = "camDivRight";

    container.appendChild(divTop);
    container.appendChild(divBottom);
    container.appendChild(divLeft);
    container.appendChild(divRight);
}
    // END OF ASSIGNING CAMERA DIVS

    // CAMERA
    camera = new THREE.PerspectiveCamera(cameraFov, width/height, 1, 10000);
    camera.position.y = 200;
    camera.position.z = 200;
    camZ = camera.position.z; // this may not be useful soon
    //starting at null vec
    lookAtVec = new THREE.Vector3(0,0,0);
     // check whether mouse is near the corners
    checkCameraMove();

    // MAKE SCENE WITH PHYSIJS
    // scene = new Physijs.Scene();
    // scene.setGravity(new THREE.Vector3( 0, -30, 0 ) );
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xaaccdd, 1000, 4500 );

    // Make Projector
    projector = new THREE.Projector();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width , height);
    container.appendChild(renderer.domElement);
    //these two are needed to make sure cam divs dont reposition display canvas
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.position  = "relative";

    // LIGHTS ON
   setupLights();
   initSceneObjects();



    // EVENT LISTENERS
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener( 'mousedown', onDocumentMouseDown, true );
    window.addEventListener( 'mousemove', onDocumentMouseMove, true );

    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);
    window.addEventListener('keypress', handleKeyPress, false);
}

function onWindowResize(e)
{
    // scene.simulate();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // effect.setSize(window.innerWidth, window.innerHeight);
    // effect.render(scene, camera);
    renderer.render( scene, camera );
}


