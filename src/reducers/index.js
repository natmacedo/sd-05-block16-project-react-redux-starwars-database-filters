import { SEARCH_BEGIN, SEARCH_SUCCESS, SEARCH_FAILURE } from '../actions';

const initialState = {
  loading: true,
  filters: {
    filterByName: {
      name: '',
    },
  },
};

function emptyReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BEGIN:
      return {
        ...state,
        loading: action.loading,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: action.results,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
}

export default emptyReducer;
