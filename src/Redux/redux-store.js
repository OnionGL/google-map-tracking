import { combineReducers, createStore } from "redux";
import OrderReducer from './order-reducer';

let redusers = combineReducers({
    OrderReducer
});


let store = createStore(redusers);

export default store;