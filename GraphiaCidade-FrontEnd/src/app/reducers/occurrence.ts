import {
  OCCURRENCE_DETAIL,
  OCCURRENCE_EXPORT,
  OCCURRENCE_REPORT,
} from '~/actions/actionTypes';

const initialState: reducers.OccurrenceReducer = {
  detail: null,
  list: [],
  listCount: 0,
  export: null,
};

const occurrenceReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case OCCURRENCE_DETAIL:
      state = {
        ...state,
        detail: action.payload,
      };
      break;

    case OCCURRENCE_REPORT:
      state = {
        ...state,
        list: action.payload.rows,
        listCount: action.payload.totalElements,
      };
      break;

    case OCCURRENCE_EXPORT:
      state = {
        ...state,
        export: action.payload,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default occurrenceReducer;
