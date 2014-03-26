function FindPath(worldGrid, startPos, endPos)
{
	//console.log ("Finding Path");
	var abs = Math.abs; //Passing a non-numeric string or undefined/empty variable returns NaN. Passing null returns 0.
	var max = Math.max; //Returns the largest of zero or more numbers.

	//We could always just acces the global "worldX", but this way we make "pathfinding" 100% independant.
	var worldX = worldGrid[0].length;
	var worldZ = worldGrid.length;
	var worldSize = worldZ * worldX;

	//We use this to calculate the distance to the nodes in "calculatePath"
	function distanceFunction(Point, Goal)
	{
		return max(abs(Point.x - Goal.x), 0, abs(Point.z - Goal.z));
	} // distanceCheck Ends

	//Finding out if the nodes around the node we are currently working on, is free.
	function Neighbours(x, z)
	{
		//north is in through the screen
		var
		north = z - 1,
			south = z + 1,
			west = x - 1,
			east = x + 1,

			//Simply "northOpen is true if north is not outside of the board and the walkable function returns true"
			northOpen = north > -1 && walkable(x, north),
			southOpen = south < worldZ && walkable(x, south),
			westOpen = west > -1 && walkable(west, z),
			eastOpen = east < worldX && walkable(east, z),
			//northWestOpen = northOpen && westOpen && walkable(west, north),
			//northEastOpen = northOpen && eastOpen && walkable(east, north),
			//southWestOpen = southOpen && westOpen && walkable(west, south),
			//southEastOpen = southOpen && eastOpen && walkable(east, south),
			result = [];

		if (northOpen)
		{
			result.push(
			{
				x: x,
				z: north
			});
		}
		if (southOpen)
		{
			result.push(
			{
				x: x,
				z: south
			});
		}
		if (westOpen)
		{
			result.push(
			{
				x: west,
				z: z
			});
		}
		if (eastOpen)
		{
			result.push(
			{
				x: east,
				z: z
			});
		}

		/*
		if (northWestOpen)
		{
			result.push({x:west, z:north});
		}
		if (northEastOpen)
		{
			result.push({x:east, z:north});
		}
		if (southWestOpen)
		{
			result.push({x:west, z:south});
		}
		if (southEastOpen)
		{
			result.push({x:east, z:south});
		}*/

		return result;

	} //Neighbours ends

	//The almighty walkable function. First we make sure that there is in fact a worldGrid of that type.
	//Then we check if that world grid is marked as 0. As 0 can be walked on, and 1 cant!
	function walkable(x, z)
	{
		return ((worldGrid[x] != null) &&
			(worldGrid[x][z] != null) &&
			(worldGrid[x][z] <= 1));
	} // walkable ends

	//Here we make our nodes.
	//Parent node is the node we used when we first checked this node via Neighbours.
	function Node(Parent, Point)
	{
		var newNode = {
			//Parent node is the node we used when we first checked this node via Neighbours.
			Parent: Parent,
			value: Point.x + (Point.z * worldZ),
			x: Point.x,
			z: Point.z,

			//distanceFunction cost from start to this node
			f: 0,
			//distanceFunction cost from this node to finish
			g: 0
		};

		return newNode;
	} // Node ends

	function calkulatePath()
	{
		var
		startNode = Node(null,
		{
			x: startPos.x,
			z: startPos.z
		}),
			endNode = Node(null,
			{
				x: endPos.x,
				z: endPos.z
			}),

			valueAssignedHelp = new Array(worldSize),
			open = [startNode],
			closed = [],

			result = [startNode],

			currentTestNeighbours,
			currentTestNode,
			currentPathHolder,

			length,
			openMaxF,
			openValue,
			i,
			j;

		//The while will stop as soon at all the nodes in Open has been used.
		//""valueAssignHelp, Closed, Open = [];"" takes nodes away from the open list
		while (length = open.length)
		{
			openMaxF = worldSize;
			openValue = -1;

			for (i = 0; i < length; i++)
			{
				// we always want to work with the open that has the lowest potential work path. 
				if (open[i].f < openMaxF)
				{
					openMaxF = open[i].f; // this is now the lowest path known
					openValue = i; // this is the number of the node with the lowest path value.
				}
			}
			//We take the next open node and get ready to check it.
			//Splice will take the node away from the array as we arnt putting in anything else
			currentTestNode = open.splice(openValue, 1)[0]; //splice(index, number of items to take)[what to replace it with]

			//Check first if the path node is the target path:
			if (currentTestNode.value === endNode.value)
			{
				//Finish up!
				//As we are working with nodes of the lowest combined distancevalue, if that node is the end
				//we assign it to the temp"currentPathHolder" and start pulling its parent.
				//currentPathHolder = closed[closed.push(currentTestNode) -1];
				currentPathHolder = currentTestNode;

				//We assign it to result. 
				do {
					resultVector = new THREE.Vector3(currentPathHolder.x, 0, currentPathHolder.z);
					result.push(resultVector);
				}
				while (currentPathHolder = currentPathHolder.Parent);
				//When it has been assigned, we do so that currentPath = its own parent
				//Then we do the "DO" over again. We do this until there are no more parents left. 

				//We reset all the values (amongst other stopp this while loop)
				valueAssignedHelp = closed = open = [];

				//Finally we flipp the values so we have a path from start to finish and not the other way
				result.reverse();
			}
			else
			{
				//See if the nodes next to "currentTestNode" is Walkable
				currentTestNeighbours = Neighbours(currentTestNode.x, currentTestNode.z);
				//So now we know witch one is walkable, we want to be able to find the one with the shortest path.
				//We will therefor make nodes out of them
				for (i = 0, j = currentTestNeighbours.length; i < j; i++)
				{
					//Now we will work with one Neighbour at the time. We will assign a node to it
					//Giving it a few values, and a THIS node as its PARENT.
					currentPathHolder = Node(currentTestNode, currentTestNeighbours[i]);

					//Now we will check if the currentTestNeighbours we are currently working on, has all its values.
					//To make sure this runs only once, we have added valueAssignHelp[X]
					//valueAssignHelp[Relative node number] will ring true if it has been handled
					if (!valueAssignedHelp[currentPathHolder.value])
					{
						//currentTestNode.g already has a value from start to this node.
						//Here we will add the extra cost it cost to get to this new node: 
						//The cost from currentPath to currentTestNode + distance to start from here.
						currentPathHolder.g = currentTestNode.g + distanceFunction(currentTestNeighbours[i], currentTestNode);
						//Then we check the full value of this node from start, to this node to end.
						currentPathHolder.f = currentPathHolder.g + distanceFunction(currentTestNeighbours[i], endPos);

						//To test this path later, we want to remember it;
						open.push(currentPathHolder);

						//Then we tell the program that this currentPath value has been tested:
						valueAssignedHelp[currentPathHolder.value] = true;
					}
				}

				//closed.push(currentTestNode);      
			}
		}

		return result;

	} // calkulatePath ends

	return calkulatePath();

} //FindPath Ends