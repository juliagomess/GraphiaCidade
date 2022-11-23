import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import UserReport from '~/pages/Panel/User/Report/UserReport';
import UserDetails from '~/pages/Panel/User/Details/UserDetails';

const UserNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('USER', 'USER_REPORT')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.USER.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.USER.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <UserReport />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('USER', 'USER_REGISTER')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.USER.DETAILS.TITLE_ADD')}
          pageDescription={translate(
            'PAGES.PANEL.USER.DETAILS.DESCRIPTION_ADD'
          )}
        >
          <UserDetails />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('USER', 'USER_DETAILS')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.USER.DETAILS.TITLE_EDIT')}
          pageDescription={translate(
            'PAGES.PANEL.USER.DETAILS.DESCRIPTION_EDIT'
          )}
        >
          <UserDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default UserNavigationStack;
