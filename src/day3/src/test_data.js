
import {HORIZONTAL, JOINT, START, VERTICAL} from "./func";

//  + - - X -       hit point B
//  |
//  |
//  0           4x3
export const wireA = {
    points: [
        {x: 0, y: 0, type: START},

        //UP 3
        {x: 0, y: 1, type: VERTICAL},
        {x: 0, y: 2, type: VERTICAL},
        {x: 0, y: 3, type: JOINT},

        //Right 4
        {x: 1, y: 3, type: HORIZONTAL},
        {x: 2, y: 3, type: HORIZONTAL},
        {x: 3, y: 3, type: HORIZONTAL},
        {x: 4, y: 3, type: JOINT},
    ]
};

//        |
//        X  <- hit point with A
//        |
//        |
//  0 - - +     3x4
export const wireB = {
    points: [
        {x: 0, y: 0, type: START},

        //Right 3
        {x: 1, y: 0, type: HORIZONTAL},
        {x: 2, y: 0, type: HORIZONTAL},
        {x: 3, y: 0, type: JOINT},

        //Up 4
        {x: 3, y: 1, type: VERTICAL},
        {x: 3, y: 2, type: VERTICAL},
        {x: 3, y: 3, type: VERTICAL},
        {x: 3, y: 4, type: JOINT},
    ]
};

//  |
//  |
//  |
//  |
//  + - - 0
export const wireC = {
    points: [
        {x: 0, y: 0, type: START},

        //Right 3
        {x: -1, y: 0, type: HORIZONTAL},
        {x: -2, y: 0, type: HORIZONTAL},
        {x: -3, y: 0, type: JOINT},

        //Up 4
        {x: -3, y: 1, type: VERTICAL},
        {x: -3, y: 2, type: VERTICAL},
        {x: -3, y: 3, type: VERTICAL},
        {x: -3, y: 4, type: JOINT},
    ]
};


//    + - X +       hit point B
//          |
//  0       |
//  + - - - +
export const wireD = {
    points: [
        {x: 0, y: 0, type: START},

        //Down 1
        {x: 0, y: -1, type: JOINT},

        //Right 4
        {x: 1, y: -1, type: HORIZONTAL},
        {x: 2, y: -1, type: HORIZONTAL},
        {x: 3, y: -1, type: HORIZONTAL},
        {x: 4, y: -1, type: JOINT},

        //Up 3
        {x: 4, y: 0, type: VERTICAL},
        {x: 4, y: 1, type: VERTICAL},
        {x: 4, y: 2, type: JOINT},

        //Left 3
        {x: 3, y: 2, type: HORIZONTAL},
        {x: 2, y: 2, type: HORIZONTAL},
        {x: 1, y: 2, type: JOINT},
    ]
};
