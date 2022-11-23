import TextField from '@material-ui/core/TextField';
import React from 'react';

const AdvancedInput = ({
  value,
  label,
  placeholder,
  variant = 'outlined',
  onChange,
  multiline = false,
  rows = multiline ? 4 : 1,
  type = 'text',
  InputLabelProps,
  disabled = false,
  inputProps,
}: any) => {
  return (
    <div className='advanced-input'>
      <TextField
        value={value || ''}
        label={label}
        placeholder={placeholder}
        variant={variant}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        multiline={multiline}
        rows={rows}
        type={type}
        InputLabelProps={InputLabelProps}
        disabled={disabled}
        inputProps={inputProps}
      />
    </div>
  );
};

export default AdvancedInput;
