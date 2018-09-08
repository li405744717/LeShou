import { conuter } from './demo-reducer';
import navReducer from './nav-reducer';
import { combineReducers } from 'redux';
import { chargeApply } from './function-reducer'
import { mine } from './mine-reducer'
export default combineReducers({
    conuter,
    chargeApply,
    mine,
    nav: navReducer
});