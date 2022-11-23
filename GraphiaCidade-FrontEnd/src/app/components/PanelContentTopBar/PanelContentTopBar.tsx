import { Popover } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import BellIcon from '~/assets/svg/panel-top-bar/ic_bell.svg';
import UserIcon from '~/assets/svg/panel-top-bar/ic_user.svg';

import { translate } from '~/services/i18n';
import { AuthActions } from '~/actions';

interface IProps {
  user?: models.User | null;
}

const PanelContentTopBar: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onLogout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <div className="panel-content-top-bar">
      <div className="panel-content-top-bar__menu">
        <div
          className={`panel-content-top-bar__menu__item ${
            pathname === '/dashboard/detalhes'
              ? 'panel-content-top-bar__menu__item--active'
              : ''
          }`}
        >
          <span className="panel-content-top-bar__menu__item__link__title">
            {translate(
              'COMPONENTS.PANEL_CONTENT_TOP_BAR.PAGES.DASHBOARD.TITLE'
            )}
          </span>
        </div>
      </div>
      <div className="panel-content-top-bar__right">
        <div className="panel-content-top-bar__right__bell">
          <Popover
            placement="bottomRight"
            content={<div>{translate('SHARED.NO_ALERTS')}</div>}
          >
            <span>
              <img
                className="panel-content-top-bar__right__bell__image"
                src={BellIcon}
                alt="bell icon"
              />
            </span>
          </Popover>
        </div>

        <div className="panel-content-top-bar__right__user-dropdown">
          <Popover
            placement="bottomRight"
            content={
              <div
                onClick={() => onLogout()}
                className="panel-content-top-bar__right__user-dropdown__logout"
              >
                {translate(
                  'COMPONENTS.PANEL_CONTENT_TOP_BAR.PAGES.DASHBOARD.LOGOUT'
                )}
              </div>
            }
          >
            <span className="panel-content-top-bar__right__user-dropdown__wrapper">
              <span className="panel-content-top-bar__right__user-dropdown__thumb">
                <img
                  className="panel-content-top-bar__right__user-dropdown__thumb__image"
                  src={UserIcon}
                  alt="user icon"
                />
              </span>
              <span className="panel-content-top-bar__right__user-dropdown__name">
                {props.user?.username}
              </span>
            </span>
          </Popover>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(AuthActions.logout()),
});

export default connect(null, mapDispatchToProps)(PanelContentTopBar);
