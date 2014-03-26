/*How to editor

array/obj /vector holding all the items by id/name
in editor window, we run through this container and for every item we add appropriate button in editor, with its name and shit, based on id/naME
so we end up having a thumbnails of all aviable objects
by clicking a chosen item we create an instance of it in the scene
basicly we onclick -> createobject(id)
we can make it even follow the mouse and shit
*/

//object
// ID.object (mesh, geom, map etc), baisclly we do init an obj but dont add it to scene
// JSON for storing all the objects?
// var basket =
// {
//     "displayName": "Cozy Basket",
//     "idn": "basket",
//     "object":
//     {
//         "texture": "Basket.png",
//         "sizeX": "50",
//         "sizeY": "25"
//     },
// };
var basket = {
	displayName: "Cozy Basket",
	idn: function()
	{
		return this;
	},
	thumbnail: "Basket.png",
	itemProps:
	{
		texture: "Basket.png",
		sizeX: 50,
		sizeY: 25
	},
	AIProps:
	{
		//AI Properties
	},
};
var food1 = {
	displayName: "Delicious Food",
	idn: function()
	{
		return this;
	},
	itemProps:
	{
		enumerable: true,
		texture: "food.png",
		sizeX: 25,
		sizeY: 25
	},
};
var bush1 = {
	displayName: "Mysterious Bush",
	idn: function()
	{
		return this;
	},
	itemProps:
	{
		enumerable: true,
		texture: "Bush1.png",
		sizeX: 50,
		sizeY: 50
	},
};
var bush2 = {
	displayName: "Less Mysterious Bush",
	idn: function()
	{
		return this;
	},
	itemProps:
	{
		enumerable: true,
		texture: "Bush2.png",
		sizeX: 100,
		sizeY: 50
	},
};
var tree1 = {
	displayName: "Majestic Tree",
	idn: function()
	{
		return this;
	},
	itemProps:
	{
		enumerable: true,
		texture: "Tree.png",
		sizeX: 50,
		sizeY: 100
	},
};
var sofa = {
	"displayName": "Comfy Sofa",
	idn: function()
	{
		return this;
	},
	"itemProps":
	{
		"texture": "Sofa.png",
		"sizeX": 100,
		"sizeY": 50
	},
};
var sofa2 = {
	"displayName": "Stylish Sofa",
	idn: function()
	{
		return this;
	},
	"itemProps":
	{
		"texture": "Sofa.png",
		"sizeX": 100,
		"sizeY": 50
	},
};
//this will be an array holding objects
var aviableObjects = [];
aviableObjects.push(basket, sofa, sofa2, food1, bush1, bush2, tree1);

var turl = "../models/Props/"; // textures folder
var xx = 0; // lazy solution to position while i implement  mopuse placement
var spawnedObjects = []; //holds al the objects spawned this way, or, their meshes

//initiate object, pass its id as argument
var objectsToPlace = [];

function instantiateObject(idn)
{
	console.log("idn " + idn);
	var id = idn;
	console.log(id);
	var tex = id.itemProps.texture;
	console.log(tex);
	var material = new THREE.MeshBasicMaterial(
	{
		map: THREE.ImageUtils.loadTexture(turl + tex),
		transparent: true
	});
	var geometry = new THREE.PlaneGeometry(id.itemProps.sizeX, id.itemProps.sizeY);
	var mesh = new THREE.Mesh(geometry, material);
	// mesh.position.set(xx,id.itemProps.sizeX/2,getRandomArbitary(-5, 5));
	mesh.placement = true;
	scene.add(mesh);
	objectsToPlace.push(mesh);
	spawnedObjects.push(mesh);
}

function checkObjectsToPlace()
{
	if (objectsToPlace.length > 0 && objectsToPlace[0].placement === true)
	{
		objectsToPlace[0].position.set(worldMouse.x, 35, worldMouse.z);
	}
}

function checkIfPlaced()
{
	if (objectsToPlace.length > 0 && objectsToPlace[0].placement === true)
	{
		objectsToPlace[0].placement = false;
		objectsToPlace.pop();
	}
}


//editor utsaeende
var editorMainDiv;
var itemDisplay;
var itemDiv;
var items = [];
var editor;

function initEditor(container)
{
	//style insert
	var headID = document.getElementsByTagName("head")[0];
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = 'css/style.css';
	// cssNode.media = 'screen';
	headID.appendChild(cssNode);
	if (!editor)
	{
		editor = new Editor(container);

	}
}

function dItem(name, parent, idn)
{
	this.itemDiv = document.createElement("div");
	this.itemDiv.id = "item";
	this.itemDiv.p = document.createElement("p");
	this.itemDiv.appendChild(this.itemDiv.p);
	this.itemDiv.p.innerHTML = name;
	var bgPath = "../models/Props/" + idn.itemProps.texture;
	this.itemDiv.style.backgroundImage = "url(" + bgPath + ")";

	this.objName = name;
	console.log(this.objName);
	this.itemDiv.onclick = logMe;
	var myName = this.objName;
	var myIdn = idn;

	function logMe()
	{
		instantiateObject(myIdn);
		console.log(myName + " " + myIdn);
	}
	parent.appendChild(this.itemDiv);
}
dItem.prototype.getName = function()
{
	return this.objName;
};

function Editor(container)
{
	// Button for turning the editor on or off;
	this.onOff = document.createElement("div");
	this.onOff.id = "editorOnOff";
	container.appendChild(this.onOff);


	this.main = document.createElement("div");
	this.main.id = "editorMain";
	container.appendChild(this.main);
	this.itemDisplay = document.createElement("div");
	this.itemDisplay.id = "itemDisplay";
	this.main.appendChild(this.itemDisplay);

	this.items = this.updateItems();

	this.main.style.visibility = "hidden";
	var editorMainDivRef = this.main;
	this.onOff.getMain = function()
	{
		return editorMainDivRef;
	};
	this.onOff.addEventListener("click", this.editorOnOff);
}
Editor.prototype.updateItems = function()
{
	for (var i = 0; i < aviableObjects.length; i++)
	{
		var name = aviableObjects[i].displayName;
		// name = "newname " + i;
		var idn = aviableObjects[i];
		var itm = new dItem(name, this.itemDisplay, idn);

		// itm.itemDiv.addEventListener("click", function(event){console.log(itm.objName + ", index " + itm.num);});
		items.push(itm);
	}
	return items;
};
Editor.prototype.editorOnOff = function()
{
	var main = this.getMain();
	console.log(main);
	if (main.style.visibility == "hidden")
	{
		main.style.visibility = "visible";
	}
	else if (main.style.visibility == "visible")
	{
		main.style.visibility = "hidden";
	}
};

/**
 * Mozilla Developer Center page:
 * Returns a random number between min and max
 */
function getRandomArbitary(min, max)
{
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
