import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import PanelContentHeader from '~/components/PanelContentHeader/PanelContentHeader';
import KPICard from '~/components/KPICard/KPICard';
import * as KpiActions from '~/actions/kpi';

import { translate } from '~/services/i18n';
import { useReduxState } from '~/hooks/useReduxState';

const DashboardDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { auth, kpi } = useReduxState();

  useEffect(() => {
    dispatch(KpiActions.getKPIReport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="panel-dashboard">
      <div className="panel-dashboard__welcome">
        {translate('PAGES.PANEL.DASHBOARD.DETAILS.WELCOME')}
        {auth.me?.username}
      </div>
      <div className="panel-dashboard__title">
        <PanelContentHeader
          pageTitle={translate('PAGES.PANEL.DASHBOARD.DETAILS.TITLE')}
          pageDescription={translate(
            'PAGES.PANEL.DASHBOARD.DETAILS.PAGE_DESCRIPTION'
          )}
        />
      </div>
      <div className="panel-dashboard__kpi">
        <div className="panel-dashboard__kpi__indicators">
          {kpi.list.filter(o => o.value && o.name).map((o) => (
            <Row>
              <Col md={9} className="panel-dashboard__kpi--inner">
                <KPICard
                  number={o.value || 0}
                  description={translate(`PAGES.PANEL.DASHBOARD.DETAILS.CARD.${o.name.toUpperCase()}`)}
                />
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardDetails;
