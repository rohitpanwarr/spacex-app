import { APPLY_FILTERS } from '../actions/index';

const initialState = {
    selectedYears: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case APPLY_FILTERS:
      return action.payload;
    default:
      return state;
  }
};
