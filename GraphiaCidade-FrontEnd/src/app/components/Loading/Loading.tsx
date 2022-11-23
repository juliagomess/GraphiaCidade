import React from 'react';
import { WL_COMPANY_LOADING_LOGO } from '~/config/env';

const Loading: React.FC = () => {

  return (
    <div className="loading">
      <div className="loading__inner">
        <img
          className="loading__inner__img"
          src={WL_COMPANY_LOADING_LOGO}
          alt="loading logo"
        />
      </div>
    </div>
  );
};

export default Loading;
