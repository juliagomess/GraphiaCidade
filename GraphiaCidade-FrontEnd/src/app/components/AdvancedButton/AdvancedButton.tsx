import React from 'react';
import Button from '@material-ui/core/Button';

const AdvancedButton = ({
  type = 'button',
  size = 'large',
  color = 'primary',
  variant = 'contained',
  text,
  onClick,
  startIcon,
  endIcon,
  fullWidth,
  disabled = false,
  disableElevation = false,
}: any) => {
  return (
    <div className="advanced-button">
      <Button
        size={size}
        color={color}
        variant={variant}
        onClick={onClick && (() => onClick())}
        fullWidth={fullWidth || false}
        type={type}
        disabled={disabled}
        disableElevation={disableElevation}
      >
        <span className="advanced-button__inner">
          <span className="advanced-button__inner__start-icon">
            {startIcon}
          </span>
          <span className="advanced-button__inner__text">
            {text}
          </span>
          <span className="advanced-button__inner__end-icon">
            {endIcon}
          </span>
        </span>
      </Button>
    </div>
  );
};

export default AdvancedButton;
