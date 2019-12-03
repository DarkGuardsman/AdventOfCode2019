//Imports
const fs = require('fs');

//Get args, first two args are path variables
const args = require('minimist')(process.argv.slice(2));

//Debug
console.log('Starting Day 2', args);
console.log('Data File: ', args.file);

//Get data file
const data = fs.readFileSync(args.file, 'utf8');

//Debug
console.log('Data:', data);

const memory = data.split(',').map(str => Number.parseInt(str, 10));
const count = memory.length;

//Debug
console.log('Count:', count);

//Debug
console.log('Replacing start data index 1 with 12 and index 2 with 2');
memory[1] = 12;
memory[2] = 2;

console.log('\nRunning Program:');

//Loop over commands, move 4 forward each code run (optCode|a|b|c)
for (let i = 0; i < count; i += 4) {
    const optCode = memory[i];
    console.log(`OptCode: ${optCode}`);

    //End condition
    if (optCode === 99) {
        i = count;
        console.log('  Halt Program')
    } else if (optCode === 1 || optCode === 2) {
        let a = memory[i + 1];
        let b = memory[i + 2];
        let c = memory[i + 3];

        //Add
        if (optCode === 1) {
            const result = memory[a] + memory[b];
            console.log(`  Add [$${a} > ${memory[a]}] + [$${b} > ${memory[b]}] = [$${c} > ${result}]`);
            memory[c] = result
        }
        //Multiply
        else {
            const result = memory[a] * memory[b];
            console.log(`  Add [$${a} > ${memory[a]}] + [$${b} > ${memory[b]}] = [$${c} > ${result}]`);
            memory[c] = result;
        }
    } else {
        throw new Error(`Unknown optCode ${optCode}`);
    }
}

console.log('End state: ', memory[0]);
