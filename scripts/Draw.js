var lastTime = 0;
var deltaTime = 0;

var stopEverything = false; //Temp for testing

function animate()
    {
        //physijs demands
        // scene.simulate();
        requestAnimationFrame( animate );
        //checking for objects to highlioght on mouse over
        checkIntersections();
        //callt to render
        render();
        if (!stopEverything)
        {
            //deltaTime will be used to adjust updates
            var timeNow = new Date().getTime();
            if (lastTime !== 0)
            {
              deltaTime = timeNow - lastTime;
            }
            lastTime = timeNow;
            if(pets.length > 0)
                movePets();
        }
    }

function render()
{
    //just for the sake of that
    skyBox.rotation.y += 0.0001;
    // checks if mouse is over one of the divs on the edges
    moveCamera();
    // actual rendering
    renderer.render( scene, camera );
}

var frameCounter = 0;
function movePets ()
{
    //framecounter is used to regulate how often the pet checks for objects
    //So it wont do it too often.
    if (frameCounter > 100)
    {
        frameCounter = 0;
    }
    else {
        frameCounter++;
    }

    //Smells and listen for objects around it - see description in the Pet class under "checkObjects"
    if (frameCounter == 1 || frameCounter == 50)
    {
        for (var i = pets.length-1; i >= 0; i--)
        {
            for (var j = objects.length - 1; j >= 0; j--) {
                pets[i].checkObjects(i, j);
            };
        };
    };

    //Moves the pet in the pets own moving function, framecount will be
    //used to make random positions for the pet.
    for (var i = pets.length - 1; i >= 0; i--)
    {
        pets[i].moving(frameCounter);
    };
}


//I WILL PLACE THE CODE UNDERNEATH IN ANOTHER FILE AT A LATER POINT


//CODE FOR RTS LIKE CAMERA HERE
{
    // This one manages camera movement
     var RtsCam =
    {
        camXminus:false,
        camXplu:false,
        camZminus:false,
        camZplus:false
    };

    //checking if mouse is over the divs on the screen edges. if so trigger movement
    function checkCameraMove()
    {
    divLeft.onmouseover = function(){RtsCam.camXminus = true;};

    divRight.onmouseover =  function(){RtsCam.camXplus = true;};
    divTop.onmouseover = function(){RtsCam.camZminus = true;};
    divBottom.onmouseover =  function(){RtsCam.camZplus = true;};

    divLeft.onmouseout = function(){RtsCam.camXminus = false;};
    divRight.onmouseout =  function(){RtsCam.camXplus = false;};
    divTop.onmouseout = function(){RtsCam.camZminus = false;};
    divBottom.onmouseout =  function(){RtsCam.camZplus = false;};

    }
    // camera speed
    var camMoveSpeed = 3;
    //if div triggered, adjust camera position, and camera focus point
    // to do : make it work for diagonal movement too
    function moveCamera()
    {
       if(RtsCam.camXminus)
        {
            camera.position.x -= camMoveSpeed;
            lookAtVec.x -= camMoveSpeed;

        }
         if(RtsCam.camXplus)
        {
            camera.position.x += camMoveSpeed;
            lookAtVec.x += camMoveSpeed;
        }
         if(RtsCam.camZminus)
        {
            camera.position.z -= camMoveSpeed;
            lookAtVec.z -= camMoveSpeed;
        }
         if(RtsCam.camZplus)
        {
            camera.position.z += camMoveSpeed;
            lookAtVec.z += camMoveSpeed;
        }
    //after the moving is done, make sure to point camera in the right direction
    //if this is gone, camera wil do strange things including rotation around one point with sttrange effects
    camera.lookAt(lookAtVec);
    //not sure about this one, works fine without it too.
    camera.updateProjectionMatrix();
     }
}
//END OF RTS LIKE CAMERA CODE

// Checking if mouse cursor is over an object, if so, highlight that object
// on mouse out, return object to its original state
// todo: figure out why island is not being detected
var INTERSECTED;
function checkIntersections()
{
    //make vector representing already adjusted mouse coords. nobody knows why z must be set to either 0.5 or 1, even mrdoob :)
    var mv = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    //unproject the mouse vector. (2d to 3d)
    projector.unprojectVector( mv, camera );
    //cast ray from mouse position into the scene
    var ray = new THREE.Raycaster( camera.position, mv.sub( camera.position ).normalize(), 1, 1000 );
   // var ray = projector.pickingRay(mv.clone(), camera);
   //count intersections
    var intersects = ray.intersectObjects( scene.children );
    //if there are more than 0 interections, do :
    if( intersects.length > 0 )
    {
        //problem - i want to have coordinates of intersection displayed, .point does not help so far. need something else i guess
        // console.log("intersection at: " + intersects[ 0 ].point);
        //check if this object is already being stored as itnersected
        if( intersects[0].object != INTERSECTED )
        {
            // if previous object exist, restore its state to normal
            if(INTERSECTED)
            {
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex );
            }
            //store reference to the new intersected object
            INTERSECTED = intersects[ 0 ].object;
            //store its color, so we can return it after interesection is done
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            //set new color for the time
            INTERSECTED.material.color.setHex( 0xffffff);

        }
    }
    else
    {
        if( INTERSECTED )
        {
            INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
            INTERSECTED = null;
        }
    }
}

