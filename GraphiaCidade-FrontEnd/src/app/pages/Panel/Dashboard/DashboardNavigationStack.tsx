import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '~/config/routes';
import DashboardDetails from '~/pages/Panel/Dashboard/Details/DashboardDetails';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

const DashboardNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('DASHBOARD', 'DETAILS')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.DASHBOARD.DETAILS.TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.DASHBOARD.DETAILS.PAGE_DESCRIPTION'
          )}
        >
          <DashboardDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default DashboardNavigationStack;
