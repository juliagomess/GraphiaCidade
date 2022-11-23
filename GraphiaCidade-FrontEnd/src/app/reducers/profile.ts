import {
  PROFILE_DETAIL,
  PROFILE_REPORT,
} from '~/actions/actionTypes';

const initialState: reducers.ProfileReducer = {
  detail: null,
  list: [],
  listCount: 0,
};

const profileReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case PROFILE_DETAIL:
      state = {
        ...state,
        detail: action.payload,
      };
      break;

    case PROFILE_REPORT:
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

export default profileReducer;
