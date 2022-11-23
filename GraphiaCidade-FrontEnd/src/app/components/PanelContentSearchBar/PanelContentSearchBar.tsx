import React, { useState } from 'react';

import AdvancedSelect from '~/components/AdvancedSelect/AdvancedSelect';
import { translate } from '~/services/i18n';

import FiltersIcon from '~/assets/svg/panel-content-search-bar/ic_filters_select.svg';

interface IProps {
  advancedFilter?: any;
}

const PanelContentSearchBar: React.FC<IProps> = (props) => {
  const {
    advancedFilter,
  } = props;

  const [advancedFiltersVisible, setAdvancedFiltersVisible] = useState(false);

  return (
    <div className="panel-content-search-bar">
      <div className="panel-content-search-bar__items">

        <div className="panel-content-search-bar__items__item panel-content-search-bar__items__item--search">
          {advancedFilter && advancedFiltersVisible && (
            <div className="panel-content-search-bar__advanced-filter">
              {advancedFilter}
            </div>
          )}
        </div>
        <div className="panel-content-search-bar__items__item panel-content-search-bar__items__item--advanced-filters">
          <AdvancedSelect
            onOpen={() => setAdvancedFiltersVisible(!advancedFiltersVisible)}
            label={(
              <span className="panel-content-search-bar__items__item__label">
                <span className="panel-content-search-bar__items__item__label__icon">
                  <img
                    src={FiltersIcon}
                    alt="filtersIcon"
                  />
                </span>
                <span className="panel-content-search-bar__items__item__label__title">
                  {translate('COMPONENTS.SEARCH_BAR.FILTERS.LABEL')}
                </span>
              </span>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelContentSearchBar;
