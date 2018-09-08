import { applyMiddleware, createStore, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import rootReducer from './reducers/reducers';
const logger = store => next => action => {
    console.log('cureent state', store.getState());
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching', action);
    }
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}


const configureStore = (preloadedState?) => {
    return createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(logger)
        )
    );
};

const store = configureStore();
export default store;

