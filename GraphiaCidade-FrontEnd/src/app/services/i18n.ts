import { I18n } from 'react-redux-i18n';

export function translate(key: string) {
  return I18n.t(key || 'APPLICATION.ERRORS.INVALID_KEY');
}
