import {handleOpCode} from "./func";

export default class Computer {
    constructor(program) {
        this.program = program;

        //bind methods
        this.run = this.run.bind(this);
        this.nextInstruction = this.nextInstruction.bind(this);
        this.getCurrentOptCode = this.getCurrentOptCode.bind(this);
    }

    /**
     * Called to run the entire program to get the result in memory slot 0
     *
     * @param noun - memory slot 1
     * @param verb - memory slot 2
     * @returns {number} result of the program in memory slot 0
     */
    run(noun, verb) {

        //Copy program into memory and reset pointer
        this.memory = [...this.program];
        this.pointer = 0;

        //Setup memory starting conditions
        this.memory[1] = noun;
        this.memory[2] = verb;

        console.log(`Starting Computer with ${noun} ${verb}`);

        //Run until we stop
        let doRun = true;
        while (doRun) {
            doRun = this.nextInstruction();
        }

        //End state
        console.log('end state', this.memory[0]);
        return this.memory[0];
    }

    /**
     * Runs the next operation code, then moves the pointer forward
     * @returns {boolean} - true to keep running, false to stop the program
     */
    nextInstruction() {
        this.pointer = handleOpCode(this.getCurrentOptCode(), this.pointer, this.memory);
        return this.pointer >= 0;
    }

    /**
     * Gets the current operation code at the pointer
     * @returns {*}
     */
    getCurrentOptCode() {
        return this.memory[this.pointer];
    }
}
