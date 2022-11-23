import { SaveOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import * as AuthActions from '~/actions/auth';
import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import AdvancedForm from '~/components/AdvancedForm/AdvancedForm';
import AdvancedInput from '~/components/AdvancedInput/AdvancedInput';

import { translate } from '~/services/i18n';
import * as MessageService from '~/services/message';

const formInitialValues: models.ChangePassword = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword: React.FC = (props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(formInitialValues);

  const onFormChange = (key: string, val: any) => {
    setForm((prevState: models.ChangePassword) => ({ ...prevState, [key]: val }));
  };

  const onFormSubmit = () => {
    const requestForm: any = {
      old_password: form.oldPassword,
      new_password: form.newPassword,
    };

    if (!form.oldPassword) {
      return MessageService.error('PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.ERROR.OLD_PASSWORD');
    }

    if (!form.newPassword) {
      return MessageService.error('PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.ERROR.PASSWORD_EMPTY');
    }

    if (form.newPassword !== form.confirmPassword) {
      return MessageService.error('PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.ERROR.PASSWORD');
    }

    dispatch(AuthActions.changePassword(requestForm));
  };

  return (
    <div className="changepassword">
      <Row>
        <Col>
          <div className="changepassword__details__form">
            <div className="changepassword__details__form__title">
              <h3 className="changepassword__details__form__title__text">
                {translate('PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.TITLE')}
              </h3>
            </div>
            <AdvancedForm onSubmit={onFormSubmit}>
              <Row>
                <Col md={4}>
                  <AdvancedInput
                    type="password"
                    label={translate(
                      'PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.OLD_PASSWORD.LABEL'
                    )}
                    value={form.oldPassword}
                    onChange={(val: string | null) =>
                      onFormChange('oldPassword', val)
                    }
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <AdvancedInput
                    type="password"
                    label={translate(
                      'PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.PASSWORD.LABEL'
                    )}
                    value={form.newPassword}
                    onChange={(val: string | null) =>
                      onFormChange('newPassword', val)
                    }
                  />
                </Col>
                <Col md={4}>
                  <AdvancedInput
                    type="password"
                    label={translate(
                      'PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.PASSWORD_CONFIRMATION.LABEL'
                    )}
                    value={form.confirmPassword}
                    onChange={(val: string | null) =>
                      onFormChange('confirmPassword', val)
                    }
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <AdvancedButton
                    type="submit"
                    className="changepassword__advanced-button"
                    text={translate(
                      'PAGES.PANEL.CHANGE_PASSWORD.DETAILS.FORM.SUBMIT.LABEL'
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
export default ChangePassword;
