import { SaveOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import * as CategoryActions from '~/actions/category';

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

const formInitialValues: models.Category = {
  categoryName: '',
  subCategories: [],
};

const CategoryDetails: React.FC = (props) => {
  const dispatch = useDispatch();
  const [pageType] = useState(getPageType());
  const [form, setForm] = useState(formInitialValues);

  const { pathname } = useLocation();
  const { category } = useReduxState();

  const onFormChange = (key: string, val: any) => {
    setForm((prevState: models.Category) => ({ ...prevState, [key]: val }));
  };

  useEffect(() => {
    if (category && category.detail) {
      setForm(category.detail);
    } else {
      setForm(formInitialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.detail]);

  useEffect(() => {
    if (pageType === PAGE_TYPE.ADD) {
      dispatch(CategoryActions.cleanCategoryDetail());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, pageType]);

  const onFormSubmit = () => {
    const requestForm: any = {
      categoryName: form.categoryName,
      subCategories: form.subCategories,
    };

    if (!form.categoryName) {
      return MessageService.error('PAGES.PANEL.CATEGORY.DETAILS.FORM.ERROR.TITLE');
    }

    if (!form.subCategories || !form.subCategories.length) {
      return MessageService.error('PAGES.PANEL.CATEGORY.DETAILS.FORM.ERROR.SUB_CATEGORIES');
    }

    if (pageType === PAGE_TYPE.EDIT) {
      dispatch(CategoryActions.updateCategory(category?.detail?.id as string, requestForm));
    } else {
      dispatch(CategoryActions.addCategory(requestForm));
    }
  };

  return (
    <div className="category">
      <Row>
        <Col>
          <PanelContentBreadcrumb
            items={[
              {
                active: true,
                title: translate('PAGES.PANEL.CATEGORY.REPORT.TITLE'),
                url: getRouteStackPath('TRACKING', 'CATEGORY_REPORT'),
              },
              {
                active: false,
                title: translate('PAGES.PANEL.CATEGORY.REPORT.PAGE_TITLE_DETAILS'),
              },
            ]}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="category__details__form">
            <div className="category__details__form__title">
              <h3 className="category__details__form__title__text">
                {translate('PAGES.PANEL.CATEGORY.DETAILS.FORM.TITLE')}
              </h3>
            </div>
            <AdvancedForm onSubmit={onFormSubmit}>
              <Row>
                <Col md={4}>
                  <AdvancedInput
                    label={translate(
                      'PAGES.PANEL.CATEGORY.DETAILS.FORM.SUBJECT.LABEL'
                    )}
                    value={form.categoryName}
                    onChange={(val: string | null) => onFormChange('categoryName', val)}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <AdvancedInput
                    label={translate(
                      'PAGES.PANEL.CATEGORY.DETAILS.FORM.SUB_CATEGORIES.LABEL'
                    )}
                    value={form.subCategories.join('\n')}
                    onChange={(val: string | null) => onFormChange('subCategories', val?.split('\n'))}
                    multiline
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Link to={getRouteStackPath('TRACKING', 'CATEGORY_REPORT')}>
                    <AdvancedButton
                      variant="text"
                      text={translate(
                        'PAGES.PANEL.CATEGORY.DETAILS.FORM.BACK.LABEL'
                      )}
                      startIcon={<LeftOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={4}>
                  <AdvancedButton
                    type="submit"
                    className="category__advanced-button"
                    text={translate(
                      'PAGES.PANEL.CATEGORY.DETAILS.FORM.SUBMIT.LABEL'
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
export default CategoryDetails;
