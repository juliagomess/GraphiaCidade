import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptLocale from 'date-fns/locale/pt-BR';
import { Settings } from 'luxon';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
} from 'react-redux-i18n';

import { WL_COMPANY_PRIMARY_COLOR } from '~/config/env';
import { LANGUAGE } from '~/config/env';

import App from './App';
import languages from '~/i18n';
import createStore from '~/reducers/createStore';
import '~/styles/index.less';
import reportWebVitals from './reportWebVitals';

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    newrelic: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

window.newrelic = window.newrelic || {};

const store = createStore;

syncTranslationWithStore(store);
// @ts-ignore
store.dispatch(loadTranslations(languages));
// @ts-ignore
store.dispatch(setLocale(LANGUAGE));

Settings.defaultLocale = LANGUAGE;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: WL_COMPANY_PRIMARY_COLOR,
    },
  },
});

const localeMap = {
  pt: ptLocale,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap}>
            <App />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
