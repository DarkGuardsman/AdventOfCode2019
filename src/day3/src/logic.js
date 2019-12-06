import {convertData, INTERSECTION, loadData, plotData, START} from "./func";
import {uniqWith, isEqual, cloneDeep} from 'lodash';

/**
 * Runs the entire program
 * @param filePath
 */
export function run(filePath) {
    const wires = preProcess(filePath);
    const intersections = findIntersections(wires);
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
    return removeDuplications(wires.flatMap(wireA => wires.flatMap(wireB => getIntersections(wireA, wireB))));
}

/** Removes duplicate points */
export function removeDuplications(hits) {
    return uniqWith(hits, isEqual);
}

/** Find any intersections between wireA and wireB. Ignores any node marked as a start point. */
export function getIntersections(wireA, wireB) {
    //Ignore self
    if(wireA === wireB) {
        return [];
    }
    //Filter down to matches, copy each math to prevent data contamination, and set each copy as an intersection type
    return wireA.points.filter(point => point.type !== START && containsPoint(wireB, point)).map(point => ({...point, type: INTERSECTION}));
}

/** Checks if the wire contains the point */
export function containsPoint(wire, point) {
    return wire.points.some(pointB => point.x === pointB.x && point.y === pointB.y)
}

