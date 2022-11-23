import { ArrowRightOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as AuthActions from '~/actions/auth';
import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import AdvancedForm from '~/components/AdvancedForm/AdvancedForm';
import AdvancedInput from '~/components/AdvancedInput/AdvancedInput';
import { WL_COMPANY_LOGIN_LOGO } from '~/config/env';
import { translate } from '~/services/i18n';

const initialValues: models.AuthRequest = {
  password: '',
  username: '',
};

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialValues);

  const onFormChange = (key: string, value: string) => {
    setForm((prevState: models.AuthRequest) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onFormSubmit = () => {
    dispatch(AuthActions.authenticate(form));
  };

  return (
    <div className="login">
      <Helmet>
        <title>Entrar</title>
      </Helmet>
      <Container>
        <Row>
          <Col>
            <div className="login__form">
              <div className="login__form__inner">
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
                              <AdvancedInput
                                className="login__form__input"
                                label={translate(
                                  'PAGES.AUTH.LOGIN.FORM.EMAIL.LABEL'
                                )}
                                placeholder={translate(
                                  'PAGES.AUTH.LOGIN.FORM.EMAIL.PLACEHOLDER'
                                )}
                                value={form.username}
                                onChange={(value: string) =>
                                  onFormChange('username', value)
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <AdvancedInput
                                className="login__form__input"
                                label={translate(
                                  'PAGES.AUTH.LOGIN.FORM.PASSWORD.LABEL'
                                )}
                                placeholder={translate(
                                  'PAGES.AUTH.LOGIN.FORM.PASSWORD.PLACEHOLDER'
                                )}
                                value={form.password}
                                onChange={(value: string) =>
                                  onFormChange('password', value)
                                }
                                type="password"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="login__form__inner__button">
                                <AdvancedButton
                                  endIcon={<ArrowRightOutlined />}
                                  text={translate(
                                    'PAGES.AUTH.LOGIN.FORM.BUTTON.TEXT'
                                  )}
                                  fullWidth
                                  type="submit"
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <p className="login__form__inner__bottom">
                                {translate(
                                  'PAGES.AUTH.LOGIN.FORM.BOTTOM_MESSAGE.TEXT'
                                )}
                                &nbsp;
                                <Link
                                  className="login__form__inner__bottom__login"
                                  to={translate('PAGES.AUTH.PASSWORD_RECOVERY.URL')}
                                >
                                  {translate(
                                    'PAGES.AUTH.LOGIN.FORM.BOTTOM_MESSAGE.TEXT_LINK'
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

export default Login;
