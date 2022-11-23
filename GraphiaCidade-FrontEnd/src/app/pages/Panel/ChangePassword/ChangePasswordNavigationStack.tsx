import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import ChangePasswordDetails from '~/pages/Panel/ChangePassword/Details/ChangePasswordDetails';

const ChangePasswordNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('SETTINGS', 'CHANGE_PASSWORD')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.CHANGE_PASSWORD.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.CHANGE_PASSWORD.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <ChangePasswordDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default ChangePasswordNavigationStack;
