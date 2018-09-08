import { SWITCH_GESTURE } from './actionTypes';

//mine
const switch_gesture = (flag) => {
    return {
        type: SWITCH_GESTURE,
        flag: flag
    }
}




export default {
    mine: {
        switch_gesture
    }
}