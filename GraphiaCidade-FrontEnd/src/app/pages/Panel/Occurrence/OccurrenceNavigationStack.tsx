import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import OccurrenceReport from '~/pages/Panel/Occurrence/Report/OccurrenceReport';
import OccurrenceDetails from '~/pages/Panel/Occurrence/Details/OccurrenceDetails';

const OccurrenceNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('TRACKING', 'OCCURRENCE_REPORT')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.OCCURRENCE.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.OCCURRENCE.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <OccurrenceReport />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('TRACKING', 'OCCURRENCE_DETAILS')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.OCCURRENCE.DETAILS.TITLE_EDIT')}
          pageDescription={translate(
            'PAGES.PANEL.OCCURRENCE.DETAILS.DESCRIPTION_EDIT'
          )}
        >
          <OccurrenceDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default OccurrenceNavigationStack;
