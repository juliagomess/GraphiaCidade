import { Dispatch } from 'redux';

import CategoryRequests from '~/repositories/category';
import * as MessageService from '~/services/message';
import centralNavigationService from '~/services/navigation';

import { CATEGORY_DETAIL, CATEGORY_REPORT } from './actionTypes';
import { decreaseLoading, increaseLoading } from './loading';

export const cleanCategoryDetail = () => async (dispatch: Dispatch) => {
  dispatch({
    payload: null,
    type: CATEGORY_DETAIL,
  });
};

export const getCategoryReport = (
  searchParams: advancedFilterModels.CategoryAdvancedFilter
) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.PaginationResponse<models.Category> = await CategoryRequests.getReport(
      {
        ...searchParams,
        page: searchParams.page,
        limit: searchParams.pageSize,
        isDESC: searchParams.sort === 'desc' ? 'true' : 'false',
      }
    );
    dispatch({
      payload,
      type: CATEGORY_REPORT,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const getCategoryDetail = (id: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.Category = await CategoryRequests.getDetail(id);

    dispatch({
      payload,
      type: CATEGORY_DETAIL,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const updateCategory = (id: string, params: models.Category) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await CategoryRequests.update(id, params);

    MessageService.success(`PAGES.PANEL.CATEGORY.DETAILS.SUCCESS_EDIT_MESSAGE`);

    centralNavigationService.back();

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const addCategory = (params: models.Category) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await CategoryRequests.add(params);

    MessageService.success(`PAGES.PANEL.CATEGORY.DETAILS.SUCCESS_ADD_MESSAGE`);

    centralNavigationService.back();
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const removeCategory = (id: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await CategoryRequests.remove(id);
    MessageService.success(`PAGES.PANEL.CATEGORY.DETAILS.SUCCESS_REMOVE_MESSAGE`);

  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};
