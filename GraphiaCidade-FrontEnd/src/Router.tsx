import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthNavigationStack from '~/pages/Auth/AuthNavigationStack';
import PanelNavigationStack from '~/pages/Panel/PanelNavigationStack';

interface IProps {
  isLogged: boolean;
}

const Router: React.FC<IProps> = (props: IProps) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {props.isLogged ? (
            <Route path="/">
              <PanelNavigationStack />
            </Route>
          ) : (
            <Route path="/">
              <AuthNavigationStack />
            </Route>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
