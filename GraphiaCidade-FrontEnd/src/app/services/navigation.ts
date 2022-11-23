import qs from 'qs';

import { history } from './browserHistory';

const NavigationService = {
  back: async (originRoute?: string) => {
    history.go(-1);
  },
  getQuery: () => {
    let search = history.location.search;
    if (search[0] === '?') {
      search = search.substring(1);
    }

    return qs.parse(search) as any;
  },
  navigate: async (routeName: string, query?: any,) => {
    history.push({
      pathname: routeName,
      search: qs.stringify(query, { skipNulls: true, })
    });
  },
  reset: async (routeName: string, params?: any) => {
    history.push(routeName, params);
  },
};

export default NavigationService;
