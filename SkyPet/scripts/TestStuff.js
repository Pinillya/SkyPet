function makeCube(px, py, pz, ps)
{
	var x = px || 150;
	var y = py || 15;
	var z = pz || 50;
	var s = ps || 1;
	var cubeGeometry = new THREE.CubeGeometry(50, 50, 50);
	var cubeMaterial =
		new THREE.MeshLambertMaterial(
		{
			color: Math.random() * 0xffffff
		});

	cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.set(x, y, z);
	cube.scale.set(s, s, s);
	cube.name = "Cube";
	cube.castShadow = true;

	scene.add(cube);
}
var objectOne;
var objectTwo;

var Arr = ["three"];

var ObjClass = function()
{
	this.items = [];
	Array.prototype.push.apply(this.items, Arr);
	// this.items.push(Arr);
};

ObjClass.prototype.test = function()
{
	// this.items[0] = "one";
	this.items.push("one");
};

function exportScene()
{
	var exporter = new THREE.SceneExporter();
	var sceneJson = JSON.stringify(exporter.parse(scene));
	localStorage.setItem("scene", sceneJson);
}

function clearScene()
{
	scene = new THREE.Scene();
}

function importScene()
{
	var json = (localStorage.getItem("scene"));
	var sceneLoader = new THREE.SceneLoader();

	sceneLoader.parse(JSON.parse(json), function(e)
	{
		scene = e.scene;
	}, '.');
}


function tChar(animtype)
{
	this.movingNow = false;
	this.walkSpeed = 0.75;
	this.texture = new THREE.ImageUtils.loadTexture("../img/Pet/walks2.png");
	// this.walkSide = new THREE.ImageUtils.loadTexture("../img/Pet/walkSide.png");
	// this.walkFront = new THREE.ImageUtils.loadTexture("../img/Pet/walkFront.png");
	// this.walkBack = new THREE.ImageUtils.loadTexture("../img/Pet/walkBack.png");
	// this.texture = this.walkSide;
	if (!animtype)
		this.tchar = new AnimatedSprite(this.texture, 9, 3, 27, 75);
	else
		this.tchar = new AnimationParser();
	this.material = new THREE.MeshBasicMaterial(
	{
		map: this.texture,
		side: THREE.DoubleSide,
		transparent: true,
		depthWrite: false,
		depthTest: false
	});
	this.geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.position.set(50, 35, 100);
	scene.add(this.mesh);
}

function AnimatedSprite(texture, tilesHorizontal, tilesVertical, numberOfTiles, displayDuration)
{
	"use strict";
	this.tilesHorizontal = tilesHorizontal;
	this.tilesVertical = tilesVertical;
	this.numberOfTiles = numberOfTiles;
	this.texture = texture;
	this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
	this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
	// this.texture.repeat.set(1/this.tilesHorizontal, 1 );
	this.displayDuration = displayDuration;
	this.moving = false;

	this.currentDisplayTime = 1;
	this.startTile = 1;
	this.lastTile = this.numberOfTiles;
	if (this.moving === false)
	{
		this.currentTile = 0;
		this.lastTile = 0;
	}
	else if (this.moving)
	{
		if (this.startTile !== 1)
		{
			this.currentTile = this.startTile;
		}

		else
			this.currentTile = 1;
	}


	// this.texture.needsUpdate = true;
}

AnimatedSprite.prototype.update = function(milliSec)
{

	if (this.moving == false)
	{
		return;
	}
	this.currentDisplayTime += milliSec;
	while (this.currentDisplayTime > this.displayDuration)
	{
		// console.log("from the update function: start: " + this.startTile + " last: " + this.lastTile + " current: " + this.currentTile);

		this.currentDisplayTime -= this.displayDuration;
		this.currentTile++;
		if (this.currentTile == this.lastTile || this.currentTile > this.numberOfTiles)
		{
			if (this.startTile !== null)
			{
				this.currentTile = this.startTile;
			}
			else
			{
				this.currentTile = 1;
			}
		}

		var currCol = this.currentTile % this.tilesHorizontal;
		this.texture.offset.x = currCol / this.tilesHorizontal;
		var currRow = Math.floor((this.currentTile / this.tilesHorizontal));
		this.texture.offset.y = currRow / this.tilesVertical;
		// this.texture.offset.y = 0;
		// console.log(this.currentTile);

	}
};

var idle1 = require(["../Objects/Idle1.js"], function()
{
	console.log("idle1 loaded");
});
var idle2 = require(["../Objects/Idle2.js"], function()
{
	console.log("idle2 loaded");
});
var test = require(["../Objects/test.js"], function()
{
	console.log("test loaded");
});
// var IdleSprite1 = require(['../img/Pet/anim/IdleSprite2.json']);

function AnimationParser(displayDuration)
{
	//for idle
	//tecture
	this.texture = "../img/Pet/" + idle2.meta.image;
	this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;


	this.displayDuration = displayDuration;
}






//animations properly n

