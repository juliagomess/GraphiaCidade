import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Loading from '~/components/Loading/Loading';
import { REACT_APP_APPLICATION_NAME } from '~/config/env';

interface IProps {
  pageTitle?: string;
  pageDescription?: string;
  children?: any;
}

const PanelContent: React.FC<IProps> = (props: IProps) => {
  const isLoading = useSelector(
    (state: reducers.rootReducer) => state.loading.amount
  );

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [location]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{`${props.pageTitle} - ${REACT_APP_APPLICATION_NAME}`}</title>
      </Helmet>

      {(loading || isLoading > 0) && <Loading />}

      <div className="panel-content">
        <div className="panel-content__inner">{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default PanelContent;
