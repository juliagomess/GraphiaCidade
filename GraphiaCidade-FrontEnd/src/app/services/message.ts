import { message } from 'antd';
import { I18n } from 'react-redux-i18n';

import { sendError } from './crashlytics';

const GENERIC_ERROR: string = 'APPLICATION.ERRORS.GENERIC';

export function success(key: string) {
  return message.success(I18n.t(key ? key.toUpperCase() : GENERIC_ERROR));
}

export function warn(key: string) {
  return message.warn(I18n.t(key ? key.toUpperCase() : GENERIC_ERROR));
}

export function error(key: string, send?: boolean) {
  const response = I18n.t(key ? key.toUpperCase() : GENERIC_ERROR);

  if (send) {
    sendError(response);
  }

  return message.error(response);
}
