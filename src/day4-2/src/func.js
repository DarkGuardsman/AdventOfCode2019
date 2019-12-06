export function hasDoubleNumbers(chars) {
    return compareNext(chars, (a, b) => a === b);
}

export function doesNotDecrease(chars) {
    return !compareNext(chars, (a, b) => {
        const numA = Number.parseInt(a);
        const numB = Number.parseInt(b);
        return numB < numA;
    })
}

export function compareNext(chars, compare) {
    return chars.some((c, index) => index < (chars.length - 1) && compare(c, chars[index + 1]));
}
