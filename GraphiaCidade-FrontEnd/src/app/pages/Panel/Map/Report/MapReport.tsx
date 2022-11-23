import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import * as MapActions from '~/actions/map';
import AdvancedFilters from '~/components/AdvancedFilters/AdvancedFilters';
import AdvancedMap from '~/components/AdvancedMap/AdvancedMap';
import PanelContentHeader from '~/components/PanelContentHeader/PanelContentHeader';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '~/config/env';
import { translate } from '~/services/i18n';
import { useReduxState } from '~/hooks/useReduxState';

const initialValues: advancedFilterModels.MapAdvancedFilter = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  range: 1000,
};

const viewportInitialValues: models.Viewport = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  zoom: 10,
};

const MapReport: React.FC = () => {
  const dispatch = useDispatch();
  const [advancedFilters, setAdvancedFilters] = useState(initialValues);
  const [viewport, setViewport] = useState(viewportInitialValues);
  const { map } = useReduxState();

  const onSearch = (filters: advancedFilterModels.MapAdvancedFilter) => {
    dispatch(MapActions.getMapMarkers({
      ...filters,
      range: (filters.range || 0) * 1000,
    }));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const coordinates = {
          latitude,
          longitude,
        };

        setAdvancedFilters({ 
          ...advancedFilters,
          ...coordinates,
        });

        setViewport({
          ...viewport,
          ...coordinates,
        });
      },
      (_ignored) => {
        //
      },
      { timeout: 30000 },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onSearch(advancedFilters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="map">
      <div className="map__advanced-filters">
        <AdvancedFilters
          onFilter={() => {
            onSearch(advancedFilters);
            setViewport({
              ...viewport,
              latitude: advancedFilters.latitude,
              longitude: advancedFilters.longitude,
            });
          }}
          cols={[3, 3, 3]}
          fields={[
            {
              label: translate(
                'PAGES.PANEL.MAP.REPORT.ADVANCED_FILTER.LATITUDE'
              ),
              onChange: (latitude: number) => {
                setAdvancedFilters({
                 ...advancedFilters,
                  latitude: Number(latitude),
                });
              },
              type: 'input',
              value: advancedFilters.latitude,
            },
            {
              label: translate(
                'PAGES.PANEL.MAP.REPORT.ADVANCED_FILTER.LONGITUDE'
              ),
              onChange: (longitude: number) => {
                setAdvancedFilters({
                 ...advancedFilters,
                 longitude: Number(longitude),
                });
              },
              type: 'input',
              value: advancedFilters.longitude,
            },
            {
              label: translate(
                'PAGES.PANEL.MAP.REPORT.ADVANCED_FILTER.DISTANCE'
              ),
              onChange: (range: number) => {
                setAdvancedFilters({
                 ...advancedFilters,
                 range: Number(range) > 0 ? Number(range) : 0,
                });
              },
              type: 'input',
              value: advancedFilters.range,
            },
          ]}
        />
      </div>

      <div className="map__panel-content">
        <Row>
          <Col lg={6}>
            <PanelContentHeader
              pageTitle={translate('PAGES.PANEL.MAP.REPORT.PAGE_TITLE')}
            />
          </Col>
        </Row>
      </div>
      <div className="map__markers">
        <AdvancedMap
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          markers={map.markers}
          onChange={(val: models.Viewport) => {
            setAdvancedFilters({
              ...advancedFilters,
              latitude: val.latitude,
              longitude: val.longitude,
            });
            setViewport(val);
          }}
        />
      </div>
    </div>
  );
};

export default MapReport;
