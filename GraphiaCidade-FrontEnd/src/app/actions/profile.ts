import { Dispatch } from 'redux';

import ProfileRequests from '~/repositories/profile';
import * as MessageService from '~/services/message';
import centralNavigationService from '~/services/navigation';

import { PROFILE_DETAIL, PROFILE_REPORT } from './actionTypes';
import { decreaseLoading, increaseLoading } from './loading';

export const cleanProfileDetail = () => async (dispatch: Dispatch) => {
  dispatch({
    payload: null,
    type: PROFILE_DETAIL,
  });
};

export const getProfileReport = (
  searchParams: advancedFilterModels.ProfileAdvancedFilter
) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.PaginationResponse<models.Profile> = await ProfileRequests.getReport(
      {
        ...searchParams,
        page: searchParams.page,
        limit: searchParams.pageSize,
        isDESC: searchParams.sort === 'desc' ? 'true' : 'false',
      }
    );
    dispatch({
      payload,
      type: PROFILE_REPORT,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const getProfileDetail = (id: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.Profile = await ProfileRequests.getDetail(id);

    dispatch({
      payload,
      type: PROFILE_DETAIL,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const updateProfile = (id: string, params: models.Profile) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await ProfileRequests.update(id, params);

    MessageService.success(`PAGES.PANEL.PROFILE.DETAILS.SUCCESS_EDIT_MESSAGE`);

    centralNavigationService.back();

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const addProfile = (params: models.Profile) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await ProfileRequests.add(params);

    MessageService.success(`PAGES.PANEL.PROFILE.DETAILS.SUCCESS_ADD_MESSAGE`);

    centralNavigationService.back();
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const removeProfile = (id: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await ProfileRequests.remove(id);
    MessageService.success(`PAGES.PANEL.PROFILE.DETAILS.SUCCESS_REMOVE_MESSAGE`);

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};
