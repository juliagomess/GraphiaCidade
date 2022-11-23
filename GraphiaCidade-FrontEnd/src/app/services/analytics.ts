import ReactGA from 'react-ga';

import { getPathname } from './browserHistory';

export const webLogEvent = (actionName: string, component: string) => {
  ReactGA.event({
    action: actionName,
    category: 'EVENT_LOG',
    label: component,
    value: getPathname
  });
};

export const setProp = (name: string, value: string) => {
  ReactGA.set({ [name]: value });
};

export const webPageView = (page: string) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(page);
  }
};

const analytics = { webPageView, webLogEvent };

export default analytics;
