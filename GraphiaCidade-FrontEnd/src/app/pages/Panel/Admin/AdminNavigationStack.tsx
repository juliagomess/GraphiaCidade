import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import AdminReport from '~/pages/Panel/Admin/Report/AdminReport';
import AdminDetails from '~/pages/Panel/Admin/Details/AdminDetails';

const AdminNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('USER', 'ADMINISTRATOR_REPORT')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.ADMIN.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.ADMIN.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <AdminReport />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('USER', 'ADMINISTRATOR_REGISTER')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.ADMIN.DETAILS.TITLE_ADD')}
          pageDescription={translate(
            'PAGES.PANEL.ADMIN.DETAILS.DESCRIPTION_ADD'
          )}
        >
          <AdminDetails />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('USER', 'ADMINISTRATOR_DETAILS')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.ADMIN.DETAILS.TITLE_EDIT')}
          pageDescription={translate(
            'PAGES.PANEL.ADMIN.DETAILS.DESCRIPTION_EDIT'
          )}
        >
          <AdminDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default AdminNavigationStack;
