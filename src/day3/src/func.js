import fs from "fs";

/**
 * Loads the data from the file
 * @param filePath
 * @returns {string[]}
 */
export function loadData(filePath) {
    //Load file and convert to lines
    const data = fs.readFileSync(filePath, 'utf8');
    return processFileString(data);
}

/**
 * Processes the file string into wire array
 * @param data - string containing all data
 * @returns {[]} wires
 */
export function processFileString(data) {
    const lines = data.split('\n');

    //Convert lines to wire objects for easier processing
    const wires = [];
    for (let i = 0; i < lines.length; i++) {
        const wire = {};

        //Setup an id for debug
        wire.id = i;

        //Load nodes
        wire.nodes = lines[i].split(",").map(n => n.trim());

        //Push to array
        wires.push(wire);
    }

    return wires;
}

/**
 * Converts wire's node data from strings to objects
 * @param wire - wire object containing a nodes array of strings
 */
export function convertData(wire) {
    wire.nodes = wire.nodes.map((str, index) => convertNode(str, index));
}

/**
 * Converts a node string into an object
 * @param str - node string, EX: U26
 * @param index - position in the wire's path
 * @returns {{distance: *, data: *, id: *, direction: *}}
 */
export function convertNode(str, index) {
    const direction = moveVector(str);
    const distance = moveDistance(str);
    return {direction, distance, id: index, data: str}
}

/**
 * Converts the wire node paths into a wire map
 * @param wire - {id: 0, nodes: []}
 */
export function plotData(wire) {
    let pos = {x: 0, y: 0};

    //Init points
    wire.points = [];

    //Generate point data from nodes
    wire.nodes.forEach(node => pathNode(pos, node, wire.points));
}

/**
 * Use the node to generate wire points and move the position forward
 * @param pos - current position
 * @param node - node being pathed
 * @param pointsOut - output array for points generated
 */
export function pathNode(pos, node, pointsOut) {
    const {direction, distance} = node;
    //Loop distance creating each slot
    for (let d = 0; d < distance; d++) {
        //Step forward 1
        step(pos, direction, 1);

        //Push position to out
        pointsOut.push({...pos});
    }
}

/**
 * Steps the position forward 1
 * @param pos - current position
 * @param direction - what is forward
 * @param distance - distance to move, defaults to 1
 */
export function step(pos, direction, distance = 1) {
    pos.x += direction.x * distance;
    pos.y += direction.y * distance;
}

/**
 * Converts the wire node into a move direction
 *
 * @param node - EX: U26 -> up 26 times, UP -> {x: 0, y: 1}
 * @returns {{x: number, y: number}}
 */
export function moveVector(node) {
    if (node.startsWith("U")) {
        return {x: 0, y: 1};
    } else if (node.startsWith("D")) {
        return {x: 0, y: -1};
    } else if (node.startsWith("R")) {
        return {x: 1, y: 0};
    } else if (node.startsWith("L")) {
        return {x: -1, y: 0};
    } else {
        throw new Error(`Invalid vector start ${node}`);
    }
}

/**
 * Extracts distance to move from each node
 * @param node
 * @returns {number}
 */
export function moveDistance(node) {
    return Number.parseInt(node.substring(1, node.length));
}
