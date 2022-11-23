import { Dispatch } from 'redux';

import { translate } from '@portal/services/i18n';
import PasswordRecoveryRequests from '~/repositories/passwordRecovery';
import * as MessageService from '~/services/message';

import { decreaseLoading, increaseLoading } from './loading';

export const SendVerification = (email: string) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await PasswordRecoveryRequests.sendVerification(email);
    MessageService.warn(translate('PAGES.AUTH.PASSWORD_RECOVERY.MESSAGES.EMAIL'));
    window.location.href = `/alterar-senha?email=${email}`;
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const PasswordRecovery = (params: models.ResetPassword) => async (dispatch: Dispatch) => {
  dispatch(increaseLoading());
  try {
    await PasswordRecoveryRequests.putRecovery(params);
    MessageService.success(
      translate('PAGES.AUTH.PASSWORD_RECOVERY.MESSAGES.EMAIL.RECOVERY_SUCCESS')
    );
    window.location.href = `/`;
  } catch (err: any) {
    MessageService.error(`APPLICATION.ERRORS.${err.message}`);
  } finally {
    dispatch(decreaseLoading());
  }
};
