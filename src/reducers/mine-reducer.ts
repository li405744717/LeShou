import { SWITCH_GESTURE } from '../actions/actionTypes';

//mine
const mineState = {
    flag: false
}
export const mine = (state = mineState, action) => {
    switch (action.type) {
        case SWITCH_GESTURE:
            return { ...state, flag: action.flag };
        default:
            return state;
    }
}

