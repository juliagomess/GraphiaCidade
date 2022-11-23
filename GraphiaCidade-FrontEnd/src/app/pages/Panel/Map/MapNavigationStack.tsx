import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import MapReport from '~/pages/Panel/Map/Report/MapReport';

const MapNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('TRACKING', 'MAP_REPORT')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.MAP.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.MAP.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <MapReport />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default MapNavigationStack;
