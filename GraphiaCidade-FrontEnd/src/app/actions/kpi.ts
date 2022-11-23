import { Dispatch } from 'redux';

import KPIRequests from '~/repositories/kpi';
import * as MessageService from '~/services/message';

import { KPI_REPORT } from './actionTypes';
import { decreaseLoading, increaseLoading } from './loading';

export const getKPIReport = (
  searchParams?: advancedFilterModels.KpiAdvancedFilter
) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload: models.KPI[] = await KPIRequests.getReport(searchParams);
    dispatch({
      payload,
      type: KPI_REPORT,
    });
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};
