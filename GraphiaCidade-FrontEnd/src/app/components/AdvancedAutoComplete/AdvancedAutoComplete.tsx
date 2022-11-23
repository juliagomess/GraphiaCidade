import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AdvancedAutoComplete = ({
  value,
  label,
  onChange,
  options,
}: any) => {
  return (
    <div className="advanced-input">
      <Autocomplete
        options={options}
        getOptionLabel={(option: any) => option.name}
        fullWidth
        value={options.find((o: any) => o.value === value)}
        onChange={(e: any, option: any) => 
          onChange(option?.value)
        }
        renderInput={(params) => 
          <TextField {...params} label={label} variant="outlined" />
        }
      />
    </div>
  )
}

export default AdvancedAutoComplete;