import { KPI_REPORT } from '~/actions/actionTypes';

const initialState: reducers.KpiReducer = {
  list: [],
};

const kpiReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case KPI_REPORT:
      state = {
        ...state,
        list: action.payload,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default kpiReducer;
