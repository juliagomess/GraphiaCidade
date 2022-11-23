import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import ProfileReport from '~/pages/Panel/Profile/Report/ProfileReport';
import ProfileDetails from '~/pages/Panel/Profile/Details/ProfileDetails';

const ProfileNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('TRACKING', 'PROFILE_REPORT')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.PROFILE.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.PROFILE.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <ProfileReport />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('TRACKING', 'PROFILE_REGISTER')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.PROFILE.DETAILS.TITLE_ADD')}
          pageDescription={translate(
            'PAGES.PANEL.PROFILE.DETAILS.DESCRIPTION_ADD'
          )}
        >
          <ProfileDetails />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('TRACKING', 'PROFILE_DETAILS')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.PROFILE.DETAILS.TITLE_EDIT')}
          pageDescription={translate(
            'PAGES.PANEL.PROFILE.DETAILS.DESCRIPTION_EDIT'
          )}
        >
          <ProfileDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default ProfileNavigationStack;
