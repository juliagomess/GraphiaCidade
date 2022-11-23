import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import analytics from '~/services/analytics';
import { useReduxState } from '~/hooks/useReduxState';

export interface IProps {
  routes: models.route[];
}

const PanelSidebarMenu: React.FC<IProps> = (props: IProps) => {

  const location = useLocation();
  React.useEffect(() => {
    analytics.webPageView(location.pathname);
  }, [location]);

  const isActive = (path: string) => path === location.pathname;

  const { auth } = useReduxState();

  return (
    <div className="panel-sidebar-menu">
      <div className="panel-sidebar-menu__items">
        {props.routes.filter((o) => o.accessType === undefined
          || (auth.me 
              && (
                auth.me.roles?.includes(o.accessType) 
                || o.accessGranted?.includes(auth.me.roles[0])
              )
            )
          ).map((item: models.route, itemKey: number) => (
          <div
            key={itemKey.toString()}
            className="panel-sidebar-menu__items__single"
          >
            <span className="panel-sidebar-menu__items__single__icon">
              <img
                className="panel-sidebar-menu__items__single__icon__image"
                src={item.icon}
                alt={item.iconAlt}
              />
            </span>
            <span className="panel-sidebar-menu__items__single__title">
              {item.name}
            </span>

            <div className="panel-sidebar-menu__items__single__items">
              {item.items.filter((o) => !o.sidebarHidden 
                && (o.accessType === undefined 
                || (auth.me 
                    && (
                      auth.me.roles.includes(o.accessType) 
                      || o.accessGranted?.includes(auth.me.roles[0]))
                    )
                  )
                ).map((subItem: models.routeInner, subItemKey: number) => (
                <div
                  className="panel-sidebar-menu__items__single__items__single"
                  key={subItemKey.toString()}
                >
                  <Link
                    to={`${item.route}${subItem.route}`}
                    className={`
                       panel-sidebar-menu__items__single__items__single__link
                       ${isActive(`${item.route}${subItem.route}`) ? 'panel-sidebar-menu__items__single__items__single__link--active' : ''}
                    `}
                  >
                    <span className="panel-sidebar-menu__items__single__items__single__link__title">
                      {subItem.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelSidebarMenu;
