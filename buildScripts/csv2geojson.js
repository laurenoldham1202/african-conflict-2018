const fs = require('fs');
const csv2geojson = require('csv2geojson');
const chalk = require('chalk');

// load traffic signals csv
function convertCsv() {
    fs.readFile(__dirname + '/../data/africa-conflict-2018.csv', 'utf-8', (err, csvString) => {

        if (err) throw err;

        console.log(chalk.green('CSV succesfully loaded.'));

        // convert csv to geojson, assigning proper coordinates
        csv2geojson.csv2geojson(csvString, {
            latfield: 'lat',
            lonfield: 'lng',
            delimiter: ','
        }, (err, geojson) => {

            if (err) throw err;

            // filter return as featureCollection
            var filteredGeojson = filterFields(geojson);

            fs.writeFile(__dirname + '/../data/africa-conflict-2018.json', JSON.stringify(filteredGeojson), 'utf-8', (err) => {

                if (err) throw err;

                console.log(chalk.green('africa-conflict-2018.json written to file'));
            });
        })
    });
}

function filterFields(geojson) {

    var features = geojson.features,  // shortcut to geojson features
        newFeatures = [];  // empty array to push new features to

    features.forEach((feature) => {

        var propertiesFiltered = {};  // empty object to write key value pairs for filtered properties

        for (var prop in feature.properties) {
            if (prop === 'country' || prop === 'date' || prop === 'actor1' || prop === 'actor2' ||
                prop === 'location' || prop === 'incident_fatalities' || prop === 'freq') {
                // assign key (tempProps[prop]) and value (feature.properties[prop]) for each feature
                propertiesFiltered[prop] = feature.properties[prop];
            }
        }

        // push features with filtered properties to empty array
        newFeatures.push({
            "type": feature.type,
            "geometry": feature.geometry,
            "properties": propertiesFiltered,
        });
    });

    // return feature collection geojson
    return {
        "type": "FeatureCollection",
        "features": newFeatures
    }
}

exports.convertCsv = convertCsv;
exports.filterFields = filterFields;
