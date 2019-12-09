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
    return modules.map( mass => {
        let fuel = calculateFuelRequired(mass);
        fuel += calculateFuelForFuel(fuel);
        return fuel;
    }).reduce((a, b) => a + b, 0);
}

/**
 * Calculates the fuel required for the fuel needed. This
 * will recalculate several times as each fuel step needs
 * more fuel until it hits a point that zero fuel is required
 * for the fule provided.
 *
 * This, however, is not a recursive function.
 *
 * @param fuel - starting amount
 *
 * @return {number} fuel needed for fuel provided
 */
export function calculateFuelForFuel(fuel) {
    let fuelLast = fuel;
    let fuelNeeded = 0;

    while(fuelLast > 0) {
        fuelLast = calculateFuelRequired(fuelLast);
        fuelNeeded += fuelLast;
    }

    return fuelNeeded;
}

/**
 * Calculates the fuel required based on mass
 * @param mass - numeric mass value
 * @returns {number}
 */
export function calculateFuelRequired(mass) {
    return Math.max(0, Math.floor(mass / 3) - 2);
}
