//__________GLOBALS___________
var container;
var editorMainDiv;
var dragMe;

var camera, controls;
var scene, renderer;
var width, height;
init();
function init()
{
    //get widnow dimensions
    width = window.innerWidth;
    height = window.innerHeight;

    //create div for our scene and other cools stuff

    container = document.createElement("div");
    document.body.appendChild(container);

    // CAMERA
    camera = new THREE.PerspectiveCamera(50, width/height, 1, 10000);
    camera.position.y = 50;
    camera.position.z = 75;

    // ORBIT CONTROLS
    controls = new THREE.OrbitControls(camera);
    controls.rotateSpedd = 0.3;

    // dat GUI for testing
    gui = new dat.GUI();


    // MAKE SCENE WITH PHYSIJS
    scene  = new THREE.Scene();

    console.log("as");




    // RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width , height);

initEditor();
    container.appendChild(renderer.domElement);

    // EVENT LISTENERS
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener( 'mousedown', onDocumentMouseDown, true );

    animate();

}

function onWindowResize(e)
{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // effect.setSize(window.innerWidth, window.innerHeight);
    // effect.render(scene, camera);
    renderer.render( scene, camera );
}
function onDocumentMouseDown(e)
{
    console.log(event.clientX, event.clientY);
}

function animate()
    {

        requestAnimationFrame( animate );

        render();
    }

    function render()
    {


        // sphere.position.y = Math.abs(Math.sin(timer * 0.002 ) ) * 150;
        // sphere.rotation.x = timer * 0.0003;
        // sphere.rotation.z = timer * 0.0002;

        controls.update();

        renderer.render( scene, camera );
    }

function initEditor(container)
{
    //style insert
    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = 'css/editorStyle.css';
    // cssNode.media = 'screen';
    headID.appendChild(cssNode);

    //make elements
    editorMainDiv = document.createElement("div");
    editorMainDiv.innerHTML = " Rock the voxophone!";
    editorMainDiv.id = "editorMain";
    // editorMainDiv.style.backgroundColor = "44eeff";
    container.appendChild(editorMainDiv);

    dragMe = document.createElement("div");
    dragMe.innerHTML = "Objects shall be added";
    dragMe.id ="dragMe";
    dragMe.addEventListener("mousedown", function(e)
    {
        dragStarted(e);
    });
    editorMainDiv.appendChild(dragMe);

}
function dragStarted(e)
{
        editorMainDiv.style.left = e.clientX + "px";
        editorMainDiv.style.top = e.clientY + "px";

}
