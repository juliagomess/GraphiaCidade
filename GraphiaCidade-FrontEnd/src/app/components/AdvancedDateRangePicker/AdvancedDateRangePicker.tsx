import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const AdvancedDateRangePicker = ({
  label,
  format,
  onChange,
  value,
  placeholder,
  disabled,
}: any) => (
  <div className="advanced-date-rangepicker">
    <label className="advanced-date-rangepicker__label">
      <span className="advanced-date-rangepicer__label__inner">{label}</span>
      <RangePicker
        format={format}
        onChange={onChange}
        value={value && [value[0], value[1]]}
        placeholder={placeholder}
        style={{ width: '100%' }}
        disabled={disabled}
      />
    </label>
  </div>
);

export default AdvancedDateRangePicker;