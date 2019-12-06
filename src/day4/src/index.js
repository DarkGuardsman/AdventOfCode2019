import minimist from 'minimist';
import {doesNotDecrease, hasDoubleNumbers} from "./func";

//Get args, first two args are path variables
const args = minimist(process.argv.slice(2));
const start = args.start;
const end = args.end;

//Debug
console.log('Starting Day 4');
console.log(`Range: ${start}-${end}`);

let count = 0;

for(let i = start; i <= end; i++) {
    const chars = `${i}`.split('');
    if(hasDoubleNumbers(chars) && doesNotDecrease(chars)) {
        count += 1;
        console.log(i);
    }
}

console.log('\nCount: ' + count);
