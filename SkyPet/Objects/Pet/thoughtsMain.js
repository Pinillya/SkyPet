Pet.prototype.visionThought = function(theThought)
{
	//*****************************Short Term Memorie**********************************
	if (this.StmO1 != undefined)
	{
		var StmO1Lenth = this.StmO1.length;
		if (StmO1Lenth > 0)
		{
			//Testing to see if we have a similar memorie stored:
			var test = pet.checkObsMemorie(theThought.O1Output, this.StmO1);
			if (test.length <= 0)
			{
				pet.storeMemorie(this.StmO1, theThought.O1Output);
			}
			else
			{
				//Check if they are alike anyway.
				//console.log (theThought.nameId);
			}
		}
		else
		{
			pet.storeMemorie(this.StmO1, theThought.O1Output);
			//Make new memorie
		}
	}
	else
	{
		this.StmO1 = [];
	}

};

Pet.prototype.storeMemorie = function(memorieCatagory, theMemorie)
{
	memorieCatagory.push(theMemorie);
	console.log(theMemorie.bumpySmooth + " storing******************************************");
};

Pet.prototype.checkObsMemorie = function(theMemorie, memorieList)
{
	var memorieList = memorieList;
	var memorieLength = memorieList.length;
	var i, j;
	var checkAgainst = 0;
	var checkColorShape = 0;
	var theMemorie = theMemorie;
	var potentialList = [];

	for (i = 0; i < memorieLength; i++)
	{
		checkAgainst = 0;
		if (memorieList[i].position == theMemorie.position)
		{
			checkAgainst++;
		}
		if (memorieList[i].isStatic == theMemorie.isStatic)
		{
			checkAgainst++;
		}
		if (memorieList[i].hasAni == theMemorie.hasAni)
		{
			checkAgainst++;
		}
		//Color
		checkColorShape = theMemorie.colors[0];
		for (j = 1; j < 10; j++)
		{
			if (memorieList[i].colors[j] == theMemorie.colors[j])
			{
				if (theMemorie.colors[j] == 1)
				{
					checkColorShape--;
				}
			}
		};
		if (checkColorShape == 0)
		{
			checkAgainst++;
		}
		//shape
		checkColorShape = theMemorie.shapes[0];
		for (j = 1; j < 9; j++)
		{
			if (memorieList[i].shapes[j] == 1)
			{
				if (memorieList[i].shapes[j] == theMemorie.shapes[j])
				{
					checkColorShape--;
				}
			}
		};
		if (checkColorShape == 0)
		{
			checkAgainst++;
		}
		if (memorieList[i].bumpySmooth >= theMemorie.bumpySmooth - 1 && memorieList[i].bumpySmooth <= theMemorie.bumpySmooth + 1)
		{
			checkAgainst++;
		}
		if (memorieList[i].varyingShapes == theMemorie.varyingShapes)
		{
			checkAgainst++;
		}
		//They are then similar enough to assum might be the same.
		if (checkAgainst > 5)
		{
			potentialList.push(i);
		}
	};
	return potentialList;
};


/*

//***Brain***
    //As the pets starts it knows no items: 
	//A list of all the items the pet has encounterd before, and how many times it has encountered it. 
 	this.petItemsKnown = new Array();
	this.petEncounterCounter = new Array();
    petItemsKnown[0] = "0";

  //***ShortTerm Memorie:
    //Observe
    this.StmO1 = new Array();
    this.StmO2 = new Array();
    this.StmO3 = new Array();
    //HearingSound
    this.StmHS1 = new Array();
    this.StmHS2 = new Array();
    this.StmHS3 = new Array();
    //Interaction
    this.StmI1 = new Array();
    this.StmI2 = new Array();
    this.StmI3 = new Array();
  //***LoongTerm Memorie:
    //Observe
    this.LtmO1 = new Array();
    this.LtmO2 = new Array();
    this.LtmO3 = new Array();
    //HearingSound
    this.LtmHS1 = new Array();
    this.LtmHS2 = new Array();
    this.LtmHS3 = new Array();
    //Interaction
    this.LtmI1 = new Array();
    this.LtmI2 = new Array();
    this.LtmI3 = new Array();
 //***Sunconshious Memorie:
    //Observe
    this.SubO1 = new Array();
    this.SubO2 = new Array();
    this.StmO3 = new Array();
    //HearingSound
    this.SubHS1 = new Array();
    this.SubHS2 = new Array();
    this.SubHS3 = new Array();
    //Interaction
    this.SubI1 = new Array();
    this.SubI2 = new Array();
    this.SubI3 = new Array();




	if (this.petItemsKnown != undefined)
	{
		lengthKnown = this.petItemsKnown.length;
		if (this.petItemsKnown.length != 0)
		{

		}
		else
		{
			console.log("ItemsKnown has no length");
		}
	}
	else
	{
		console.log("ItemsKnown was undefined");
	}
*/