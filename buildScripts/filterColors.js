const fs = require('fs');
const chalk = require('chalk');

/**
 * Extract SunsetDark sequential color scheme from
 */
function extractSunsetDarkColors() {

    // read in main carto-colors json (pulled from lesson)
    fs.readFile(__dirname + '/../data/carto-colors.json', (err, response) => {

        if (err) throw err;

        // confirm successful load
        console.log(chalk.magentaBright('carto-colors.json successfully loaded!'));

        const data = JSON.parse(response);

        console.log(chalk.magentaBright('carto-colors.json successfully parsed to JSON'));

        // create new object with sunsetdark color subset
        const sunsetDarkColors = {
            'SunsetDark': data['SunsetDark']
        };

        console.log(chalk.magentaBright('SunsetDark colors extracted from parsed json!'));

        // write subset to new file
        fs.writeFile(__dirname + '/../data/sunset-dark-colors.json', JSON.stringify(sunsetDarkColors), 'utf-8', (err) => {

            if (err) throw err;

            console.log(chalk.magentaBright('sunset-dark-colors.json written to data/ directory!'));
        });
    });
}

// export function so it can be read into processData.js
exports.extractSunsetDarkColors = extractSunsetDarkColors;
