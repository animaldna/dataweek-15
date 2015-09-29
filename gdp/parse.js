var _ = require('underscore');
var async = require('async');
var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var parse = require('csv-parse');

var altColors = ["#B9C3D3","#5E6A7F","#D4DEEE","#7689A9","#E5EDFB"]; 
var altPos = 0;




/**
 * Function to extract CSV data 
*/
function parseCSV(storageVar, csvPath, callback){
    var parser = parse(function(err,data){
        if(err){
            console.log(err);
        } else {
            data.shift();
            storageVar = data;
            callback(null,data);
        }
    });
    fs.createReadStream(__dirname + csvPath).pipe(parser);
}

/**
 * Parse the CSVs - getting annual GDP by country and
 * global, annual GDP
*/
function parseSheets(callback){
    var countryData;
    var worldData;
    async.series([
        function (next){
            //parseCSV(worldData,'/totalYears.csv',function(err,data){ //ORIGINAL, FULL SET
              parseCSV(worldData,'/30totalYears.csv',function(err,data){ //pared down set - starts at 1984
                if (err) {
                    console.log(err);
                } else {
                    worldData = data;
                    next();
                }
            });
        },
        function (next){
            parseCSV(countryData,'/gdp.csv',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log('country');
                    countryData = data;
                    next();
                }
            });
        }], function (err){
            callback(null,countryData,worldData)
        }
    );  
}

/**
 * Using the current country and the starting index, 
 * find the index of the last instance of that country
 * 
 * (anything other than the first iteration,
 *  index should be the last "stop")
 */
function findNextCountry(countryData,index,currentCountry){
    for(index; index <= countryData.length; index++){
        // Check to make sure we haven't gone past the boundaries of countryData
        if (countryData[index]) { 
            if (countryData[index][0] != currentCountry) {
                // Found next country, return index
                return index;
            }   
        } else {
            // No more countries found, return false
            return false;
        }
    }    
}

/**
 * Use the start and stop indexes to grab 
 * a chunk of country GDP data for calculating
 */
function grabChunk(data,start,stop){
    var chunk = data.slice(start,stop);
    return chunk;
}

/**
 * Use annual world data to calculate percentage
 * GDP percentage of total
 */
function processChunk(countryChunk,worldData,realSeries,percentSeries){
    var countryCode = countryChunk[0][1];
    var country = countryChunk[0][0];

    if(altPos === 4){
        altPos = 0;
    }

    realSeries.push({
        "id": countryCode,
        "values":[],
        "text":country,
        "background-color":altColors[altPos],
        "line-color":altColors[altPos]
    });
    percentSeries.push({
        "id": countryCode,
        "values":[],
        "text":country,
        "background-color":altColors[altPos],
        "line-color":altColors[altPos]
    });

    altPos++;

    var x=0;
    var y=0;
    var percentage;

    var currItem = realSeries.length - 1;

    while(x != countryChunk.length){ 
        if(countryChunk[x][2] <= 1983){
            x++;
            continue;   
        }
        if(countryChunk[x][2] == worldData[y][0]){
            realValue = parseInt(countryChunk[x][3]);
            yearTotal = parseInt(worldData[y][1]);
            
            realValue.toFixed();
            yearTotal.toFixed();
            
            percentage = realValue/yearTotal;


            realSeries[currItem].values.push(realValue);
            percentSeries[currItem].values.push(percentage);
            x++;
            y++;
        } else {
            realSeries[currItem].values.push(0);
            percentSeries[currItem].values.push(0);
            y++;
        }
    }
}

function processData( countryData, worldData, callback) { 
    //console.log('country data inside of parse data is: ' + countryData[0]);
    var realSeries = [],
        percentSeries = [],
        start = 0,
        stop = 0,
        chunk = null,
        currentCountry = countryData[0][0];

    while(stop <= countryData.length){
        stop = findNextCountry(countryData,start,currentCountry);
        if (stop !== false) {
            chunk = grabChunk(countryData,start,stop);
            processChunk(chunk,worldData,realSeries,percentSeries);
            currentCountry = countryData[stop][0];    
            start = stop + 1;
        } else {
            break;
        }
    }
    callback(null,realSeries,percentSeries);
}

function saveFiles (realSeries, percentSeries, callback) {
    console.log("Saving files");
    fs.writeFile('./30realSeries.json', JSON.stringify(realSeries));
    fs.writeFile('./30percentSeries.json', JSON.stringify(percentSeries));
    callback(null);
}


async.waterfall([
    parseSheets,
    processData,
    saveFiles
],function(err){
    if(err){console.log(err);}
    console.log('Data processed and saved');
});








