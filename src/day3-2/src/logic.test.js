import {buildHashMap, containsPoint, findIntersections, getIntersections, hashPoint, run} from './logic';
import {INTERSECTION} from "./func";
import {wireA, wireB, wireC, wireD} from "./test_data";

it('data set 1 should output 610', () => {
    const result = run('./data.test.1.txt');
    expect(result.step).toBe(610);
});

it('data set 2 should output 410', () => {
    const result = run('./data.test.2.txt');
    expect(result.step).toBe(410);
});

//Check that contains point works as expected
describe('containsPoint', () => {
    const points = [
        {x: 0, y: 0},
        {x: 22, y: 22}
    ];

    const wire = {
        points: points,
        pointHashMap: buildHashMap(points)
    };

    const testCases = [
        //Point to check, found=true

        //Data that should be found
        [{x: 0, y: 0}, true],
        [{x: 22, y: 22}, true],

        //Data with same shape but different values
        [{x: -22, y: 22}, false],
        [{x: -22, y: -22}, false],

        //Data around center point
        [{x: 0, y: 1}, false],
        [{x: 0, y: -1}, false],
        [{x: 1, y: 0}, false],
        [{x: -1, y: 0}, false]
    ];

    test.each(testCases)('Wire contains %p should be %p', (point, out) => {
        const result = containsPoint(wire, point);
        expect(result).toBe(out);
    });
});

//Check we can detect intersecting wires
it('wires intersect', () => {
    const result = getIntersections(wireA, wireB);
    expect(result).toEqual([
        {x: 3, y: 3, step: 12, type: INTERSECTION, distance: 6}
    ]);
});

//Check we can detect intersecting wires
it('wires not intersect', () => {
    const result = getIntersections(wireA, wireC);
    expect(result).toEqual([]);
});

//Check we can detect intersecting wires
describe('findIntersections', () => {
    it('2 wires 1 hit 1 overlays 0 ignored', () => {
        const result = findIntersections([wireA, wireB]);
        expect(result).toEqual([
            {x: 3, y: 3, step: 12, type: INTERSECTION, distance: 6}
        ]);
    });

    it('2 wires 0 hit 0 overlays 2 ignored', () => {
        const result = findIntersections([wireA, wireC]);
        expect(result).toEqual([]);
    });

    it('4 wires 2 hits 2 overlays 1 ignored', () => {
        const result = findIntersections([wireA, wireC, wireB, wireD]);
        expect(result).toEqual([
            {x: 3, y: 3, step: 12, type: INTERSECTION, distance: 6},
            {x: 3, y: 2, step: 14, type: INTERSECTION, distance: 5}
        ]);
    });
});
