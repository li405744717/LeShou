import { INCREASE, DECREASE, RESET } from '../actions/actionTypes';

const defaultState = {
    count: 5,
    factor: 1
}

export const conuter = (state = defaultState, action) => {
    switch (action.type) {
        case INCREASE:
            return { ...state, count: state.count + state.factor };
        case DECREASE:
            return { ...state, count: state.count - state.factor };
        case RESET:
            return { ...state, count: 0 }
        default:
            return state;
    }
}

