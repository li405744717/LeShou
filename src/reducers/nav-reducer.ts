import { RootStack } from './../router';

const navReducer = (state, action) => {
    const newState = RootStack.router.getStateForAction(action, state);
    return newState || state;
}

export default navReducer;