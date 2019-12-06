import minimist from 'minimist';

//Get args, first two args are path variables
const args = minimist(process.argv.slice(2));
const filePath = args.file;

//Debug
console.log('Starting Day 3', args);
console.log('Data File: ', filePath);

//Run program
const result = run(filePath);
console.log('Closest Node: ', result);

