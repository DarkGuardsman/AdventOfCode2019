//Imports
const fs = require('fs');

//Get args, first two args are path variables
const args = require('minimist')(process.argv.slice(2));

//Debug
console.log('Starting Day 3', args);
console.log('Data File: ', args.file);

//Get data file
const data = fs.readFileSync(args.file, 'utf8');

//Debug
console.log('Data:', data);
