import { Dispatch } from 'redux';

import MapRequests from '~/repositories/map';
import * as MessageService from '~/services/message';

import { MAP_MARKERS } from './actionTypes';
import { decreaseLoading, increaseLoading } from './loading';

export const getMapMarkers = (
  searchParams?: advancedFilterModels.MapAdvancedFilter
) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.Occurrence[] = await MapRequests.getMarkers(searchParams);

    dispatch({
      payload,
      type: MAP_MARKERS,
    });

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};