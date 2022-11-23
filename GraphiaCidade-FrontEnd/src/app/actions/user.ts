import { Dispatch } from 'redux';

import UserRequests from '~/repositories/user';
import * as MessageService from '~/services/message';
import centralNavigationService from '~/services/navigation';

import { USER_DETAIL, USER_REPORT } from './actionTypes';
import { decreaseLoading, increaseLoading } from './loading';

export const cleanUserDetail = () => async (dispatch: Dispatch) => {
  dispatch({
    payload: null,
    type: USER_DETAIL,
  });
};

export const getUserReport = (
  searchParams: advancedFilterModels.UserAdvancedFilter
) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.PaginationResponse<models.User> = await UserRequests.getReport(
      {
        ...searchParams,
        page: searchParams.page,
        limit: searchParams.pageSize,
        isDESC: searchParams.sort === 'desc' ? 'true' : 'false',
      }
    );
    dispatch({
      payload,
      type: USER_REPORT,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const getUserDetail = (id: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.User = await UserRequests.getDetail(id);

    dispatch({
      payload,
      type: USER_DETAIL,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const updateUser = (id: string, params: models.User, profile: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await UserRequests.update(id, params);

    MessageService.success(`PAGES.PANEL.${profile}.DETAILS.SUCCESS_EDIT_MESSAGE`);

    centralNavigationService.back();

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const addUser = (params: models.User, profile: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await UserRequests.add(params);

    MessageService.success(`PAGES.PANEL.${profile}.DETAILS.SUCCESS_ADD_MESSAGE`);

    centralNavigationService.back();
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const removeUser = (id: string, profile: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await UserRequests.remove(id);
    MessageService.success(`PAGES.PANEL.${profile}.DETAILS.SUCCESS_REMOVE_MESSAGE`);

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};
