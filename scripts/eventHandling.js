var mouse = { x: 0, y: 0 };
var listOfPressedKeys = [];

function onDocumentMouseDown(event)
{
    // console.log(mouse.x + "  " + mouse.y);
    var vector = new THREE.Vector3(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );

    projector.unprojectVector( vector, camera );

    var dir = vector.sub( camera.position ).normalize();

    var distance = - camera.position.z / dir.z;

    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    var worldX =  pos.x + camera.position.x;
    var worldZ = pos.y ;
    makeCube( worldX, -worldZ, 0.25 );

}

function onDocumentMouseUp(e)
{

}
function onDocumentMouseMove(event)
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    mouse.z = 0.5;
}



function handleKeyDown(event) {
  listOfPressedKeys[event.keyCode] = true;
  if (String.fromCharCode(event.keyCode) == "F")
  {

  }
  // If you want to have a log for keydown you can uncomment the two lines below.
  // console.log("keydown - keyCode=%d, charCode=%d",
  //             event.keyCode, event.charCode);
    return false; //STOPS SCROLLING OURWEBSITE WOHOOOO or does it
}

function handleKeyUp(event) {
  listOfPressedKeys[event.keyCode] = false;

  // If you want to have a log for keyup you can uncomment the two lines below.
  // console.log("keyup - keyCode=%d, charCode=%d",
  //             event.keyCode, event.charCode);
}

function handleKeyPress(event) {
  // If you want to have a log for keypress you can uncomment the two lines below.
   // console.log("keypress - keyCode=%d, charCode=%d",
  //             event.keyCode, event.charCode);

}


function handlePressedDownKeys()
{
    if (listOfPressedKeys[38])
    {


    }
    if (listOfPressedKeys[40])
    {

    }
    if (listOfPressedKeys[87])  //"w"
    {
      stopEverything = !stopEverything;
    }
    if (listOfPressedKeys[83]) // s
    {

    }
    if (listOfPressedKeys[65])  //a
    {

    }
    if (listOfPressedKeys[68]) //d
    {

    }
    if (listOfPressedKeys[81]) //q
    {

    }
    if (listOfPressedKeys[69]) //e
    {

    }
    if (listOfPressedKeys[70]) //f
    {

    }
    if (listOfPressedKeys[49]) //1
    {

    }
    if (listOfPressedKeys[50]) //2
    {

    }
    if (listOfPressedKeys[51]) //3
    {

    }
    if (listOfPressedKeys[52]) //4
    {

    }
}


