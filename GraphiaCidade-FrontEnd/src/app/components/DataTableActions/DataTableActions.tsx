/* eslint-disable jsx-a11y/anchor-is-valid */
import { Popover, Modal } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import IconDelete from '~/assets/svg/data-table-actions/ic_delete.svg';
import IconView from '~/assets/svg/data-table-actions/ic_view.svg';
import IconEdit from '~/assets/svg/data-table-actions/ic_edit.svg';
import MoreDots from '~/assets/svg/ic_more_dots.svg';
import { translate } from '~/services/i18n';

interface IDataTableActions {
  onDetail?: (id: string) => void;
  onRemove?: (id: string) => void;
  onRead?: (id: string) => void;
  row?: any;
  basePath?: string;
  maxWidth?: number;
  type?: string;
}

const DataTableActions = ({ 
  row, 
  basePath, 
  onRemove, 
  onDetail,
  onRead,
  maxWidth 
}: IDataTableActions) => {
  const history = useHistory();
  
  const onEdit = (id: string) => {
    if (onDetail) { 
      onDetail(id); 
    }
    history.push(`${basePath}${id}`);
  };

  const onView = (id: string) => {
    if (onRead) {
      onRead(id);
    }
    history.push(`${basePath}${id}`);
  };

  const onDelete = (id: string) => {
    if (onRemove) {
      Modal.confirm({
        title: translate('SHARED.DELETE_ACTION.TITLE'),
        content: translate('SHARED.DELETE_ACTION.CONTENT'),
        onOk: () => {
          onRemove(id);
        },
        onCancel: () => {}
      });
    }

    return id;
  };

  return (
    <div
      className="data-table-actions"
      style={{
        width: maxWidth || '100%',
        display: maxWidth ? 'inline-block' : 'block',
      }}
    >
      <Popover
        placement="leftTop"
        trigger="click"
        content={(
          <div className="data-table-actions__items">
            {onDetail && (
              <div className="data-table-actions__items__single">
                <a
                  className="data-table-actions__items__single__link"
                  href={void(0)}
                  onClick={() => onEdit(row.id)}
                >
                  <span className="data-table-actions__items__single__link__icon">
                    <img
                      src={IconEdit}
                      alt="icon"
                    />
                  </span>
                  <span className="data-table-actions__items__single__link__text">
                    {translate('COMPONENTS.DATA_TABLE_ACTIONS.EDIT.LABEL')}
                  </span>
                </a>
              </div>
            )}
            {onRead && (
              <div className="data-table-actions__items__single">
                <a 
                  className="data-table-actions__items__single__link"
                  href={void(0)} 
                  onClick={() => onView(row.id)}
                >
                  <span className="data-table-actions__items__single__link__icon">
                    <img
                      src={IconView}
                      alt="icon"
                    />
                  </span>
                  <span className="data-table-actions__items__single__link__text">
                    {translate('COMPONENTS.DATA_TABLE_ACTIONS.VIEW.LABEL')}
                  </span>
                </a>
              </div>
            )}
            {onRemove && (
              <div className="data-table-actions__items__single">
                <a 
                  className="data-table-actions__items__single__link"
                  href={void(0)} 
                  onClick={() => onDelete(row.id)}
                >
                  <span className="data-table-actions__items__single__link__icon">
                    <img
                      src={IconDelete}
                      alt="icon"
                    />
                  </span>
                  <span className="data-table-actions__items__single__link__text">
                    {translate('COMPONENTS.DATA_TABLE_ACTIONS.DELETE.LABEL')}
                  </span>
                </a>
              </div>
            )}
          </div>
        )}
      >
        <div className="data-table-actions__button">
          <img
            src={MoreDots}
            alt="more"
          />
        </div>
      </Popover>
    </div>
  );
};

export default DataTableActions;
