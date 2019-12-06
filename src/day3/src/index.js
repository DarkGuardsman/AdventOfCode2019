import minimist from 'minimist';
import {convertData, loadData, plotData} from './func';

//Get args, first two args are path variables
const args = minimist(process.argv.slice(2));
const filePath = args.file;

//Debug
console.log('Starting Day 3', args);
console.log('Data File: ', filePath);

//Get data file
const wires = loadData(filePath);
const count = wires.length;

//Debug
console.log('Wires:', count);

//Parse data into something more usable
wires.forEach(convertData);

//Use the above data to generate a wire map
wires.forEach(plotData);

