import {calculateFuelForFuel, calculateFuelForModules, calculateFuelRequired, convertDataToNumbers} from "./func";

it('convertDataToNumbers', () => {
    const data = "100\n200\n300\n400\n500\n";
    const lines = convertDataToNumbers(data);
    expect(lines).toEqual([
        100,
        200,
        300,
        400,
        500
    ])
});

describe('calculateFuelRequired', () => {
    const testCases = [
        [1969, 654],
        [100756, 33583],
        [14, 2],
        [12, 2],
        [2, 0],
        [3, 0],
        [6, 0],
        [-2, 0],
        [0, 0]
    ];

    test.each(testCases)('Given %p the output should be %p', (mass, output) => {
        expect(calculateFuelRequired(mass)).toEqual(output);
    });
});

it('calculateFuelForModules', () => {
    const modules = [
        100756,
        1969,
        14
    ];
    const result = calculateFuelForModules(modules);
    expect(result).toEqual(50346 + 966 + 2);
});

describe('calculateFuelForFuel', () => {
    const testCases = [
        [2, 0],
        [1969, 966],
        [100756, 50346]
    ];

    test.each(testCases)('Given %p the output should be %p', (fuel, output) => {
        expect(calculateFuelForFuel(fuel)).toEqual(output);
    });
});


