import {convertData, INTERSECTION, loadData, plotData, START} from "./func";
import {isEqual, uniqWith} from 'lodash';

/**
 * Runs the entire program
 * @param filePath
 */
export function run(filePath) {
    const wires = preProcess(filePath);

    //Debug
    console.log("Wire Data:");
    wires.forEach(wire => {
        console.log(`\tWire[${wire.id}] has ${wire.points.length} points`);
    });

    const intersections = findIntersections(wires).sort(sortBySteps);

    //Debug
    console.log("Intersections:");
    intersections.forEach(point => {
        console.log('\t', point);
    });

    return intersections.length > 0 ? intersections[0] : undefined;
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

/** Finds all intersections between all wires contained */
export function findIntersections(wires) {
    let hits = [];
    for (let i = 0; i < wires.length; i++) {
        for (let j = i + 1; j < wires.length; j++) {
            console.log(`\nComparing ${wires[i].id} ${wires[j].id}`);
            hits = hits.concat(getIntersections(wires[i], wires[j]));
        }
    }
    return removeDuplications(hits);
}

/** Removes duplicate points */
export function removeDuplications(hits) {
    return uniqWith(hits, isEqual);
}

/** Find any intersections between wireA and wireB. Ignores any node marked as a start point. */
export function getIntersections(wireA, wireB) {

    //Work around for performance
    wireB.pointHashMap = buildHashMap( wireB.points);

    //Filter down to matches, copy each math to prevent data contamination, and set each copy as an intersection type
    return wireA.points.filter(point => point.type !== START && containsPoint(wireB, point)).map(p => convertToIntersection(p, wireB));
}

/*export function hashPoint(p) {
    let hash = 7;
    hash += hash * 31 + p.x;
    hash += hash * 31 + p.y;
    return hash;
}*/

export function buildHashMap(points) {
    const xMap = new Map();

    points.forEach(p => {
        if(xMap.has(p.x)) {
            const yMap = xMap.get(p.x);
            yMap.set(p.y, p.step);
        } else {
            const yMap = new Map();
            yMap.set(p.y, p.step);
            xMap.set(p.x, yMap);
        }
    });

    return xMap;
}

/** Converts the point to an intersection point by setting type to X and calculating distance */
export function convertToIntersection(point, wireData) {
    const distance = calculateDistance({x: 0, y: 0}, point);
    return {
        ...point,
        step: (point.step + wireData.pointHashMap.get(point.x).get(point.y)),
        distance,
        type: INTERSECTION
    };
}

/** Checks if the wire contains the point */
export function containsPoint(wire, point) {
    const set = wire.pointHashMap.get(point.x);
    return set !== undefined && set.has(point.y);
}

/** Gets the manhattan distance between two points */
export function calculateDistance(pointA, pointB) {
    const deltaX = pointA.x - pointB.x;
    const deltaY = pointA.y - pointB.y;
    return Math.abs(deltaX) + Math.abs(deltaY);
}

export function sortBySteps(pointA, pointB) {
    return pointA.step - pointB.step;
}
