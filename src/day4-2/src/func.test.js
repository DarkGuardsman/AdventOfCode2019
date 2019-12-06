import {compareNext, doesNotDecrease, hasDoubleNumbers} from "./func";

describe('compareNext', () => {
    it('passes in next', () => {
        const mockFunc = jest.fn();
        compareNext(['A', 'B', 'C'], mockFunc);
        expect(mockFunc.mock.calls).toEqual([
            ['A', 'B'],
            ['B', 'C']
        ]);
    });

    it('uses compare', () => {
        expect(compareNext(['A', 'B', 'C'], (a, b) => true)).toBeTruthy();
    });

    it('false for array of 1', () => {
        expect(compareNext(['A'], (a, b) => true)).toBeFalsy();
    });
});

describe('doesNotDecrease', () => {
    const testCases = [
        //Input, expected output
        ['10', false],
        ['0010', false],
        ['223450', false],
        ['123456', true],
        ['1234560', false]
    ];
    test.each(testCases)('Given %p I expect %p', (input, out) => {
        const chars = input.split('');
        expect(doesNotDecrease(chars)).toBe(out);
    });
});

describe('hasDoubleNumbers', () => {
    const testCases = [
        //Input, expected output
        ['10', false],
        ['123456', false],
        ['1234560', false],
        ['222', false],
        ['123444', false],

        ['1234566', true],
        ['22', true],
        ['112233', true],
        ['1235560', true],
        ['111122', true],
        ['112233', true],
        ['1144456', true]
    ];

    test.each(testCases)('Given %p I expect %p', (input, out) => {
        const chars = input.split('');
        expect(hasDoubleNumbers(chars)).toBe(out);
    });
});

