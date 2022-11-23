import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core';
import { translate } from '~/services/i18n';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: 'none',
    },
  }),
);

interface IProps {
  identifier: string,
  accept: string,
  icon: string | JSX.Element,
  text: string,
  color: any,
  onChange: (files: any) => void,
  variant?: any,
  size?: any,
  filename: string,
};

const AdvancedFileInput = ({
  identifier,
  accept,
  icon,
  text,
  color,
  onChange,
  variant = 'outlined',
  size = 'large',
  filename
}: IProps) => {
  const classes = useStyles();

  return (
    <div className="advanced-file-input">
      <input
        accept={accept}
        className={classes.input}
        id={identifier}
        type="file"
        onChange={(e) => 
          onChange(e.currentTarget.files)
        }
      />
      <label htmlFor={identifier}>
        <Button 
          variant={variant} 
          color={color} 
          component="span"
          className="advanced-file-input"
          size={size}
        >
          {icon}
          &nbsp;
          {text}
        </Button>
      </label>
      {filename && (
        <label>
          {`${translate('COMPONENTS.ADVANCED_FILE_UPLOAD.FILENAME')} ${filename}`}
        </label>
      )}
    </div>
  );
}

export default AdvancedFileInput;
