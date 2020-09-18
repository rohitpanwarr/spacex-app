import { combineReducers } from 'redux';
import flightReducer from './flightReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  flights: flightReducer,
  filters: filterReducer
});
