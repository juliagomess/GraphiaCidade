import {
  CATEGORY_DETAIL,
  CATEGORY_REPORT,
} from '~/actions/actionTypes';

const initialState: reducers.CategoryReducer = {
  detail: null,
  list: [],
  listCount: 0,
};

const categoryReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case CATEGORY_DETAIL:
      state = {
        ...state,
        detail: action.payload,
      };
      break;

    case CATEGORY_REPORT:
      state = {
        ...state,
        list: action.payload.rows,
        listCount: action.payload.totalElements,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default categoryReducer;
