//Illy 2014 - moodMain.js
//As this is a project where we aim to create a proof of concept,
//this code will have a lot of comments to make it easier to understand for people with limited programming experience.
//I also feel that I must point out that there is a lot of hardcoded pet brain here. Please read our raport if
//you better with so understand the choises we have made and how this still work towards prooving our theory.

// To make the pet "interested" in things and objects, it needs emotions. By using James A Russle's
//2D X and Y based mood mapping, combined with our own twist to measure the likelihood of the mood.
//we are able to create and return a list of moods, and their current priority.
function Mood(personality, petCurrentMood)
{
	//The pet will have a mood list, but also a needs list. (eat and sleep)
	var moodArray = new Array(),
		needArray = new Array(),
		//variables used in most for loops:
		i, j, k,
		//Math so as to only look them up once:
		floored = Math.floor,
		sqrted = Math.sqrt,
		rand = THREE.Math.random16;

	//*****************************Making mood**********************************
	//In this section we create a list of moods. We give them a name, an X and Y pos for the mood map
	//We give them an index (mostly so its easier to keep track of them, it is not actually used as a vital part in the code. :) )
	//Finally we give them a value loosely based on the "Maslow's hierarchy of needs". The value will be used
	//Later when we create actions the pet is most likely to do.
	//Though the priority pyramide should preferably be based on the actions themselves, we will base it on the mood,
	//based on what the pet would most likely do in the different mood stages. This will increase the pets
	//general intelligence.
	moodArray = [
		//Bad feelings
		BaseMood("agressive", -8, 7, 0, 7),
		BaseMood("jumpy", -4, 9, 1, 12),
		BaseMood("uncomfertable", -4, 2, 2, 7),
		BaseMood("sad", -6, -4, 3, 5),
		BaseMood("depressed", -8, -8, 4, 12),

		//Good feelings
		BaseMood("relaxed", 4, -4, 5, 10),
		BaseMood("curious", 2, 0, 6, 5),
		BaseMood("sosial", 5, 3, 7, 10),
		BaseMood("playfull", 7, 7, 8, 10)
	];
	var moodLength = moodArray.length; //This is a constant we will use a few times.

	//Function used to assign all values need to the moods. Some values have a neutral basis when initiated.
	function BaseMood(name, x, y, index, importance)
	{
		var newMood = {
			named: name,
			x: x, //Happy pos
			y: y, //Energy pos
			moodIsActive: false, //Is this mood active now?
			prio: 0, //If so, how important is is for the pet?
			indeks: index,
			moodRadius: 2, //How likely is the pet to feel this mood?
			moodRadiusModifier: 0, //A variable that will increase/decrease and eventually change "moodRadius" 
			intensity: 0, //How intence is the mood
			moodInsideBubble: false, //Is the mood so intence that its inside the moods range? (Will be used when "moodRadiusModifier" could change)	
			importance: importance //Will be used when creating action prio list.
		}
		return newMood;
	} //Base mood finished

	//To make the pet unique the pet will initiate with a random range on its moods.
	//The higher the radius the more likely it is to feel this mood.
	function makingMoodRadius()
	{
		return floored(1 + rand * 3);
	} //makingMoodRadius ends
	//Makingmood ends

	//***************************** Needs & moodswings **********************************
	//Still in development as the mood will be changed by the objects the pet encounter. 
	//So no comments for ya here... come to think of it: Skipp this pert :P

	//Need array - the things pet pet -has- to do if they get to low. 
	needArray = [
	{
		named: "hunger",
		yValue: 50
	},
	{
		named: "sleep",
		yValue: 50
	}, ];

	//The pets X and Y on the happyness scale. 
	var energyHappynes = new THREE.Vector2(100, 0);
	//Variable to hold the pets food consumed. There will be a max belly capasety. 
	var foodInBelly = 0;

	moodSwings();
	// In this function we will change the pets Energy and hapyness. Has the pet eaten, slept? 
	// finally; passage of time (Currently sett to every 2 sec);
	function moodSwings()
	{
		if (foodInBelly > 0)
		{
			foodInBelly -= personality.digestion;
			needArray[0].yValue += personality.digestion;
		}
		/*
		if(actionArray[1].moodIsActive)
		{
			needArray[1].yValue += personality.digestion;
		}*/

		needArray[0].yValue -= personality.useOfEnergy;
		needArray[1].yValue -= personality.useOfEnergy;

		if (energyHappynes.y > -90)
		{
			energyHappynes.y = needArray[0].yValue + needArray[1].yValue;
		}
		if (energyHappynes.x > -90)
		{
			energyHappynes.x -= personality.moodSwings;
		}

		//To simplify the current mood, we fist make a more precise variable where we can increase the value
		//then we devide it by 10 so that the X/Y system stays within a 10by10 field.
		petCurrentMood.x = (energyHappynes.x / 10);
		petCurrentMood.y = (energyHappynes.y / 10);

		//Temp: Showing the pets mood on the webpage: 
		//document.getElementById('petEnergy').innerHTML = petCurrentMood.y;
		//document.getElementById('petHappyness').innerHTML = petCurrentMood.x;

		changeMood(petCurrentMood);
		setTimeout(moodSwings, 2000);
	} //moodSwings ends

	//Whenevery change to the pets Happyness and Energy is made, we check if the pets mood has changed as a result.
	//We set the new intensity, then resett the bools.s
	function changeMood(petCurrentMood)
	{
		for (i = 0; i < moodLength; i++)
		{
			moodArray[i].intensity = distanceCheck(moodArray[i], petCurrentMood)
			moodArray[i].moodIsActive = false;
			moodArray[i].moodInsideBubble = false;
		};
		sortingMoods(moodArray);
	} //changeMood ends

	// The distance function meashures how fare away "Current mood" is from the mood we are checking
	// First we check diatance, then we take away the moods radius, this way we can check if the "current mood" is
	// inside the mood. Then we return the distance. As we want intesity(logicly) to meshure what is highest, 
	// the closer we are to target we have chosen to subtract the distance from 100. 
	function distanceCheck(Obj1, Obj2)
	{
		var x = Obj2.x - Obj1.x;
		var y = Obj2.y - Obj1.y;
		var disToPoint = sqrted(x * x + y * y);
		var disToEmo = floored(disToPoint - Obj1.moodRadius);
		if (disToEmo < 0)
		{
			Obj1.moodInsideBubble = true;
		}
		//console.log("Dis: " + disToPoint + " Inex: " + Obj1.indeks + " radius: " + Obj1.moodRadius);
		var intensity = 100 - disToEmo;

		return intensity;
	} //distanceCheck ends

	//Needs & moodswings ends

	//***************************** Sorting the mood **********************************
	//Finally we make a list of the topp 4 moods and give them a priority value. 
	function sortingMoods(arrayToSort)
	{
		for (var i = 0; i < 3; i++)
		{
			var max = 0;
			var arrayNumber = 0;
			for (var j = 0; j < moodLength; j++)
			{
				//We are making sure that if a mood is inside a bubble it will always be assigned as the primarry mood. 
				//(Might need to change this up a bit) 
				if (arrayToSort[j].moodInsideBubble && !arrayToSort[j].moodIsActive)
				{
					max = arrayToSort[j].intensity + 100;
					arrayNumber = j;
				}
				if (arrayToSort[j].intensity > max && !arrayToSort[j].moodIsActive)
				{
					max = arrayToSort[j].intensity;
					arrayNumber = j;
				}
			};
			arrayToSort[arrayNumber].moodIsActive = true;
			arrayToSort[arrayNumber].prio = i + 1;
			//document.getElementById('petMood' + (i + 1)).innerHTML = arrayToSort[arrayNumber].named + ",  Prio:" + arrayToSort[arrayNumber].prio;
		};
	}
	//Changing and sorting the mood ends
	return moodArray;
}; //Mood Ends