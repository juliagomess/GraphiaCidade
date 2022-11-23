import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import GeographerReport from '~/pages/Panel/Geographer/Report/GeographerReport';
import GeographerDetails from '~/pages/Panel/Geographer/Details/GeographerDetails';

const GeographerNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('USER', 'GEOGRAPHER_REPORT')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.GEOGRAPHER.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.GEOGRAPHER.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <GeographerReport />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('USER', 'GEOGRAPHER_REGISTER')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.GEOGRAPHER.DETAILS.TITLE_ADD')}
          pageDescription={translate(
            'PAGES.PANEL.GEOGRAPHER.DETAILS.DESCRIPTION_ADD'
          )}
        >
          <GeographerDetails />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('USER', 'GEOGRAPHER_DETAILS')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.GEOGRAPHER.DETAILS.TITLE_EDIT')}
          pageDescription={translate(
            'PAGES.PANEL.GEOGRAPHER.DETAILS.DESCRIPTION_EDIT'
          )}
        >
          <GeographerDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default GeographerNavigationStack;
