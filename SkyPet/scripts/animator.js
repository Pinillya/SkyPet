/**
 * @author Roger Wlosek
 * @date march 2014
 * @email trzy.akordy@gmail.com
 */


/**
 * Allows for animation of multiple spritesheets withing THREE.js
 * @param {object} parentObj - needs parent object to perform most of its job
 */
function Animator(parentObj)
{
	/** @type {object} stores parent for future reference */
	var parent = parentObj;

	/** referenncing parent texture and material */
	var pMaterial;

	/** stores URL of folder containing textures and sheets
	 * TODO - Remove it. Maybe.
	 */
	var sheetsURL = "";

	/** self explainatory */
	var frames = {};
	frames.animId = "";
	frames.amount = [];

	var currentFrame;
	var currentSheet;
	var currentAnimId;

	/** these are used for managing animation flow */
	var firstFrame = 0;
	var lastFrame;
	var paused;
	var firstTime = true;

	var defaultAnimation = {
		id: "",
		first: 0,
		last: frames.amount.length,
		set: false
	};

	var pOnce = false;
	var animationQ = [];


	/** @type {Array} stores all loaded spritesheets */
	var sheets = [];
	var textures = [];

	/** @type {Number} Number of milliseconds each sprite is displayed */
	var displayTime = 80;

	/** @type {Number} number of milliseconds current sprite was being displayed */
	var currentDisplayTime = 1;


	return {
		//LOADING JSON FUNCTION
		/**
		 * Loads JSON files from local folder
		 * @param  {[string]} path - url to JSON file
		 * @param  {[bool]} success
		 * @param  {[bool]} error
		 */
		loadJSON: function(path, success, error)
		{
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState === 4)
				{
					if (xhr.status === 200)
					{
						if (success)
						{
							success(JSON.parse(xhr.responseText));
						}
					}
					else
					{
						if (error)
						{
							error(xhr);
						}
					}
				}
			};
			xhr.open("GET", path, false);
			xhr.send();
		},
		setDefaultAnimation: function(anim, first, last)
		{
			if (typeof anim === "string")
			{
				defaultAnimation.id = anim;
				if (first && typeof first === "number")
				{
					defaultAnimation.first = first;
				}
				if (last && typeof last === "number")
				{
					defaultAnimation.last = last;
				}
				defaultAnimation.set = true;

			}
			else if (typeof anim === "number")
			{
				try
				{
					defaultAnimation.id = sheets[i].animId;

					if (first && typeof first === "number")
					{
						defaultAnimation.first = first;
					}
					if (last && typeof last === "number")
					{
						defaultAnimation.last = last;
					}
					defaultAnimation.set = true;
				}
				catch (e)
				{
					console.log("Animator::setDefaultAnimation: no animation at index or no animID assigned top animation! ");
				}
			}
		},
		getDefaultAnimation: function()
		{
			if (defaultAnimation.id)
			{
				console.log(defaultAnimation.first, defaultAnimation.last);
				return defaultAnimation.id;
			}
			else
			{
				console.log("Animator::getDefaultAnimation - no default animation has been set!");
			}
		},

		/**
		 * adds sprite sheet to be used at later point
		 * @param {[obj]} spriteSheet
		 * @param {[string]} string - will be used as animation id
		 * TODO - get rid of this (??)
		 */
		addSheet: function(spriteSheet, string)
		{
			spriteSheet.animId = string || spriteSheet.meta.image;
			sheets.push(spriteSheet);
		},
		/**
		 * return all sheets currently stored in sheets array
		 * @return {Array}
		 */
		getAllSheets: function()
		{
			if (sheets.length > 0)
			{
				return sheets;
			}
			else
			{
				console.log("Sheets is empty");
				return sheets;
			}

		},
		/**
		 * returns sprite sheet by Id or index
		 * @param  {[number || string]} index
		 * @return {[type]}
		 */
		getSheet: function(index)
		{
			if (typeof index === 'number')
			{
				if (sheets.length >= index)
				{
					return sheets[index];
				}
				else
				{
					console.log("Animator, getSheet: no such index");
				}
			}
			else
			{
				for (var i = 0; i < sheets.length; i++)
				{
					if (sheets[i].animId === index)
					{
						console.log("Animator: Got Sheet: " + index);
						return sheets[i];
					}
					else
					{
						console.log("Animator, getSheet: no such animId");
					}

				}
			}

		},
		/**
		 * sets current sprite sheet to be used by animator
		 * @param {[spritesheet]} sheet -
		 */
		setCurrentSheet: function(sheet)
		{
			currentSheet = sheet;
		},
		/**
		 * removes all sprite sheets stored in sheets array
		 */
		removeAllSheets: function()
		{
			sheets = [];
		},
		/**
		 * removes sprite sheet from sheets array by index or Id
		 * @param  {string || number} index
		 */
		removeSheet: function(index)
		{
			if (typeof index === 'number' && index <= sheets.length)
			{
				sheets.splice(index, 1);
			}
			else if (typeof index === 'string')
			{
				var i;

			}
		},
		/**
		 * sets URL for where the sheets and textures are stored
		 * @param {[string]} string URL
		 */
		setSheetsURL: function(string)
		{
			if (typeof string === 'string')
			{
				if (string.charAt(string.length - 1) === "/")
				{
					sheetsURL = string;
					console.log(this + " worked!");
				}
				else if (string.charAt(string.length - 1) === " ")
				{
					for (i = 0; i < sheets.length; i++)
					{
						if (sheets[i].animId == index)
						{
							sheets.splice(i, 1);
						}
					}
					string = string.substring(0, string.length - 1);
					this.setSheetsURL(string);
					console.log(this + " worked!");

				}
				else
				{
					string += "/";
					sheetsURL = string;
					console.log(this + " worked!");

				}
			}
		},
		getSheetsURL: function()
		{
			// console.log(this + " worked! " + " URL is: " + sheetsURL);
			return sheetsURL;
		},
		getParent: function()
		{
			return parent;
		},
		/**
		 * returns Id of current spritesheet
		 * @return {[string]}
		 */
		getAnimId: function()
		{
			return currentAnimId;
		},
		setAnimId: function(target, id)
		{
			if (typeof target === "string")
			{
				for (i = 0; i < sheets.length; i++)
				{
					if (sheets[i].animId == target)
					{
						sheets[i].animId = id;
					}
				}
			}
			else if (typeof target === "number")
			{
				if (sheets[target])
				{
					sheets[target].animId = id;
				}
				else
				{
					console.log("Animator.setAnimId - no sheet at provided index");
				}
			}
		},
		/**
		 * loops through current spritesheet and returns its frames in an array
		 * @return {[Array]}
		 */
		getFrames: function()
		{
			if (currentSheet)
			{
				var temp = [];
				// console.log("Accessing frames info.");
				for (var key in currentSheet.frames)
				{
					temp.push(currentSheet.frames[key]);
				}
				// console.log("Frames info accesed.");
				return temp;
			}
		},
		/**
		 * returns current frame
		 * @return {[number]}
		 */
		getCurrentFrame: function()
		{
			if (currentFrame)
			{
				return currentFrame;
			}
			else
			{
				console.log("no frame to return");
			}

		},
		getTextures: function()
		{
			for (var i = 0; i < textures.length; i++)
			{
				console.log("texture: " +
					textures[i] + "with ID of: " + textures[i].texId);
			}
			return textures;
		},
		/**
		 * [setCurrentFrame description]
		 * @param {[number]} value [greater or equal to zero]
		 */
		setCurrentFrame: function(value)
		{
			if (typeof value === 'number')
			{
				if (value >= 0)
				{
					currentFrame = value;
				}
				else
				{
					console.log("current frame must be greater or equal to 0");
				}

			}
			else
			{
				console.log("Animator.SetCurrentFrame needs a number.");
			}
		},
		/**
		 * take parents texture and stores reference inside animator to
		 * perform certain tasks more easily
		 * @param  {[texture]} tex
		 */
		referenceTexture: function(tex)
		{
			texture = tex;
		},
		/**
		 * Provides Animator with reference to objects material.
		 * @param  {[THREE.material]} parentMaterial [material to be worked on]
		 */
		referenceMaterial: function(parentMaterial)
		{
			pMaterial = parentMaterial;
		},

		loadTexture: function(texture, id)
		{
			nTex = new THREE.ImageUtils.loadTexture(texture);
			nTex.flipY = false;
			nTex.texId = id;
			textures.push(nTex);
			return nTex;
		},
		textureFromSheet: function(sheet, apply)
		{
			if (!sheetsURL)
			{
				console.log("sheets URL not set!!!");
				return;
			}

			var s = this.getSheet(sheet);
			nTex = this.loadTexture(sheetsURL + s.meta.image, sheet);
			if (apply === true)
			{
				currentAnimId = sheet;
				this.setCurrentSheet(s);
			}
			return nTex;
		},
		changeTexture: function(sheet)
		{
			var set = false;
			var s = this.getSheet(sheet);
			for (var i = 0; i < textures.length; i++)
			{
				if (textures[i].texId == sheet)
				{
					currentAnimId = sheet;
					this.setCurrentSheet(s);
					set = true;
					pMaterial.map = textures[i];
				}
			}
			if (!set)
			{
				console.log("NO TEXTURE");
			}
		},
		changeTextureSheet: function(sheet)
		{
			var nTex = this.textureFromSheet(sheet, true);
			if (pMaterial)
			{
				pMaterial.map = nTex;
			}
			else
			{
				console.log("Animator.changeTextureSheet: You must reference target material to Animator. Use 'referenceMaterial(material)' function to do so");
			}
		},
		/**
		 * animates object, must be fired every frame
		 * @param  {[number]} myD  - deltatime
		 * @return {[type]}
		 */
		update: function(myD)
		{
			if (!pMaterial)
			{
				console.log("Animator.update: You must reference target material to Animator. Use 'referenceMaterial(material)' function to do so");
				return;
			}

			currentDisplayTime += myD;
			/** @type {array} references all the frames of current spritesheet */
			// var frames = this.getFrames();
			if (frames.animId != currentAnimId)
			{
				frames.amount = this.getFrames();
				frames.animId = currentAnimId;
			}

			/** @type {obj} references current obj tecture/ material map */

			t = pMaterial.map;

			/** @type {number} stores current frame */
			if (!currentFrame)
			{
				currentFrame = firstFrame;
			}
			// var cF = currentFrame; //cF = current Frame
			if (firstTime && defaultAnimation.set)
			{
				firstFrame = defaultAnimation.first;
				lastFrame = defaultAnimation.last;
				firstTime = false;
			}
			if (!paused)
			{
				while (currentDisplayTime > displayTime)
				{

					currentDisplayTime -= displayTime;
					currentFrame++;
					if (!lastFrame || lastFrame == -1)
					{
						lastFrame = frames.amount.length;
					}
					if (lastFrame && currentFrame >= lastFrame)
					{
						if (pOnce)
						{
							this.handleCycle();
						}
						if (firstFrame)
						{
							currentFrame = firstFrame;
						}
						else
						{
							currentFrame = 0;
						}
					}

					var rx = frames.amount[currentFrame].frame.w / currentSheet.meta.size.w;
					var ry = frames.amount[currentFrame].frame.h / currentSheet.meta.size.h;

					t.repeat.x = rx;
					t.repeat.y = ry;

					var ox = (frames.amount[currentFrame].frame.x / frames.amount[currentFrame].frame.w) * t.repeat.x;
					var oy = (frames.amount[currentFrame].frame.y / frames.amount[currentFrame].frame.h) * t.repeat.y;

					t.offset.x = ox;
					t.offset.y = oy;
				}
			}
		},
		/**
		 * sets desired sprite sheet as texture plays it
		 * @param  {[string]} animId
		 */
		setFramesRange: function(first, last)
		{
			var frames = this.getFrames();
			firstFrame = 0;
			lastFrame = frames.length;
			if (first && typeof first === "number")
			{
				if (first >= 0)
				{
					firstFrame = first;
				}
				else
				{
					console.log("first frame cannot be negative number");
				}
			}
			if (last && typeof last === "number")
			{
				if (last <= frames.length)
				{
					lastFrame = last;
				}
				else
				{
					console.log("last frame bigger than frames amount");
				}
			}

		},
		play: function(animId, first, last)
		{
			this.changeTexture(animId);

			var tf, tl;
			if (first && typeof first == "number")
			{
				tf = first;
			}
			else
			{
				tf = 0;
			}
			if (last && typeof last == "number")
			{
				tl = last;
			}
			else
			{
				tl = "nope";
			}
			this.setFramesRange(tf, tl);
		},
		playOnce: function(id, first, last)
		{
			if (!first)
			{
				first = 0;
			}
			this.setCurrentFrame(first);
			this.play(id, first, last);
			pOnce = true;
		},
		handleCycle: function()
		{
			if (defaultAnimation.id)
			{
				if (!defaultAnimation.first)
				{
					defaultAnimation.first = 0;
				}
				if (!defaultAnimation.last)
				{
					defaultAnimation.last = -1;
				}
				this.play(defaultAnimation.id, defaultAnimation.first, defaultAnimation.last);
				pOnce = false;
				console.log("default animation time");
			}
			else if (!defaultAnimation.id)
			{
				console.lof("Animator::handleCycle: no default animation spoecified");
				pOnce = false;
			}

		},
		pause: function()
		{
			paused = true;
		},
		resume: function()
		{
			paused = false;
		},

		/**
		 * loads spritesheet data from json files stored on PC
		 * @param  {obj} sheet - spritesheet we wish to add
		 * @param  {[string]} optNameId - Id
		 * @param {boolean} urlType - true if url differs from the one in sheetsURL
		 */
		loadSheetData: function(sheet, optNameId, urlType)
		{
			var urls;
			if (!urlType || urlType === false)
			{
				urls = sheetsURL;
			}
			else
			{
				urls = "";
			}

			this.loadJSON(urls + sheet,
				function(data)
				{
					var sSheet = data;
					sSheet.animId = optNameId || sheet;
					sheets.push(sSheet);
					console.log("Animator: " + sheet + " Sprite sheet data loaded!");

				},
				function(xhr)
				{
					console.error("Something went wrong: " + xhr);
				}
			);
		},
		/**
		 * loads multiple spritesheets from JSON files
		 * @param  {[type]} arr - must look like this ["sheet1", "sheet1Id", "sheet2", "sheet2Id" etc...]
		 */
		loadSheets: function(arr)
		{
			for (var i = 0; i < arr.length; i += 2)
			{
				this.loadSheetData(arr[i] + ".json", arr[i + 1]);
			}
		},
		preloadTextures: function()
		{
			for (var i = 0; i < sheets.length; i++)
			{
				var n = this.textureFromSheet(sheets[i].animId, false);
				console.log("textures updated");
			}

		}
	};
}