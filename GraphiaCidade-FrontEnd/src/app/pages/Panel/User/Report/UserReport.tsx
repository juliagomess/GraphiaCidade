import { PlusCircleOutlined } from '@ant-design/icons';
import { GridCellParams } from '@material-ui/data-grid';
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
import { USER_PAGE_TYPE, UserPageTypeMap } from '~/enum/page';
import { useReduxState } from '~/hooks/useReduxState';
import { getUserRolesFilter } from '~/utils/utilities';

const initialValues: advancedFilterModels.UserAdvancedFilter = {
  username: null,
  roles: '',
  password: null,
  confirmPassword: null,
  orderBy: 'createdAt',
  page: 0,
  pageSize: REPORT_PAGE_SIZE,
  sort: 'desc',
};

const UserReport: React.FC = () => {
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
    dispatch(UserActions.getUserReport({
      ...filters,
      roles: filters.roles && filters.roles !== '' ? filters.roles : undefined,
    }));
  };

  const onRemove = async (id: string) => {
    await dispatch(UserActions.removeUser(id, 'USER'));

    const filter = NavigationService.getQuery();

    onSearch({
      ...advancedFilters,
      ...filter,
    });
  };

  return (
    <div className="user">
      <div className="user__advanced-filters">
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
                    'PAGES.PANEL.USER.REPORT.ADVANCED_FILTER.ROLE'
                  ),
                  options: getUserRolesFilter()
                    .map(o => ({ 
                      name: translate(o.name), 
                      value: o.value
                    })
                  ),
                  onChange: (roles: string) => {
                    setAdvancedFilters({
                      ...advancedFilters,
                      roles,
                    });
                  },
                  type: 'select',
                  value: advancedFilters.roles,
                },
              ]}
            />
          }
        />
      </div>

      <div className="user__panel-content">
        <Row>
          <Col lg={6}>
            <PanelContentHeader
              pageTitle={translate('PAGES.PANEL.USER.REPORT.PAGE_TITLE')}
              pageDescription={translate(
                'PAGES.PANEL.USER.REPORT.PAGE_DESCRIPTION'
              )}
            />
          </Col>
          <Col lg={6}>
            <Link to={getRouteStackPath('USER', 'USER_REGISTER')}>
              <AdvancedButton
                className="user__advanced-button"
                text={translate('COMPONENTS.DATA_TABLE_ACTIONS.ADD.LABEL')}
                endIcon={<PlusCircleOutlined />}
              />
            </Link>
          </Col>
        </Row>
      </div>

      <Row>
        <Col>
          <div className="user__table">
            <DataTable
              rows={reportRows}
              columns={[
                {
                  field: translate('PAGES.PANEL.USER.REPORT.TABLE.NAME.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.USER.REPORT.TABLE.NAME.HEADER'),
                },
                {
                  field: translate('PAGES.PANEL.USER.REPORT.TABLE.EMAIL.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.USER.REPORT.TABLE.EMAIL.HEADER'),
                },
                {
                  field: translate('PAGES.PANEL.USER.REPORT.TABLE.ROLE.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.USER.REPORT.TABLE.ROLE.HEADER'),
                  renderCell: (o: GridCellParams) => {
                    return (
                      <>
                        {(o.value as string[])
                          .map(oo => UserPageTypeMap.get(oo))
                          .map(oo => translate(`SHARED.ROLES.${oo}`))
                          .join(', ')}
                      </>
                    );
                  },
                },
                {
                  align: 'center',
                  field: translate('PAGES.PANEL.USER.REPORT.TABLE.ACTIONS.FIELD'),
                  headerAlign: 'center',
                  headerName: translate('PAGES.PANEL.USER.REPORT.TABLE.ACTIONS.HEADER'),
                  renderCell: (o: GridCellParams) => {
                    return (
                      <DataTableActions
                        row={o.row}
                        basePath={translate('PAGES.PANEL.USER.ROUTE.DETAILS')}
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

export default UserReport;
