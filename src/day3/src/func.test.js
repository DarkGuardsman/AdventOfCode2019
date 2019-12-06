import {
    convertData,
    convertNode,
    DOWN, HORIZONTAL, JOINT,
    LEFT,
    loadData,
    moveDistance,
    moveVector,
    pathNode,
    plotData,
    processFileString,
    RIGHT, START,
    step,
    UP, VERTICAL
} from "./func";

const expectedWireTest1 = [
    {
        id: 0,
        nodes: ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"]
    },
    {
        id: 1,
        nodes: ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
    }
];

//Tests both loading the file & processFileString's handling of empty lines
it('loadData', () => {
    const result = loadData('./data.test.1.txt');
    expect(result).toEqual(expectedWireTest1);
});

//Tests that we can convert the data string into wire objects
it('processFileString', () => {
    const data = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83";
    const result = processFileString(data);
    expect(result).toEqual(expectedWireTest1);
});


//Tests that we can convert the node strings into an object
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
            {direction: UP, distance: 22, data: "U22", id: 0},
            {direction: RIGHT, distance: 34, data: "R34", id: 1},
            {direction: DOWN, distance: 12, data: "D12", id: 2},
            {direction: LEFT, distance: 29, data: "L29", id: 3}
        ]
    })
});

//Tests that we can convert a single string node into an object
describe('convertNode', () => {
    const testCases = [
        //Input Node String, Input index,
        ["U12", 0, {direction: UP, distance: 12, data: "U12", id: 0}],
        ["D2", 20, {direction: DOWN, distance: 2, data: "D2", id: 20}],
        ["R200", 3, {direction: RIGHT, distance: 200, data: "R200", id: 3}],
        ["L-2", 100, {direction: LEFT, distance: -2, data: "L-2", id: 100}],
    ];

    test.each(testCases)('Given (%p, %p) i expect %p', (str, index, out) => {
        const result = convertNode(str, index);
        expect(result).toEqual(out);
    });
});

//Tests that we can get the direction from the node string
describe('moveVector', () => {
    const testCases = [
        //Input Node, expected x, expected y
        ["U", UP],
        ["D", DOWN],
        ["R", RIGHT],
        ["L", LEFT],

        ["U1", UP],
        ["D2", DOWN],
        ["R3", RIGHT],
        ["L4", LEFT],

        ["U23", UP],
        ["D45", DOWN],
        ["R67", RIGHT],
        ["L22", LEFT]
    ];

    test.each(testCases)('Given %p i expect %p', (node, direction) => {
        const result = moveVector(node);
        expect(result).toEqual(direction);
    });
});


//Tests that we can get the distance from the node string
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

//Tests the we can step forward based on the direction & distance
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

//Tests that we can path an entire node (aka generating point data)
describe('pathNode', () => {
    const testCases = [
        [{x: 0, y: 0}, {direction: UP, distance: 3, data: "U3", id: 0},
            [{x: 0, y: 1, type: '|'}, {x: 0, y: 2, type: '|'}, {x: 0, y: 3, type: '+'}]],

        [{x: 0, y: 0}, {direction: DOWN, distance: 3, data: "D3", id: 0},
            [{x: 0, y: -1, type: '|'}, {x: 0, y: -2, type: '|'}, {x: 0, y: -3, type: '+'}]],

        [{x: 0, y: 0}, {direction: RIGHT, distance: 3, data: "R3", id: 0},
            [{x: 1, y: 0, type: '-'}, {x: 2, y: 0, type: '-'}, {x: 3, y: 0, type: '+'}]],

        [{x: 0, y: 0}, {direction: LEFT, distance: 3, data: "L3", id: 0},
            [{x: -1, y: 0, type: '-'}, {x: -2, y: 0, type: '-'}, {x: -3, y: 0, type: '+'}]],
    ];

    test.each(testCases)('Given start(%p) node{%p) my points should be %p', (start, node, points) => {
        //Trigger
        const result = [];
        pathNode(start, node, result);

        //Check we generated the points
        expect(result).toEqual(points);
    });
});

it('plotData', () => {
    const wire = {
        nodes: [
            {direction: UP, distance: 3, data: "U3", id: 0},
            {direction: RIGHT, distance: 3, data: "R3", id: 1}
        ]
    };

    //Start plotting
    plotData(wire);

    //Check modifications to wire
    expect(wire).toEqual(
        {
            nodes: [
                {direction: UP, distance: 3, data: "U3", id: 0},
                {direction: RIGHT, distance: 3, data: "R3", id: 1}
            ],
            points: [
                {x: 0, y: 0, type: START},
                {x: 0, y: 1, type: VERTICAL},
                {x: 0, y: 2, type: VERTICAL},
                {x: 0, y: 3, type: JOINT},
                {x: 1, y: 3, type: HORIZONTAL},
                {x: 2, y: 3, type: HORIZONTAL},
                {x: 3, y: 3, type: JOINT},
            ]
        }
    )
});
