import { ArrowRightOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as RecoveryActions from '~/actions/passwordRecovery';
import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import AdvancedForm from '~/components/AdvancedForm/AdvancedForm';
import AdvancedInput from '~/components/AdvancedInput/AdvancedInput';
import { WL_COMPANY_LOGIN_LOGO } from '~/config/env';
import { translate } from '~/services/i18n';
import NavigationService from '~/services/navigation';

const initialValues: models.ResetPassword = {
  email: NavigationService.getQuery().email,
  recoveryToken: '',
  password: '',
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialValues);

  const onFormChange = (key: string, value: string) => {
    setForm((prevState: models.ResetPassword) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onFormSubmit = () => {
    const { email, recoveryToken, password } = form;
    dispatch(
      RecoveryActions.PasswordRecovery({ email, recoveryToken, password })
    );
  };

  return (
    <div className="password-recovery">
      <Helmet>
        <title>Recuperar Senha</title>
      </Helmet>
      <Container>
        <Row>
          <Col>
            <div className="password-recovery__form">
              <div className="password-recovery__form__inner">
                <AdvancedForm onSubmit={onFormSubmit}>
                  <Row className="justify-content-center">
                    <Col lg={4}>
                      <Row>
                        <Col>
                          <img
                            className="login__form__inner__logo"
                            src={WL_COMPANY_LOGIN_LOGO}
                            alt="login logo"
                          />
                        </Col>
                      </Row>

                      <Card>
                        <Card.Body className="login__form__inner__card">
                          <Row>
                            <Col>
                              <div className="password-recovery__form__inner__message">
                                <strong className="password-recovery__form__inner__message__title">
                                  {translate(
                                    'PAGES.AUTH.PASSWORD_RECOVERY.FORM.TITLE'
                                  )}
                                </strong>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <AdvancedInput
                                placeholder={translate(
                                  'PAGES.AUTH.PASSWORD_RECOVERY.FORM.EMAIL.LABEL'
                                )}
                                disabled
                                value={form.email}
                                onChange={(value: string) =>
                                  onFormChange('email', value)
                                }
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <AdvancedInput
                                placeholder={translate(
                                  'PAGES.AUTH.PASSWORD_RECOVERY.FORM.TOKEN.LABEL'
                                )}
                                value={form.recoveryToken}
                                onChange={(value: string) =>
                                  onFormChange('recoveryToken', value)
                                }
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <AdvancedInput
                                placeholder={translate(
                                  'PAGES.AUTH.PASSWORD_RECOVERY.FORM.PASSWORD.LABEL'
                                )}
                                type="password"
                                value={form.password}
                                onChange={(value: string) =>
                                  onFormChange('password', value)
                                }
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <div className="password-recovery__form__inner__button">
                                <AdvancedButton
                                  endIcon={<ArrowRightOutlined />}
                                  text={translate(
                                    'PAGES.AUTH.PASSWORD_RECOVERY.FORM.CHANGE_PASSWORD.LABEL'
                                  )}
                                  fullWidth
                                  type="submit"
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <p className="password-recovery__form__inner__bottom">
                                {translate(
                                  'PAGES.AUTH.PASSWORD_RECOVERY.FORM.BOTTOM_MESSAGE.TEXT'
                                )}
                                &nbsp;
                                <Link to={translate('PAGES.AUTH.LOGIN.URL')}>
                                  {translate(
                                    'PAGES.AUTH.PASSWORD_RECOVERY.FORM.BOTTOM_MESSAGE.TEXT_LINK'
                                  )}
                                </Link>
                              </p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </AdvancedForm>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