var mediator = (function()
{
	var dupa = 10;
	var ass = [];
	kickme = function(val)
	{
		console.log(dupa + val);
		ass.push(dupa);
	};
	return {
		installTo: function(obj)
		{
			obj.dupa = dupa;
			obj.ass = ass;
			obj.kickme = kickme;
		}
	};
}());
var momo = {};



// creating sprite object
function aPet()
{
	//create an Animator instance within
	this.animator = new Animator(this);
	//setting up URL to where the .json and .png files are stored
	this.animator.setSheetsURL("../img/Pet/anim/");
	// Preparing sprite sheets. Array["filename1", "desiredAnimationID1", "filename2" etc..]
	// making in public so that we can showe in some more later if needed, although there are other ways to do that such as "addSheet()" method.
	this.sheets = ["Fly2Sprite", "fly", "IdleSprite2", "idle2", "Walk2", "walk"];
	//loading sheets from json files
	this.animator.loadSheets(this.sheets);
	this.animator.preloadTextures();
	this.animator.setDefaultAnimation("idle2");

	var texture;
	//animID as paramenter. Will find it in aviable sheets and load proper .png image
	texture = this.animator.textureFromSheet("idle2", true);

	//just material
	this.material = new THREE.MeshBasicMaterial(
	{
		map: texture,
		side: THREE.DoubleSide,
		transparent: true,
		// alphaTest: 0.5
	});
	// set material needsUpdate property to true
	this.material.map.needsUpdate = true;
	//Reference material to the Animator so it can do all the operations it needs such as swapping maps and all that goood stuff. Important to remeber this step.
	this.animator.referenceMaterial(this.material);

	//standard mesh setup apart from one thing
	var geometry = new THREE.PlaneGeometry(50, 75, 1, 1);
	var mesh = new THREE.Mesh(geometry, this.material);
	mesh.position.set(10, 50, 110);
	// rotating mesh upside down basicly. reason for that is we do not flip texture Y at import because if we do so animation goes bonkers. To compensate for upside down texture we might as well do this. Or something else, as you prefer.
	mesh.rotation.x = 180 * (Math.PI / 180);
	scene.add(mesh);
}


// Ignore this, test stuff
var p;

function keysToArray(obj, arr)
{
	var a = 0;
	for (var key in obj.frames)
	{
		arr.push(obj.frames[key]);
		console.log("adding: " + a);
		a++;
	}
}
var shad = require(["../shaders/FresnelShader.js"], function()
{
	console.log("shader loaded");
});

function Shockwave(x, y, z)
{
	this.currentDisplayTime = 0;
	this.sphereCamera = new THREE.CubeCamera(0.1, 5000, 512);
	scene.add(this.sphereCamera);
	var fShader = THREE.FresnelShader;
	var fresnelUniforms = {
		"mRefractionRatio":
		{
			type: "f",
			value: 0.9
		},
		"mFresnelBias":
		{
			type: "f",
			value: 0.1
		},
		"mFresnelPower":
		{
			type: "f",
			value: 1.0
		},
		"mFresnelScale":
		{
			type: "f",
			value: 1.0
		},
		"alpha":
		{
			type: "f",
			value: 0.5
		},
		"tCube":
		{
			type: "t",
			value: this.sphereCamera.renderTarget
		} //  textureCube }
	};
	this.customMaterial = new THREE.ShaderMaterial(
	{
		uniforms: fresnelUniforms,
		vertexShader: fShader.vertexShader,
		fragmentShader: fShader.fragmentShader,
		transparent: true,
		needsUpdate: true
	});
	this.customMaterial.needsUpdate = true;

	var sphereGeometry = new THREE.SphereGeometry(5, 64, 32);
	this.sphere = new THREE.Mesh(sphereGeometry, this.customMaterial);
	this.sphere.position.set(x, y, z);
	scene.add(this.sphere);

	this.sphereCamera.position = this.sphere.position;
}
Shockwave.prototype.animate = function(myD)
{
	var displayTime = 100;
	this.currentDisplayTime += myD;
	if (this.currentDisplayTime < displayTime)
	{
		var mult = 1.5;
		this.sphere.scale.x *= mult;
		this.sphere.scale.y *= mult - 0.2;
		this.sphere.scale.z *= mult;
		// this.customMaterial.opacity -= 0.1;
	}
	else
	{
		scene.remove(this.sphere);
	}

};

var s;

