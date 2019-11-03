'use strict';

const fs = require('fs');
const csvParse = require('csv-parse');
const chalk = require('chalk');

/**
 * Parse files and bind together
 */
function processBindFiles() {

    // read countries json
    fs.readFile(__dirname + '/../data/africa-countries.json', 'utf8', (err, geojson) => {

        if (err) throw err;
        console.log(chalk.cyanBright('GeoJson successfully loaded!'));

        // read csv with african conflicts
        fs.readFile(__dirname + '/../data/africa-conflict-2018.csv', 'utf8', (err, csvString) => {

            if (err) throw err; // stop the script if error
            console.log(chalk.cyanBright('CSV successfully loaded!'));

            // parse the CSV file from text to array of objects
            csvParse(csvString, {
                columns: true
            }, (err, csvData) => {

                // bind csvdata to country polygons
                const boundGeojson = bindCsvToGeojson(JSON.parse(geojson), csvData);

                // write file to data directory
                fs.writeFile(__dirname + '/../data/africa-countries-counts.json', JSON.stringify(boundGeojson), 'utf8', function (err) {

                    if (err) throw err;

                    console.log(chalk.cyanBright('africa-countries-counts.json written'));
                });
            });
        });
    });
}

/**
 * Add count and deaths_per_million properties to matching geojson and csv rows (matched by country)
 * @param geojson
 * @param csvData
 */
function bindCsvToGeojson(geojson, csvData) {

    // loop through the features
    geojson.features.forEach((feature) => {
        let count = 0;

        // loop through the array of CSV data objects
        csvData.forEach((row) => {

            // if countries match
            if (feature.properties.NAME === row.country) {

                // increment the count for that feature
                count++;

                // create new property of number of fatalities per million citizens
                // row.freq represents number of fatalities per country
                feature.properties.deaths_per_million = (row.freq / feature.properties.POP_EST) * 1000000;
            }
        });

        // when done looping, add the count as a feature property
        feature.properties.count = count;
    });
    console.log(chalk.cyanBright('New feature properties added to geojson from csv!'));
    return geojson;
}

// export functions so they can be read in processData.js
exports.processBindFiles = processBindFiles;
exports.bindCsvToGeojson = bindCsvToGeojson;
