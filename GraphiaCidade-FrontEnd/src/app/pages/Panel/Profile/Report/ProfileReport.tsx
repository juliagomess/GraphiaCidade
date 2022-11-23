import { PlusCircleOutlined } from '@ant-design/icons';
import { GridCellParams } from '@material-ui/data-grid';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as ProfileActions from '~/actions/profile';
import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import DataTable from '~/components/DataTable/DataTable';
import DataTableActions from '~/components/DataTableActions/DataTableActions';
import PanelContentHeader from '~/components/PanelContentHeader/PanelContentHeader';

import { REPORT_PAGE_SIZE } from '~/config/env';
import { translate } from '~/services/i18n';
import NavigationService from '~/services/navigation';
import { useReduxState } from '~/hooks/useReduxState';
import { getRouteStackPath } from '~/config/routes'

const initialValues: advancedFilterModels.ProfileAdvancedFilter = {
  profileName: '',
  orderBy: 'createdAt',
  page: 0,
  pageSize: REPORT_PAGE_SIZE,
  sort: 'desc',
  isPaginated: true,
};

const ProfileReport: React.FC = () => {
  const dispatch = useDispatch();
  const { profile } = useReduxState();

  const [advancedFilters, setAdvancedFilters] = useState(initialValues);
  const reportRows = profile.list;
  const reportTotalRows = profile.listCount;

  useEffect(() => {
    const filter = NavigationService.getQuery();

    onSearch({
      ...advancedFilters,
      ...filter,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (filters: advancedFilterModels.ProfileAdvancedFilter) => {
    dispatch(ProfileActions.getProfileReport(filters));
  };

  const onRemove = async (id: string) => {
    await dispatch(ProfileActions.removeProfile(id));

    const filter = NavigationService.getQuery();

    onSearch({
      ...advancedFilters,
      ...filter,
    });
  };

  return (
    <div className="profile">
      <div className="profile__panel-content">
        <Row>
          <Col lg={6}>
            <PanelContentHeader
              pageTitle={translate('PAGES.PANEL.PROFILE.REPORT.PAGE_TITLE')}
              pageDescription={translate(
                'PAGES.PANEL.PROFILE.REPORT.PAGE_DESCRIPTION'
              )}
            />
          </Col>
          <Col lg={6}>
            <Link to={getRouteStackPath('TRACKING', 'PROFILE_REGISTER')}>
              <AdvancedButton
                className="category__advanced-button"
                text={translate('COMPONENTS.DATA_TABLE_ACTIONS.ADD.LABEL')}
                endIcon={<PlusCircleOutlined />}
              />
            </Link>
          </Col>
        </Row>
      </div>

      <Row>
        <Col>
          <div className="profile__table">
            <DataTable
              rows={reportRows}
              columns={[
                {
                  field: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.TITLE.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.TITLE.HEADER'),
                },
                {
                  field: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.AUTHOR.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.AUTHOR.HEADER'),
                },
                {
                  field: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.CREATED.FIELD'),
                  flex: 1,
                  headerName: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.CREATED.HEADER'),
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
                  field: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.ACTIONS.FIELD'),
                  headerAlign: 'center',
                  headerName: translate('PAGES.PANEL.PROFILE.REPORT.TABLE.ACTIONS.HEADER'),
                  renderCell: (o: GridCellParams) => {
                    return (
                      <DataTableActions
                        row={o.row}
                        basePath={translate('PAGES.PANEL.PROFILE.ROUTE.DETAILS')}
                        onRemove={(id: string) => onRemove(id)}
                        onDetail={(id: string) => dispatch(ProfileActions.getProfileDetail(id))}
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

export default ProfileReport;