function Fireball()
{
	// base image texture for mesh
	var lavaTexture = new THREE.ImageUtils.loadTexture('../img/mushroom.png');
	lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;
	// multiplier for distortion speed
	var baseSpeed = 0.02;
	// number of times to repeat texture in each direction
	var repeatS = repeatT = 4.0;

	// texture used to generate "randomness", distort all other textures
	var noiseTexture = new THREE.ImageUtils.loadTexture('../img/skybox/sky1-xneg.jpg');
	noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;
	// magnitude of noise effect
	var noiseScale = 0.5;

	// texture to additively blend with base image texture
	var blendTexture = new THREE.ImageUtils.loadTexture('../img/mushroom.png');
	blendTexture.wrapS = blendTexture.wrapT = THREE.RepeatWrapping;
	// multiplier for distortion speed
	var blendSpeed = 0.01;
	// adjust lightness/darkness of blended texture
	var blendOffset = 0.25;

	// texture to determine normal displacement
	var bumpTexture = noiseTexture;
	bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
	// multiplier for distortion speed
	var bumpSpeed = 0.15;
	// magnitude of normal displacement
	var bumpScale = 40.0;

	// use "this." to create global object
	this.customUniforms = {
		baseTexture:
		{
			type: "t",
			value: lavaTexture
		},
		baseSpeed:
		{
			type: "f",
			value: baseSpeed
		},
		repeatS:
		{
			type: "f",
			value: repeatS
		},
		repeatT:
		{
			type: "f",
			value: repeatT
		},
		noiseTexture:
		{
			type: "t",
			value: noiseTexture
		},
		noiseScale:
		{
			type: "f",
			value: noiseScale
		},
		blendTexture:
		{
			type: "t",
			value: blendTexture
		},
		blendSpeed:
		{
			type: "f",
			value: blendSpeed
		},
		blendOffset:
		{
			type: "f",
			value: blendOffset
		},
		bumpTexture:
		{
			type: "t",
			value: bumpTexture
		},
		bumpSpeed:
		{
			type: "f",
			value: bumpSpeed
		},
		bumpScale:
		{
			type: "f",
			value: bumpScale
		},
		alpha:
		{
			type: "f",
			value: 1.0
		},
		time:
		{
			type: "f",
			value: 1.0
		}
	};

	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var customMaterial = new THREE.ShaderMaterial(
	{
		uniforms: customUniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	});

	var ballGeometry = new THREE.SphereGeometry(60, 64, 64);
	var ball = new THREE.Mesh(ballGeometry, customMaterial);
	ball.position.set(0, 65, 160);
	scene.add(ball);
}

//CODE FOR RTS LIKE CAMERA HERE
{
	// This one manages camera movement
	var RtsCam = {
		camXminus: false,
		camXplu: false,
		camZminus: false,
		camZplus: false
	};

	//checking if mouse is over the divs on the screen edges. if so trigger movement
	function checkCameraMove()
	{
		divLeft.onmouseover = function()
		{
			RtsCam.camXminus = true;
		};

		divRight.onmouseover = function()
		{
			RtsCam.camXplus = true;
		};
		divTop.onmouseover = function()
		{
			RtsCam.camZminus = true;
		};
		divBottom.onmouseover = function()
		{
			RtsCam.camZplus = true;
		};

		divLeft.onmouseout = function()
		{
			RtsCam.camXminus = false;
		};
		divRight.onmouseout = function()
		{
			RtsCam.camXplus = false;
		};
		divTop.onmouseout = function()
		{
			RtsCam.camZminus = false;
		};
		divBottom.onmouseout = function()
		{
			RtsCam.camZplus = false;
		};

	}
	// camera speed
	var camMoveSpeed = 3;
	//if div triggered, adjust camera position, and camera focus point
	// to do : make it work for diagonal movement too
	function moveCamera()
	{
		if (RtsCam.camXminus)
		{
			camera.position.x -= camMoveSpeed;
			lookAtVec.x -= camMoveSpeed;

		}
		if (RtsCam.camXplus)
		{
			camera.position.x += camMoveSpeed;
			lookAtVec.x += camMoveSpeed;
		}
		if (RtsCam.camZminus)
		{
			camera.position.z -= camMoveSpeed;
			lookAtVec.z -= camMoveSpeed;
		}
		if (RtsCam.camZplus)
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
var interPos = null;

function checkIntersections()
{
	//make vector representing already adjusted mouse coords. nobody knows why z must be set to either 0.5 or 1, even mrdoob :)
	var mv = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	//unproject the mouse vector. (2d to 3d)
	projector.unprojectVector(mv, camera);
	//cast ray from mouse position into the scene
	var ray = new THREE.Raycaster(camera.position, mv.sub(camera.position).normalize(), 1, 1000);
	// var ray = projector.pickingRay(mv.clone(), camera);
	//count intersections
	var intersects = ray.intersectObjects(scene.children, true);
	//if there are more than 0 interections, do :
	if (intersects.length > 0)
	{
		//problem - i want to have coordinates of intersection displayed, .point does not help so far. need something else i guess
		//  console.log("intersection at: " + intersects[ 0 ].point);
		//check if this object is already being stored as itnersected
		if (intersects[0].object != INTERSECTED)
		{
			// if previous object exist, restore its state to normal
			if (INTERSECTED)
			{
				INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
			}
			//store reference to the new intersected object
			INTERSECTED = intersects[0].object;
			//store its color, so we can return it after interesection is done
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			//set new color for the time

			// INTERSECTED.material.color.setHex( 0xffffff);

			interPos = intersects[0].point;

			// console.log("intersectin  " +  " at " + interPos.x +  interPos.y + interPos.z);


		}
	}
	else
	{
		if (INTERSECTED)
		{
			INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
			INTERSECTED = null;
		}
	}
}