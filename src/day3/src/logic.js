import {convertData, loadData, plotData} from "./func";

/**
 * Runs the entire program
 * @param filePath
 */
export function run(filePath) {
    const wires = preProcess(filePath);
}
/**
 * Loads the file and process the data into points
 * @param filePath - file to load
 */
export function preProcess(filePath) {

    //Get data file
    const wires = loadData(filePath);

    //Parse data into something more usable
    wires.forEach(convertData);

    //Use the above data to generate a wire map
    wires.forEach(plotData);

    return wires;
}
