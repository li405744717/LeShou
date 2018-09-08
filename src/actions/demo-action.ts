import { INCREASE, DECREASE, RESET } from './actionTypes';

const increase = () => {
    return {
        type: INCREASE
    }
}
const decrease = () => {
    return {
        type: DECREASE
    }
}
const reset = () => {
    return {
        type: RESET
    }
}

export {
    increase,
    decrease,
    reset
}