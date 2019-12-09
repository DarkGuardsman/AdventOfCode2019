const ADD = 1;
const MULTIPLY = 2;
const STOP = 99;

/**
 * Converts the input data string read from file into an array of integers
 * @param data
 * @returns {number[]}
 */
export function convertDataToNumbers(data) {
    return data.split(',').map(str => Number.parseInt(str, 10));
}

/**
 * Called to handle the operation code
 *
 * @param optCode - numeric code
 * @param pointer - current pointer in memory
 * @param memory - entire memory of the program
 * @returns {number} new pointer location (less than zero is end program)
 */
export function handleOpCode(optCode, pointer, memory) {
    //End condition
    if (optCode === STOP) {
        return -1;
    } else if (optCode === ADD || optCode === MULTIPLY) {
        let a = memory[pointer + 1];
        let b = memory[pointer + 2];
        let c = memory[pointer + 3];

        //Add
        if (optCode === ADD) {
            memory[c] = memory[a] + memory[b]
        }
        //Multiply
        else {
            memory[c] = memory[a] * memory[b];
        }
        return pointer + 4;
    } else {
        throw new Error(`Unknown optCode ${optCode}`);
    }
}
