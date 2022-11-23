import { createBrowserHistory } from 'history';
import { RouteChildrenProps } from 'react-router';

declare var window: any;

export const history: any = createBrowserHistory({ basename: window.location.pathname });

export const getPathname: any = history.getPathname;

export const checkActivePath = (match: RouteChildrenProps<any, any>['match']): boolean => {
  const currentLocation = window.location.toString();
  const result =
    match && match.isExact && match.path !== '/'
      ? currentLocation.includes(match.path)
      : match && match.path === '/'
        ? currentLocation.lastIndexOf('/') === currentLocation.length - 1
        : false;

  return result;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  checkActivePath,
  getPathname,
  history,
};
