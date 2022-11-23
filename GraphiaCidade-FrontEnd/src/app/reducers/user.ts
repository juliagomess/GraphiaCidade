import {
  USER_DETAIL,
  USER_REPORT,
} from '~/actions/actionTypes';

const initialState: reducers.UserReducer = {
  detail: null,
  list: [],
  listCount: 0,
};

const userReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case USER_DETAIL:
      state = {
        ...state,
        detail: action.payload,
      };
      break;

    case USER_REPORT:
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

export default userReducer;
