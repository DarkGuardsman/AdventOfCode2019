import {convertData, convertNode, moveDistance, moveVector, pathNode, processFileString, step} from "./func";

it('processFileString', () => {
    const data = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83";

    const result = processFileString(data);

    expect(result).toEqual([
        {
            id: 0,
            nodes: ["R75","D30","R83","U83","L12","D49","R71","U7","L72"]
        },
        {
            id: 1,
            nodes: ["U62","R66","U55","R34","D71","R55","D58","R83"]
        }
    ])
});

it('convertData', () => {
    const wire = {
        nodes: [
            "U22",
            "R34",
            "D12",
            "L29"
        ]
    };

    //Invoke, this will mute the wire object
    convertData(wire);

    expect(wire).toEqual({
        nodes: [
            {direction: {x: 0, y: 1}, distance: 22, data: "U22", id: 0},
            {direction: {x: 1, y: 0}, distance: 34, data: "R34", id: 1},
            {direction: {x: 0, y: -1}, distance: 12, data: "D12", id: 2},
            {direction: {x: -1, y: 0}, distance: 29, data: "L29", id: 3}
        ]
    })
});

describe('convertNode', () => {
    const testCases = [
        //Input Node String, Input index,
        ["U12", 0, {direction: {x: 0, y: 1}, distance: 12, data: "U12", id: 0}],
        ["D2", 20, {direction: {x: 0, y: -1}, distance: 2, data: "D2", id: 20}],
        ["R200", 3, {direction: {x: 1, y: 0}, distance: 200, data: "R200", id: 3}],
        ["L-2", 100, {direction: {x: -1, y: 0}, distance: -2, data: "L-2", id: 100}],
    ];

    test.each(testCases)('Given (%p, %p) i expect %p', (str, index, out) => {
        const result = convertNode(str, index);
        expect(result).toEqual(out);
    });
});

describe('moveVector', () => {
    const testCases = [
        //Input Node, expected x, expected y
        ["U", 0, 1],
        ["D", 0, -1],
        ["R", 1, 0],
        ["L", -1, 0],

        ["U1", 0, 1],
        ["D2", 0, -1],
        ["R3", 1, 0],
        ["L4", -1, 0],

        ["U23", 0, 1],
        ["D45", 0, -1],
        ["R67", 1, 0],
        ["L22", -1, 0]
    ];

    test.each(testCases)('Given %p i expect x = %p and y = %p', (node, x, y) => {
        const result = moveVector(node);
        expect(result).toEqual({x, y});
    });
});

describe('moveDistance', () => {
    const testCases = [
        //Input Node, expected number
        ["U1", 1],
        ["D2", 2],
        ["R3", 3],
        ["L4", 4],

        ["U23", 23],
        ["D45", 45],
        ["R67", 67],
        ["L22", 22]
    ];

    test.each(testCases)('Given %p i expect %p', (node, num) => {
        const result = moveDistance(node);
        expect(result).toEqual(num);
    });
});

describe('step', () => {
    const testCases = [
        [{x: 0, y: 0}, {x: 0, y: 1}, 1, {x: 0, y: 1}],
        [{x: 120, y: 456}, {x: 1, y: 0}, 1, {x: 121, y: 456}],
        [{x: 120, y: 456}, {x: -1, y: 0}, 20, {x: 100, y: 456}]
    ];

    test.each(testCases)('Given start(%p) direction{%p) distance(%p) my position should be %p', (pos, direction, distance, end) => {
        //Trigger
        step(pos, direction, distance);

        //Check pos
        expect(pos).toEqual(end);
    });
});

describe('pathNode', () => {
    const testCases = [
        [{x: 0, y: 0}, {direction: {x: 0, y: 1}, distance: 3, data: "U3", id: 0}, [{x: 0, y: 1}, {x: 0, y: 2}, {
            x: 0,
            y: 3
        }]],
        [{x: 0, y: 0}, {direction: {x: 0, y: -1}, distance: 3, data: "D3", id: 0}, [{x: 0, y: -1}, {x: 0, y: -2}, {
            x: 0,
            y: -3
        }]],
        [{x: 0, y: 0}, {direction: {x: 1, y: 0}, distance: 3, data: "R3", id: 0}, [{x: 1, y: 0}, {x: 2, y: 0}, {
            x: 3,
            y: 0
        }]],
        [{x: 0, y: 0}, {direction: {x: -1, y: 0}, distance: 3, data: "L3", id: 0}, [{x: -1, y: 0}, {
            x: -2,
            y: 0
        }, {x: -3, y: 0}]],
    ];

    test.each(testCases)('Given start(%p) node{%p) my points should be %p', (start, node, points) => {
        //Trigger
        const result = [];
        pathNode(start, node, result);

        //Check we generated the points
        expect(result).toEqual(points);
    });
});
