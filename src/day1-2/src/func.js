/**
 * Converts the string read from file into an array of numbers
 * @param data - string of all lines from file
 * @returns {number[]}
 */
export function convertDataToNumbers(data) {
    return data.split('\n')
        .map(str => Number.parseInt(str.trim()))
        .filter(num => !Number.isNaN(num));
}

/**
 * Calculates the fuel required for all modules based on mass
 * @param modules - array of mass values
 * @returns {*}
 */
export function calculateFuelForModules(modules) {
    return modules.map(calculateFuelRequired).reduce((a, b) => a + b, 0);
}

/**
 * Calculates the fuel required based on mass
 * @param mass - numeric mass value
 * @returns {number}
 */
export function calculateFuelRequired(mass) {
    return Math.max(0, Math.floor(mass / 3) - 2);
}
