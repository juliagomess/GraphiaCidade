import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { DownloadOutlined } from '@ant-design/icons';

import AdvancedButton from '~/components/AdvancedButton/AdvancedButton';
import AdvancedDateRangePicker from '~/components/AdvancedDateRangePicker/AdvancedDateRangePicker';
import { translate } from '~/services/i18n';

interface IProps {
  onExport: (start: string, end: string) => void,
}

const initialValues: models.Export = {
  start: '',
  end: '',
  period: [],
}

const AdvancedExport: React.FC<IProps> = ({ 
  onExport 
}: IProps) => {
  const [form, setForm] = useState(initialValues);

  const onFormChange = (key: string, val: any) => {
    setForm((prevState: models.Export) => ({ ...prevState, [key]: val }));
  };

  const handlePeriodChange = (period: any[]) => {
    onFormChange('period', period);
    onFormChange('start', period[0].format('YYYY-MM-DD'));
    onFormChange('end', period[1].format('YYYY-MM-DD'));
  };

  return (
    <div className="advanced-export">
      <Row>
        <Col md={6}>
          <AdvancedDateRangePicker
            format={translate('SHARED.DATE_FORMAT')}
            label={translate('COMPONENTS.ADVANCED_EXPORT.PERIOD.LABEL')}
            value={form.period}
            onChange={(val: Array<any>) => handlePeriodChange(val)}
            placeholder={[
              translate('COMPONENTS.ADVANCED_EXPORT.START.LABEL'),
              translate('COMPONENTS.ADVANCED_EXPORT.END.LABEL'),
            ]}
          />
        </Col>
        <Col md={4}>
          <AdvancedButton
            type="button"
            text={translate('COMPONENTS.ADVANCED_EXPORT.EXPORT')}
            size="medium"
            className="advanced-export__button"
            onClick={() => onExport(form.start, form.end)}
            endIcon={<DownloadOutlined />}
          />
        </Col>
      </Row>
    </div>
  )
};

export default AdvancedExport;