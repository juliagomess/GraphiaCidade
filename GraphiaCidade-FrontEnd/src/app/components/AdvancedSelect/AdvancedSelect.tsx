import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AdvancedSelect = ({
  value,
  label,
  variant = 'outlined',
  onChange,
  onOpen,
  options,
  disabled = false,
}: any) => {
  const classes = useStyles();

  const hasOnClick = () => {
    if (onOpen) {
      return {
        onClick: onOpen,
      };
    }
  };

  return (
    <div className="advanced-select">
      <FormControl
        variant={variant}
        className={classes.formControl}
      >
        <InputLabel>
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoWidth
          readOnly={!!onOpen}
          disabled={disabled}
          {...hasOnClick()}
        >
          {options && options.map((item: any, itemIndex: number) => (
            <MenuItem
              value={item.value}
              key={itemIndex.toString()}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AdvancedSelect;
