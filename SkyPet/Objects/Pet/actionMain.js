//Illy 2014 - actionMain.js
//As this is a project where we aim to create a proof of concept,
//this code will have a lot of comments to make it easier to understand for people with limited programming experience.
//I also feel that I must point out that there is a lot of hardcoded pet brain here. Please read our raport if
//you better with so understand the choises we have made and how this still work towards prooving our theory.

//In this section we have hardcoded some actions the pet is likely to take.
// The actionlist is based on the mood the pet is in. Depending on the strength of the mood, and 
// how important that mood is, the pet will aim towards doing the topp 4 actions. 
// The actionlist will be used by the pet when it thinks about what it would like to do.
function Action(mood)
{
	var actionArray = new Array(),
		moodLength = mood.length,
		i, j;

	//*****************************Making actions**********************************
	// The actions are seperated by name, index, and energy it would cost to preform the action
	actionArray = [
		BaseActions("eat", 0, +0.5),
		BaseActions("sleep", 1, +1.0),
		BaseActions("washSelf", 2, +0.5),
		BaseActions("fight", 3, -2),
		BaseActions("runAway", 4, -1),
		BaseActions("threaten", 5, -1),
		BaseActions("talkTo", 6, 0),
		BaseActions("washOther", 7, 0),
		BaseActions("grabb", 8, -1),
		BaseActions("push", 9, -1),
		BaseActions("explore", 10, 0),
		BaseActions("jumpOnToppOff", 11, -1),
		BaseActions("sulk", 12, 0)
	];
	var actionLength = actionArray.length;

	//In adition to what separates the actions, there are a few basic meashurements the pet uses to see
	// if the actions is currently being done, how much the pet wants to do the action compared to the other actions
	// and finally a point value that will change depending on the mood the pet is in. This is the value used to make the prio list
	function BaseActions(named, indexNum, energyRequirement)
	{
		var newAction = {
			named: named,
			pValue: 50,
			hasPrioAssigned: false,
			isDoingAction: false,
			prio: 0,
			indexNum: indexNum,
			energyReq: energyRequirement
		}
		return newAction;
	} //BaseActions ends
	//MakingActions ends

	//*****************************Assigning action value based on mood**********************************
	//We will check what mood the pet is in, and assign a pValue to each action based on that mood. 
	function checkMood()
	{
		//First we reset the actions.
		for (i = 0; i < actionLength; i++)
		{
			actionArray[i].hasPrioAssigned = false;
			actionArray[i].pValue = 50;
		};

		//The prio system is based on the Maslow's hierarchy of needs. As mentioned in "moodMain" 
		// we felt placing moods in the pyramide (based on what actions that mood would support) instead of the
		// actions themselves, allowed for a more diverse and in some way moractionPriListe realistic behaviour. 
		//Prio 2 moods: 
		if (mood[4].moodIsActive) //depressed
		{
			var increaseNormal = [1, 12]; // The actions the pet wouldnt mind doing
			var increaseExtra = [1, 12]; // The actions the pet would -want- to do.
			var decrease = [0, 2, 3, 6, 7, 8, 9, 10, 11]; // The actions the the probably wouldnt want to do.
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[4].importance, mood[4].prio);
		}

		if (mood[1].moodIsActive) //jumpy
		{
			var increaseNormal = [4, 5, 9, 12];
			var increaseExtra = [4, 5, 9];
			var decrease = [1, 7, 10];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[1].importance, mood[1].prio);
		}

		//Prio 3 moods: 
		if (mood[5].moodIsActive) //relaxed
		{
			var increaseNormal = [0, 1, 2, 6, 7, 10];
			var increaseExtra = [0, 1, 2];
			var decrease = [3, 8, 9, 11];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[5].importance, mood[5].prio);
		}

		if (mood[8].moodIsActive) //playfull
		{
			var increaseNormal = [3, 4, 5, 6, 7, 8, 9, 10, 11];
			var increaseExtra = [9, 11];
			var decrease = [1, 12];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[8].importance, mood[8].prio);
		}

		if (mood[7].moodIsActive) //sosial
		{
			var increaseNormal = [0, 6, 7, 8, 10, 11];
			var increaseExtra = [6, 7];
			var decrease = [1, 4, 12];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[7].importance, mood[7].prio);
		}

		//Prio 4 moods: 
		if (mood[0].moodIsActive) //agressive
		{
			var increaseNormal = [3, 5, 8, 9, 11];
			var increaseExtra = [3, 5];
			var decrease = [1, 6, 7, 12];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[0].importance, mood[0].prio);
		}

		if (mood[2].moodIsActive) //uncomfertable
		{
			var increaseNormal = [2, 4, 5, 9, 12];
			var increaseExtra = [4, 5];
			var decrease = [3, 8, 10, 11];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[2].importance, mood[2].prio);
		}

		//Prio 5 moods: 
		if (mood[3].moodIsActive) //sad
		{
			var increaseNormal = [1, 2, 4, 12];
			var increaseExtra = [1, 12];
			var decrease = [3, 8, 9, 10, 11];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[3].importance, mood[3].prio);
		}

		if (mood[6].moodIsActive) //Curiouse
		{
			var increaseNormal = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			var increaseExtra = [10];
			var decrease = [1];
			assignActionValue(increaseNormal, increaseExtra, decrease, mood[6].importance, mood[6].prio);
		}
		sortingActions(actionArray);
	} // checkMood ends

	function assignActionValue(increaseNormal, increaseExtra, decrease, valueChange, adjuster)
	{
		// Adjuster will make sure that the mood witch is number 3 on the prio list, wont effect the action-list as much 
		// as the mood that is number 1 on the list. 
		adjuster = adjuster * 2;
		for (i = 0; i < actionLength; i++)
		{
			var k = 0;
			for (j = 0, k = increaseNormal.length; j < k; j++)
			{
				if (actionArray[i].indexNum == increaseNormal[j])
				{
					actionArray[i].pValue += valueChange - adjuster;
				}
			};
			for (j = 0, k = increaseExtra.length; j < k; j++)
			{
				if (actionArray[i].indexNum == increaseExtra[j])
				{
					actionArray[i].pValue += valueChange - adjuster;
				}
			};
			for (j = 0, k = decrease.length; j < k; j++)
			{
				if (actionArray[i].indexNum == decrease[j])
				{
					actionArray[i].pValue -= valueChange + adjuster;
				}
			};
		};
	} //assignActionValue ends
	//Assigning action value based on mood ends

	//*****************************ActionList changer**********************************
	//Now that we have the actions we want to make sure they change from time to time, and then gets sorted
	actionListAutoAssigner();
	//We want to make sure the actions dont change from time to time, but not to often. Therefor we 
	// will change them every 3 sec
	function actionListAutoAssigner()
	{
		if (actionLength != null)
		{
			checkMood();
		}
		setTimeout(actionListAutoAssigner, 3000);
	} //moodSwings ends

	//Before we shipp out the actions we have made, we will give them a priority. 
	function sortingActions(arrayToSort)
	{
		for (var i = 0; i < actionLength; i++)
		{
			var max = 0;
			var arrayNumber = 0;
			for (j = 0; j < actionLength; j++)
			{
				if (arrayToSort[j].pValue > max && !arrayToSort[j].hasPrioAssigned)
				{
					max = arrayToSort[j].pValue;
					arrayNumber = j;
				}
			};
			arrayToSort[arrayNumber].prio = i + 1;
			arrayToSort[arrayNumber].hasPrioAssigned = true;
			//document.getElementById('petAction' + (i + 1)).innerHTML = arrayToSort[arrayNumber].named + ", Value: " + arrayToSort[arrayNumber].pValue;
		};

	}
	//ActionList changer ends
	return actionArray;
} //Action ends