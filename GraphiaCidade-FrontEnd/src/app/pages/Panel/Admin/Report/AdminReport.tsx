import { PlusCircleOutlined } from '@ant-design/icons';
import { GridCellParams } from '@material-ui/data-grid';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as UserActions from '~/actions/user';
import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import AdvancedFilters from '~/components/AdvancedFilters/AdvancedFilters';
import DataTable from '~/components/DataTable/DataTable';
import DataTableActions from '~/components/DataTableActions/DataTableActions';
import PanelContentHeader from '~/components/PanelContentHeader/PanelContentHeader';
import PanelContentSearchBar from '~/components/PanelContentSearchBar/PanelContentSearchBar';
import { REPORT_PAGE_SIZE } from '~/config/env';
import { getRouteStackPath } from '~/config/routes';
import { translate } from '~/services/i18n';
import NavigationService from '~/services/navigation';
import { USER_PAGE_TYPE } from '~/enum/page';
import { useReduxState } from '~/hooks/useReduxState';

const initialValues: advancedFilterModels.UserAdvancedFilter = {
  phone: null,
  email: null,
  username: null,
  roles: [USER_PAGE_TYPE.ADMIN],
  password: null,
  confirmPassword: null,
  orderBy: 'createdAt',
  page: 0,
  pageSize: REPORT_PAGE_SIZE,
  sort: 'desc',
};

const AdminReport: React.FC = () => {
  const dispatch = useDispatch();
  const { user, auth } = useReduxState();

  const [advancedFilters, setAdvancedFilters] = useState(initialValues);
  const reportRows = user.list;
  const reportTotalRows = user.listCount;

  useEffect(() => {
    const filter = NavigationService.getQuery();

    onSearch({
      ...advancedFilters,
      ...filter,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!auth.me?.roles.includes(USER_PAGE_TYPE.ADMIN)) {
      window.location.href = getRouteStackPath('DASHBOARD', 'DETAILS');
    }
  }, [auth]);

  const onSearch = (filters: advancedFilterModels.UserAdvancedFilter) => {
    dispatch(UserActions.getUserReport(filters));
  };

  const onRemove = async (id: string) => {
    await dispatch(UserActions.removeUser(id, 'ADMIN'));

    const filter = NavigationService.getQuery();

    onSearch({
      ...advancedFilters,
      ...filter,
    });
  };

  return (
    <div className="admin">
      <div className="admin__advanced-filters">
        <PanelContentSearchBar
          advancedFilter={
            <AdvancedFilters
              onFilter={() => onSearch(advancedFilters)}
              onClear={() => {
                setAdvancedFilters(initialValues);
                onSearch(initialValues);
              }}
              cols={[3, 3, 3]}
              fields={[
                {
                  label: translate(
                    'PAGES.PANEL.ADMIN.REPORT.ADVANCED_FILTER.NAME'
                  ),
                  onChange: (username: string) => {
                    setAdvancedFilters({
                      ...advancedFilters,
                      username,
                    });
                  },
                  type: 'input',
                  value: advancedFilters.username,
                },
                {
                  label: translate(
                    'PAGES.PANEL.ADMIN.REPORT.ADVANCED_FILTER.EMAIL'
                  ),
                  onChange: (email: string) => {
                    setAdvancedFilters({
                      ...advancedFilters,
                      email,
                    });
                  },
                  type: 'input',
                  value: advancedFilters.email,
                },
              ]}
            />
          }
        />
      </div>

      <div className="admin__panel-content">
        <Row>
          <Col lg={6}>
            <PanelContentHeader
              pageTitle={translate('PAGES.PANEL.ADMIN.REPORT.PAGE_TITLE')}
              pageDescription={translate(
                'PAGES.PANEL.ADMIN.REPORT.PAGE_DESCRIPTION'
              )}
            />
          </Col>
          <Col lg={6}>
            <Link to={getRouteStackPath('USER', 'ADMINISTRATOR_REGISTER')}>
              <AdvancedButton
                className="admin__advanced-button"
                text={translate('COMPONENTS.DATA_TABLE_ACTIONS.ADD.LABEL')}
                endIcon={<PlusCircleOutlined />}
              />
            </Link>
          </Col>
        </Row>
      </div>

      <Row>
        <Col>
          <div className="admin__table">
            <DataTable
              rows={reportRows}
              columns={[
                {
                  field: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.NAME.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.NAME.HEADER'),
                },
                {
                  field: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.EMAIL.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.EMAIL.HEADER'),
                },
                {
                  field: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.CREATED.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.CREATED.HEADER'),
                  renderCell: (o: GridCellParams) => {
                    return (
                      <>
                        {DateTime.fromISO(o.value as string).toLocaleString(
                          DateTime.DATETIME_SHORT
                        )}
                      </>
                    );
                  },
                },
                {
                  align: 'center',
                  field: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.ACTIONS.FIELD'),
                  headerAlign: 'center',
                  headerName: translate('PAGES.PANEL.ADMIN.REPORT.TABLE.ACTIONS.HEADER'),
                  renderCell: (o: GridCellParams) => {
                    return (
                      <DataTableActions
                        row={o.row}
                        basePath={translate('PAGES.PANEL.ADMIN.ROUTE.DETAILS')}
                        onRemove={(id: string) => onRemove(id)}
                        onDetail={(id: string) => dispatch(UserActions.getUserDetail(id))}
                      />
                    );
                  },
                },
              ]}
              rowCount={reportTotalRows}
              pageSize={advancedFilters.pageSize}
              page={advancedFilters.page}
              sort={advancedFilters.sort}
              orderBy={advancedFilters.orderBy}
              onChange={(filters) => {
                const searchFilters = {
                  ...advancedFilters,
                  ...filters,
                };
                setAdvancedFilters(searchFilters);
                onSearch(searchFilters);
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminReport;
