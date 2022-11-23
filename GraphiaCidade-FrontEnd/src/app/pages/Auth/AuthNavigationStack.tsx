import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Login from './Login/Login';
import PasswordRecovery from './PasswordRecovery/PasswordRecovery';
import ResetPassword from './ResetPassword/ResetPassword';

const AuthNavigationStack: React.FC = () => (
  <Switch>
    <Route path="/" exact>
      <Login />
    </Route>

    <Route path="/recuperar-senha">
      <PasswordRecovery />
    </Route>

    <Route path="/alterar-senha">
      <ResetPassword />
    </Route>
  </Switch>
);

export default AuthNavigationStack;
