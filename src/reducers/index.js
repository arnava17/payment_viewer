import {combineReducers} from 'redux';
import filters from "./filters";
import payments from "./payments";


export default combineReducers({
  filters,
  payments
});