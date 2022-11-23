import { useSelector } from 'react-redux';

import { rootReducer } from '~/models/reducers';
export const useReduxState = () => useSelector((state: rootReducer) => state);
