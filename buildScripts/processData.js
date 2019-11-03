const bindData = require('./bindData.js');
const colorScheme = require('./filterColors.js');
const csvConversion = require('./csv2geojson.js');

// bind csv data to geojson, extract desired color scheme, and convert csv to geojson
bindData.processBindFiles();
colorScheme.extractSunsetDarkColors();
csvConversion.convertCsv();
