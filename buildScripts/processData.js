const bindData = require('./bindData.js');
const csvConversion = require('./csv2geojson.js');
const fs = require('fs');

// run the processes
bindData.processBindFiles();
csvConversion.convertCsv();
