import { MAP_MARKERS } from '~/actions/actionTypes';

const initialState: reducers.MapReducer = {
  markers: [],
};

const mapReducer = (
  state = initialState,
  action: any,
) => {
  switch (action.type) {
    case MAP_MARKERS:
      state = {
        ...state,
        markers: action.payload,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default mapReducer;
