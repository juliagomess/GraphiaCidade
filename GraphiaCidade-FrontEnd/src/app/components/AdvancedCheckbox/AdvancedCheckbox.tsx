import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const AdvancedCheckbox = ({
  value,
  label,
  onChange,
  name,
  disabled = false,
}: any) => {
  return (
    <div className="advanced-checkbox">
      <FormControlLabel
        control={(
          <Checkbox
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            name={name}
            color="primary"
            disabled={disabled}
          />
        )}
        label={label}
      />
    </div>
  );
};

export default AdvancedCheckbox;
