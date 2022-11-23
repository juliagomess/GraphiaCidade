import {
  AUTH_CHECK_LOGGED,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ME
} from '~/actions/actionTypes';

const initialState: reducers.AuthReducer = {
  checkLogged: false,
  me: null,
  authToken: {
    jwtToken: "",
    refreshToken: "",
    type: "",
    id: "",
    username: "",
    email: "",
    roles: [""],
  },
};

const authReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case AUTH_LOGIN:
      state = {
        ...state,
        authToken: action.payload,
      };
      break;
    case AUTH_CHECK_LOGGED:
      state = {
        ...state,
        checkLogged: true,
      };
      break;
    case AUTH_ME:
      state = {
        ...state,
        me: action.payload,
      };
      break;
    case AUTH_LOGOUT:
      state = initialState;
      break;
    default:
      return state;
  }

  return state;
};

export default authReducer;
