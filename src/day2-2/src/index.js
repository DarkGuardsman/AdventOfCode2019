import {convertDataToNumbers} from "./func";
import fs from 'fs';
import minimist from 'minimist';
import Computer from "./computer";

//Get args, first two args are path variables
const args = minimist(process.argv.slice(2));

//Debug
console.log('Starting Day 2', args);
console.log('Data File: ', args.file);

//Get data file
const data = fs.readFileSync(args.file, 'utf8');

//Debug
console.log('Data:', data);

const program = convertDataToNumbers(data);
const count = program.length;

//Debug
console.log('Count:', count);

const computer = new Computer(program);

//Loop until we find a combo that works
for(let n = 0; n < 100; n++) {
    for(let v = 0; v < 100; v++) {
        const result = computer.run(n, v);
        if(result === 19690720) {
            console.log(`noun = ${n} verb = ${v}`);
            console.log(`Answer ${100 * n + v}`);
            n = 100;
            v = 100;
        }
    }
}
