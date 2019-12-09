import {calculateFuelForFuel, calculateFuelForModules, convertDataToNumbers} from "./func";
import fs from 'fs';
import minimist from 'minimist';

//Get args, first two args are path variables
const args = minimist(process.argv.slice(2));

//Debug
console.log('Starting Day 1', args);
console.log('Data File: ', args.file);

//Get data file
const data = fs.readFileSync(args.file, 'utf8');

//Debug
console.log('Data:', data);

//Convert data into an array of numbers
const lines = convertDataToNumbers(data);

//Debug
console.log('Lines:', lines.length);

//Part 1 calculation
console.log('\nCalculating Fuel:');
let fuelForMass = calculateFuelForModules(lines);
console.log("\tTotal: ", fuelForMass);
