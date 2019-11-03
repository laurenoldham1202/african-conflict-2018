const fs = require('fs');
const chalk = require('chalk');


function extractColors() {

    // read in main cartocolors json
    fs.readFile(__dirname + '/../project-files/cartocolors.json', function (err, response) {

        if (err) throw err;

        // confirm successful load
        console.log(chalk.blue("cartocolors.json data loaded!"));

        const data = JSON.parse(response);

        console.log(chalk.blue("cartocolors.json data parsed to JSON"));

        // create new object with vivid color subset
        const outputData = {
            'Vivid': data['Vivid']
        };

        console.log(chalk.blue("vivid scheme extracted from parsed data"));

        // write vivid subset to new file
        fs.writeFile(__dirname + '/../data/vividcolors.json', JSON.stringify(outputData), 'utf-8', function (err) {

            if (err) throw err;

            console.log(chalk.blue('vividcolors.json written to data/ dir'));
        });
    });
}

// export function so it can be read by importing colorScheme.js into processData.js
exports.extractColors = extractColors;
