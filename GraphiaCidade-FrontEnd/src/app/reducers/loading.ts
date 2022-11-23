import { DESCREASE_LOADING, INCREASE_LOADING } from '~/actions/actionTypes';
import { LoadingReducer } from '~/models/reducers';

const initialState: reducers.LoadingReducer = {
  amount: 0,
};

const loadingReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case INCREASE_LOADING:
      state = {
        ...state,
        amount: state.amount + 1,
      };
      break;
    case DESCREASE_LOADING:
      state = {
        ...state,
        amount: state.amount - 1,
      };
      break;
    default:
      return state;
  }

  return state;
};

export const isLoading = (state: LoadingReducer) => {
  return state.amount > 0;
};

export default loadingReducer;
