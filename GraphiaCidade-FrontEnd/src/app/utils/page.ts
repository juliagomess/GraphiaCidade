import { PAGE_TYPE } from '@portal/enum/page';
import { translate } from '~/services/i18n';

export function getPageType() {
  let pageType = PAGE_TYPE.ADD;

  const path: string = window.location.pathname;
  const pathSplitted: any = path.split('/');
  const lastPath: string = pathSplitted[pathSplitted.length - 1];

  if (lastPath && lastPath !== translate('SHARED.ADD_ID')) {
    pageType = PAGE_TYPE.EDIT;
  }

  return pageType;
}
