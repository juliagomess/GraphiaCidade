import { Dispatch } from 'redux';

import OccurrenceRequests from '~/repositories/occurrence';
import * as MessageService from '~/services/message';
import centralNavigationService from '~/services/navigation';

import { OCCURRENCE_DETAIL, OCCURRENCE_EXPORT, OCCURRENCE_REPORT } from './actionTypes';
import { decreaseLoading, increaseLoading } from './loading';

export const cleanOccurrenceDetail = () => async (dispatch: Dispatch) => {
  dispatch({
    payload: null,
    type: OCCURRENCE_DETAIL,
  });
};

export const exportOccurrence = (
  searchParams?: advancedFilterModels.OccurrenceAdvancedFilter
) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: string = await OccurrenceRequests.export(searchParams);

    dispatch({
      type: OCCURRENCE_EXPORT,
      payload,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const getOccurrenceReport = (
  searchParams: advancedFilterModels.OccurrenceAdvancedFilter
) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.PaginationResponse<models.Occurrence> = await OccurrenceRequests.getReport(
      {
        ...searchParams,
        page: searchParams.page,
        limit: searchParams.pageSize,
        isDESC: searchParams.sort === 'desc' ? 'true' : 'false',
      }
    );
    dispatch({
      payload,
      type: OCCURRENCE_REPORT,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const getOccurrenceDetail = (id: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.Occurrence = await OccurrenceRequests.getDetail(id);

    dispatch({
      payload,
      type: OCCURRENCE_DETAIL,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const updateOccurrence = (id: string, params: models.Occurrence) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await OccurrenceRequests.update(id, params);

    MessageService.success(`PAGES.PANEL.OCCURRENCE.DETAILS.SUCCESS_EDIT_MESSAGE`);

    centralNavigationService.back();

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const addOccurrence = (params: models.Occurrence) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await OccurrenceRequests.add(params);

    MessageService.success(`PAGES.PANEL.OCCURRENCE.DETAILS.SUCCESS_ADD_MESSAGE`);

    centralNavigationService.back();
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const removeOccurrence = (id: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await OccurrenceRequests.remove(id);
    MessageService.success(`PAGES.PANEL.OCCURRENCE.DETAILS.SUCCESS_REMOVE_MESSAGE`);

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};
