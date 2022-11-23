import React from 'react';

const KPICard = ({ number, description }: any) => (
  <div className="kpi-card">
    <div className="kpi-card__left">
      <div className="kpi-card__left__number">
        {number}
      </div>
    </div>
    <div className="kpi-card__right">
      <div className="kpi-card__right__description">
        {description}
      </div>
    </div>
  </div>
);

export default KPICard;
