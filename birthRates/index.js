var fs = require('fs');
var _ = require('underscore');
var parse = require('csv-parse');
var async = require('async');

/**
 * Quandl dataset:  https://goo.gl/n2DLqL
 * Restricted to years 2000-2009
 */
function getBirthRates(callback){
	var birthRates;
	//grab the file and parse it 
	fs.readFile(__dirname + '/birthRates.json',function(err,data){
		if(err){
			console.log(err);
		} else {
			birthRates = JSON.parse(data); 
			callback(null,birthRates); //pass it on to be reorganized
		}	
	});
}

/**
 * Get states and birth rates out of the Quandl dataset.
 * Reorganize everything into a new array that's easier to match 
 * with population data.
 */
function reorgBirthRates (birthRates,callback){
	var states = birthRates.dataset.column_names;
	var data = birthRates.dataset.data;
	var newDataArr = [];
	
	states.shift(); //first el is a header

	_.each(states,function(element){
		//Make each country its own object.
		//each array will assume order by year from 2000-2009
		newDataArr.push({
			'country': element, 
			'birthRate':[], 
			'population':[],
			'percentage':[],
			'liveBirths':[]                                                                                                                                         
		}); 
	});

	//loop through the birth rate quandl data	
	for(var i=0; i<data.length; i++){
		var yearEl = data[i];  //save reference to current year array
		yearEl.shift();  //first el is header

		//push val to each country's birthRate arr
		for(var j=0; j<yearEl.length;j++){
			newDataArr[j].birthRate.push(yearEl[j]);
		}
	}

	callback(null,newDataArr);
}

/**
 * US Census Data: https://goo.gl/H7eJaq
 * Data was prescrubbed. Just parsing the CSV.
 */
function parseCSV (newSet, callback){
	var parser = parse(function(err,data){
		if(err){
			console.log(err);
		} else {
			data.shift();
			callback(null,newSet,data);
		}
	});
	fs.createReadStream(__dirname + '/intercensalState.csv').pipe(parser);
}

/**
 * Push population data into the new dataset
 */
function pushPopulation(newSet,population,callback){
	_.each(population,function(element,index){
		 var stateValues = element;
		 stateValues.shift(); //get rid of the state name
		 newSet[index].population = stateValues;
	});
	callback(null,newSet);
}

/**
 * Calculate an estimated number of live births each year per state using
 * the state's intercensal population estimate and birth rate. 
 * Live births = (population / 1000) * birthRate
 * 
 * Also, birthTotals is an array of each year's total births, to be used in
 * calc of percentages.
 * 
 * Pass JSON to calcPercentages()
 */ 
function calcLiveBirths(newSet,callback){
	var birthRates;
	var population;
	var liveBirths;
	var currentValue;
	var birthTotals = [0,0,0,0,0,0,0,0,0,0];
	_.each(newSet,function(element,index){
		//save references so it's easier to read
		birthRates = element.birthRate;
		population = element.population;
		liveBirths = element.liveBirths;

		for(var i=0; i<birthRates.length; i++){
			currentValue = Math.ceil((population[i] / 1000) * birthRates[i]);
			liveBirths.push(currentValue);	
			birthTotals[i] += currentValue;
		}

	});	
	callback(null,newSet,birthTotals);
}

/**
 * Calculate each state's percentage of total births.
 */
function calcPercentages(newSet,birthTotals,callback){
	var percentage;
	_.each(newSet,function(element,index){
		for(var i=0;i<birthTotals.length;i++){
			percentage = element.liveBirths[i]/birthTotals[i];
			element.percentage.push(percentage);
		}
	});
	callback(null,newSet);
}


/**
 * Output final dataset to new file.
 */
 function saveNewJSON (newSet, callback){
 	var stringifiedSet = JSON.stringify(newSet,null,4);
 	fs.writeFile('newDataSet.json',stringifiedSet,function(err){
 		if(err){
 			console.log(err);
 		} else {
 			console.log('file successfully saved');
 		}
 	});
 }

async.waterfall([
		getBirthRates,
		reorgBirthRates,
		parseCSV,
		pushPopulation,
		calcLiveBirths,
		calcPercentages,
		saveNewJSON
	],function(err,output){
	//console.log(output);
});