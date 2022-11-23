import { SaveOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import * as UserActions from '~/actions/user';
import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import AdvancedForm from '~/components/AdvancedForm/AdvancedForm';
import AdvancedInput from '~/components/AdvancedInput/AdvancedInput';
import AdvancedCheckbox from '~/components/AdvancedCheckbox/AdvancedCheckbox';
import PanelContentBreadcrumb from '~/components/PanelContentBreadcrumb/PanelContentBreadcrumb';

import { translate } from '~/services/i18n';
import * as MessageService from '~/services/message';
import { USER_PAGE_TYPE, PAGE_TYPE } from '~/enum/page';
import { getRouteStackPath } from '~/config/routes';
import { getPageType } from '~/utils/page';
import { useReduxState } from '~/hooks/useReduxState';

const formInitialValues: models.User = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  roles: [USER_PAGE_TYPE.WEB],
  changePassword: false,
};

const GeographerDetails: React.FC = (props) => {
  const dispatch = useDispatch();
  const [pageType] = useState(getPageType());
  const [form, setForm] = useState(formInitialValues);

  const { pathname } = useLocation();
  const { user, auth } = useReduxState();

  const onFormChange = (key: string, val: any) => {
    setForm((prevState: models.User) => ({ ...prevState, [key]: val }));
  };

  useEffect(() => {
    if (user && user.detail) {
      setForm(user.detail);
    } else {
      setForm(formInitialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.detail]);

  useEffect(() => {
    if (pageType === PAGE_TYPE.ADD) {
      dispatch(UserActions.cleanUserDetail());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, pageType]);

  useEffect(() => {
    if (!auth.me?.roles.includes(USER_PAGE_TYPE.ADMIN)) {
      window.location.href = getRouteStackPath('DASHBOARD', 'DETAILS');
    }
  }, [auth]);

  const onFormSubmit = () => {
    const requestForm: any = {
      username: form.username,
      email: form.email,
      password: form.password,
      roles: form.roles,
    };

    if (!form.username) {
      return MessageService.error('PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.ERROR.NAME');
    }

    if (!form.email) {
      return MessageService.error('PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.ERROR.EMAIL');
    }

    if (pageType === PAGE_TYPE.ADD || form.changePassword) {
      if (!form.password) {
        return MessageService.error('PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.ERROR.PASSWORD_EMPTY');
      }
      if (form.password !== form.confirmPassword) {
        return MessageService.error('PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.ERROR.PASSWORD');
      }
    }

    if (pageType === PAGE_TYPE.EDIT && !form.changePassword) {
      delete requestForm.password;
    }

    if (pageType === PAGE_TYPE.EDIT) {
      dispatch(UserActions.updateUser(user?.detail?.id as string, requestForm, 'GEOGRAPHER'));
    } else {
      dispatch(UserActions.addUser(requestForm, 'GEOGRAPHER'));
    }
  };

  return (
    <div className="geographer">
      <Row>
        <Col>
          <PanelContentBreadcrumb
            items={[
              {
                active: true,
                title: translate('PAGES.PANEL.GEOGRAPHER.REPORT.TITLE'),
                url: getRouteStackPath('USER', 'GEOGRAPHER_REPORT'),
              },
              {
                active: false,
                title: translate('PAGES.PANEL.GEOGRAPHER.REPORT.PAGE_TITLE_DETAILS'),
              },
            ]}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="geographer__details__form">
            <div className="geographer__details__form__title">
              <h3 className="geographer__details__form__title__text">
                {translate('PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.TITLE')}
              </h3>
            </div>
            <AdvancedForm onSubmit={onFormSubmit}>
              <Row>
                <Col md={4}>
                  <AdvancedInput
                    label={translate(
                      'PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.NAME.LABEL'
                    )}
                    value={form.username}
                    onChange={(val: string | null) => onFormChange('username', val)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={10}>
                  <AdvancedInput
                    label={translate(
                      'PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.EMAIL.LABEL'
                    )}
                    value={form.email}
                    onChange={(val: string | null) =>
                      onFormChange('email', val)
                    }
                    disabled={pageType === PAGE_TYPE.EDIT}
                  />
                </Col>
              </Row>

              {pageType === PAGE_TYPE.EDIT && (
                <Row>
                  <Col>
                    <AdvancedCheckbox
                      label={translate('PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.CHANGE_PASSWORD.LABEL')}
                      value={form.changePassword}
                      onChange={(val: boolean) => onFormChange('changePassword', val)}
                    />
                  </Col>
                </Row>
              )}

              {(pageType === PAGE_TYPE.ADD || form.changePassword) && (
                <Row>
                  <Col md={5}>
                    <AdvancedInput
                      type="password"
                      label={translate(
                        'PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.PASSWORD.LABEL'
                      )}
                      value={form.password}
                      onChange={(val: string | null) =>
                        onFormChange('password', val)
                      }
                    />
                  </Col>
                  <Col md={5}>
                    <AdvancedInput
                      type="password"
                      label={translate(
                        'PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.PASSWORD_CONFIRMATION.LABEL'
                      )}
                      value={form.confirmPassword}
                      onChange={(val: string | null) =>
                        onFormChange('confirmPassword', val)
                      }
                    />
                  </Col>
                </Row>
              )}

              <Row>
                <Col md={4}>
                  <Link to={getRouteStackPath('USER', 'GEOGRAPHER_REPORT')}>
                    <AdvancedButton
                      variant="text"
                      text={translate(
                        'PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.BACK.LABEL'
                      )}
                      startIcon={<LeftOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={4}>
                  <AdvancedButton
                    type="submit"
                    className="geographer__advanced-button"
                    text={translate(
                      'PAGES.PANEL.GEOGRAPHER.DETAILS.FORM.SUBMIT.LABEL'
                    )}
                    endIcon={<SaveOutlined />}
                  />
                </Col>
              </Row>
            </AdvancedForm>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default GeographerDetails;
