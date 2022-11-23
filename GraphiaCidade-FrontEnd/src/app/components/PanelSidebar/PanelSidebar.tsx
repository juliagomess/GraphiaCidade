import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getRouteStackPath } from '@portal/config/routes';
import { WL_COMPANY_PANEL_LOGO } from '~/config/env';
import { routeExist } from '~/config/routes';

import PanelSidebarMenu from '../PanelSidebarMenu/PanelSidebarMenu';

interface IProps {
  routes: models.route[];
}

const PanelSidebar: React.FC<IProps> = (props: IProps) => {
  const location = useLocation();

  const validatePath = () => {
    if (!routeExist(location.pathname)) {
      window.location.href = getRouteStackPath('DASHBOARD', 'DETAILS');
    }
  };

  useEffect(() => {
    validatePath();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="panel-sidebar">
      <div className="panel-sidebar__logo">
        <img
          className="panel-sidebar__logo__img"
          src={WL_COMPANY_PANEL_LOGO}
          alt="sidebar logo"
        />
      </div>

      <div className="panel-sidebar__menu">
        <PanelSidebarMenu routes={props.routes} />
      </div>
    </div>
  );
};

export default PanelSidebar;
