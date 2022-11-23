import React from 'react';

export interface IProps {
  pageTitle?: string;
  pageDescription?: string;
  onAddNewUrl?: any;
}

const PanelContentHeader: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="panel-content-header">
      <div className="panel-content-header__inner">
        <div className="panel-content-header__inner__title">
          <h3 className="panel-content-header__inner__title__text">
            {props.pageTitle}
          </h3>
        </div>
        <div className="panel-content-header__inner__description">
          <p className="panel-content-header__inner__description__text">
            {props.pageDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelContentHeader;
