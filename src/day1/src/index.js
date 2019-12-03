//Imports
const fs = require('fs');

//Get args, first two args are path variables
const args = require('minimist')(process.argv.slice(2));

//Debug
console.log('Starting Day 1', args);
console.log('Data File: ', args.file);

//Get data file
const data = fs.readFileSync(args.file, 'utf8');

//Debug
console.log('Data:', data);

const lines = data.split('\n');
const count = lines.length - 1; //Last line is empty

//Debug
console.log('Lines:', count);

let totalMass = 0;

console.log('\nCalculating:');

//Loop modules from data file
for(let i = 0; i < count; i++) {
    let module = lines[i];
    //Mass is module value divided by 3, rounded down, and minus 2
    let mass = Math.floor(module / 3) - 2;

    //Debug
    console.log(`  [${i}] (${module} / 3) - 2 = ${mass}`);

    totalMass += mass;
}

console.log("Total", totalMass);
