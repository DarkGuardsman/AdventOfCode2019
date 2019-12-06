export function hasDoubleNumbers(chars) {
    let lastChar = chars[0];
    let count = 0;
    for (let i = 1; i < chars.length; i++) {
        const char = chars[i];

        //Chars match, increase count
        if (char === lastChar) {
            count += 1;
        }
        //We have a matching pair not part of a larger group
        else if(count == 1) {
            return true;
        }
        //Too many or not enough matches
        else if (count !== 1) {
            count = 0;
        }

        //Remember last
        lastChar = char;
    }
    return count === 1;
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
