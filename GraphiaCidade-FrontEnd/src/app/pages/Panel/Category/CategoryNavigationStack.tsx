import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import PanelContent from '~/components/PanelContent/PanelContent';
import { translate } from '~/services/i18n';

import CategoryReport from '~/pages/Panel/Category/Report/CategoryReport';
import CategoryDetails from '~/pages/Panel/Category/Details/CategoryDetails';

const CategoryNavigationStack = () => {
  return (
    <Switch>
      <Route path={getRouteStackPath('TRACKING', 'CATEGORY_REPORT')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.CATEGORY.REPORT.PAGE_TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.CATEGORY.REPORT.PAGE_DESCRIPTION'
          )}
        >
          <CategoryReport />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('TRACKING', 'CATEGORY_REGISTER')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.CATEGORY.DETAILS.TITLE_ADD')}
          pageDescription={translate(
            'PAGES.PANEL.CATEGORY.DETAILS.DESCRIPTION_ADD'
          )}
        >
          <CategoryDetails />
        </PanelContent>
      </Route>
      <Route path={getRouteStackPath('TRACKING', 'CATEGORY_DETAILS')}>
        <PanelContent
          pageTitle={translate('PAGES.PANEL.CATEGORY.DETAILS.TITLE_EDIT')}
          pageDescription={translate(
            'PAGES.PANEL.CATEGORY.DETAILS.DESCRIPTION_EDIT'
          )}
        >
          <CategoryDetails />
        </PanelContent>
      </Route>
    </Switch>
  );
};

export default CategoryNavigationStack;
