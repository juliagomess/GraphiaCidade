import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { translate } from '~/services/i18n';

import AdvancedButton from '../AdvancedButton/AdvancedButton';
import AdvancedFieldInput from '../AdvancedFieldInput/AdvancedFieldInput';

interface IProps {
  onFilter?: any,
  onClear?: any,
  cols: any[],
  fields: any[]
}

const AdvancedFilters: React.FC<IProps> = (props: IProps) => {

  const clean = () => {
    let { fields } = props;
    if (!Array.isArray(fields[0])) {
      fields = [fields];
    }

    fields.forEach((field: any) => {
      field.forEach((propt: any) => {
        propt.onChange();
      });
    });

    props.onClear();
  };

  const renderInputs = () => {
    const rows: JSX.Element[] = [];

    let { cols: nncols, fields } = props;

    if (!Array.isArray(nncols[0])) {
      nncols = [nncols];
      fields = [fields];
    }

    nncols.forEach((ncols, index) => {
      const row: JSX.Element[] = [];
      const properties = fields[index];
      for (let i = 0; i < ncols.length; i++) {
        row.push(
          <Col
            key={i}
            className={`advanced-filters__item`}
            md={ncols[i]}
          >
            <AdvancedFieldInput {...properties[i]} />
          </Col>
        );
      }
      rows.push(<Row key={index}>{row}</Row>);
    });

    return (
      <>
        {rows}
      </>
    );
  };

  return (
    <div className="advanced-filters">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onFilter();
        }}
      >

        {renderInputs()}

        <div className="advanced-filters__buttons">
          {props.onClear && (
            <div className="advanced-filters__buttons__single">
              <AdvancedButton
                type="button"
                text={translate('COMPONENTS.ADVANCED_FILTER.CLEAN')}
                onClick={clean}
                size="medium"
              />
            </div>
          )}
          {props.onFilter && (
            <div className="advanced-filters__buttons__single">
              <AdvancedButton
                type="submit"
                text={translate('COMPONENTS.ADVANCED_FILTER.FILTER')}
                size="medium"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdvancedFilters;
