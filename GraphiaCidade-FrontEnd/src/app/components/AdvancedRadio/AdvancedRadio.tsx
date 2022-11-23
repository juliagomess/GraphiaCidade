import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const AdvancedRadio = ({
  value,
  label,
  onChange,
  name,
  items,
  disabled,
}: any) => {
  return (
    <div className="advanced-radio">
      <FormControl component="fieldset">
        <div className="advanced-radio__label">
          <FormLabel component="legend">
            {label}
          </FormLabel>
        </div>
        <RadioGroup
          row
          aria-label={name}
          name={name}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
        >
          {items && items.map((item: any, itemIndex: number) => (
            <FormControlLabel
              key={itemIndex.toString()}
              label={item.label}
              value={item.value}
              disabled={disabled}
              control={(
                <Radio color="primary" />
              )}
              checked={item.value === value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AdvancedRadio;
