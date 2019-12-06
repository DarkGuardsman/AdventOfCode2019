import {convertData, INTERSECTION, loadData, plotData, START} from "./func";
import {isEqual, uniqWith} from 'lodash';

/**
 * Runs the entire program
 * @param filePath
 */
export function run(filePath) {
    const wires = preProcess(filePath);

    //Debug
    console.log("Pre Processing Done:");
    wires.forEach(wire => {
        console.log(`\tWire[${wire.id}] has ${wire.points.length} points`);
    });

    const intersections = findIntersections(wires).sort(sortByDistance);
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
    return wireA.points.filter(point => point.type !== START && containsPoint(wireB, point)).map(convertToIntersection);
}

/*export function hashPoint(p) {
    let hash = 7;
    hash += hash * 31 + p.x;
    hash += hash * 31 + p.y;
    return hash;
}*/

export function buildHashMap(points) {
    const map = new Map();

    points.forEach(p => {
        if(map.has(p.x)) {
            const set = map.get(p.x);
            set.add(p.y);
        } else {
            const set = new Set();
            set.add(p.y);
            map.set(p.x, set);
        }
    });

    return map;
}

/** Converts the point to an intersection point by setting type to X and calculating distance */
export function convertToIntersection(point) {
    const distance = calculateDistance({x: 0, y: 0}, point);
    return {
        ...point,
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

export function sortByDistance(pointA, pointB) {
    return pointA.distance - pointB.distance;
}
