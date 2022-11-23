import { Dispatch } from 'redux';

import { DESCREASE_LOADING, INCREASE_LOADING } from './actionTypes';

export const increaseLoading = () => ({
  type: INCREASE_LOADING,
});

export const decreaseLoading = () => ({
  type: DESCREASE_LOADING,
});

export const addLoading = () => (dispatch: Dispatch) => dispatch(increaseLoading());

export const removeLoading = () => (dispatch: Dispatch) => dispatch(decreaseLoading());
