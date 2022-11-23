import { LeftOutlined, SaveOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import * as ProfileActions from '~/actions/profile';

import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import AdvancedForm from '~/components/AdvancedForm/AdvancedForm';
import AdvancedInput from '~/components/AdvancedInput/AdvancedInput';
import PanelContentBreadcrumb from '~/components/PanelContentBreadcrumb/PanelContentBreadcrumb';

import { translate } from '~/services/i18n';
import * as MessageService from '~/services/message';
import { PAGE_TYPE } from '~/enum/page';
import { getRouteStackPath } from '~/config/routes';
import { getPageType } from '~/utils/page';
import { useReduxState } from '~/hooks/useReduxState';

const formInitialValues: models.Profile = {
  profileName: '',
};

const ProfileDetails: React.FC = (props) => {
  const dispatch = useDispatch();
  const [pageType] = useState(getPageType());
  const [form, setForm] = useState(formInitialValues);

  const { pathname } = useLocation();
  const { profile } = useReduxState();

  const onFormChange = (key: string, val: any) => {
    setForm((prevState: models.Profile) => ({ ...prevState, [key]: val }));
  };

  useEffect(() => {
    if (profile && profile.detail) {
      setForm(profile.detail);
    } else {
      setForm(formInitialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.detail]);

  useEffect(() => {
    if (pageType === PAGE_TYPE.ADD) {
      dispatch(ProfileActions.cleanProfileDetail());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, pageType]);

  const onFormSubmit = () => {
    const requestForm: any = {
      profileName: form.profileName
    };

    if (!form.profileName) {
      return MessageService.error('PAGES.PANEL.PROFILE.DETAILS.FORM.ERROR.TITLE');
    }

    if (pageType === PAGE_TYPE.EDIT) {
      dispatch(ProfileActions.updateProfile(profile?.detail?.id as string, requestForm));
    } else {
      dispatch(ProfileActions.addProfile(requestForm));
    }
  };

  return (
    <div className="profile">
      <Row>
        <Col>
          <PanelContentBreadcrumb
            items={[
              {
                active: true,
                title: translate('PAGES.PANEL.PROFILE.REPORT.TITLE'),
                url: getRouteStackPath('TRACKING', 'PROFILE_REPORT'),
              },
              {
                active: false,
                title: translate('PAGES.PANEL.PROFILE.REPORT.PAGE_TITLE_DETAILS'),
              },
            ]}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="profile__details__form">
            <div className="profile__details__form__title">
              <h3 className="profile__details__form__title__text">
                {translate('PAGES.PANEL.PROFILE.DETAILS.FORM.TITLE')}
              </h3>
            </div>
            <AdvancedForm onSubmit={onFormSubmit}>
              <Row>
                <Col md={4}>
                  <AdvancedInput
                    label={translate(
                      'PAGES.PANEL.PROFILE.DETAILS.FORM.SUBJECT.LABEL'
                    )}
                    value={form.profileName}
                    onChange={(val: string | null) => onFormChange('profileName', val)}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Link to={getRouteStackPath('TRACKING', 'PROFILE_REPORT')}>
                    <AdvancedButton
                      variant="text"
                      text={translate(
                        'PAGES.PANEL.PROFILE.DETAILS.FORM.BACK.LABEL'
                      )}
                      startIcon={<LeftOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={4}>
                  <AdvancedButton
                    type="submit"
                    className="profile__advanced-button"
                    text={translate(
                      'PAGES.PANEL.PROFILE.DETAILS.FORM.SUBMIT.LABEL'
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
export default ProfileDetails;
