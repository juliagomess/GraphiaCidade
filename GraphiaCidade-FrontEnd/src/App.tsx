import 'bootstrap/dist/css/bootstrap-grid.min.css';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';

import * as AuthActions from '~/actions/auth';
import { GA_TOKEN } from '~/config/env';
import * as Analytics from '~/services/analytics';

import Router from './Router';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const isLogged: boolean = useSelector(
    (state: reducers.rootReducer) =>
      (state.auth?.authToken?.jwtToken && true) || false
  );

  useEffect(() => {
    ReactGA.initialize(GA_TOKEN);
    if (process.env.NODE_ENV === 'production') {
      Analytics.webLogEvent('APP_INITIALIZED', 'AppContent');
    }

    dispatch(AuthActions.checkIsLogged());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div><Router isLogged={isLogged} /></div>;
};

export default App;
