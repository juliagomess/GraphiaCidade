import React from 'react';
import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';

const AdvancedDateTimePicker = ({
  value,
  label,
  variant = 'outlined',
  onChange,
  time,
  hint,
}: any) => {
  return (
    <div className="advanced-date-time-picker">
      {time && (
        <KeyboardTimePicker
          variant="inline"
          label={label}
          value={value}
          onChange={onChange}
          format="HH:mm"
          inputVariant={variant}
          autoOk
          ampm={false}
        />
      )}

      {!time && (
        <KeyboardDateTimePicker
          variant="inline"
          ampm={false}
          label={label}
          value={value}
          onChange={onChange}
          disablePast
          format="dd/MM/yyyy HH:mm"
          inputVariant={variant}
          autoOk
        />
      )}
      {hint}
    </div>
  );
};

export default AdvancedDateTimePicker;
