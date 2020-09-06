import { combineReducers } from 'redux';
import { CALL_API, RECEIVED_API, FILTER_PLANET } from '../actions';

// ANCHOR planetsReducer
const INITIAL_STATE_PLANET = {
  isFetching: false,
  planets: [],
};

const planetsReducer = (state = INITIAL_STATE_PLANET, action) => {
  switch (action.type) {
    case CALL_API:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVED_API:
      return {
        ...state,
        isFetching: false,
        planets: action.planets,
      };
    default:
      return state;
  }
};

// ANCHOR filters
const INITIAL_STATE_FILTER = {
  filterByName: {
    name: '',
  },
};

const filters = (state = INITIAL_STATE_FILTER, action) => {
  switch (action.type) {
    case FILTER_PLANET:
      return {
        ...state,
        filterByName: { name: action.name },
      };
    default:
      return state;
  }
};

// ANCHOR rootReducer
const rootReducer = combineReducers({
  planetsReducer,
  filters,
});

export default rootReducer;
