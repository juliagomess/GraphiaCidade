import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  items?: any;
}

const PanelContentBreadcrumb: React.FC<IProps> = (props) => {
  const {
    items,
  } = props;

  return (
    <div className="panel-content-breadcrumb">
      <ul className="panel-content-breadcrumb__menu">
        {items.map((item: any, itemIndex: number) => (
          <li
            className="panel-content-breadcrumb__menu__item"
            key={itemIndex.toString()}
          >
            <Link
              className={`panel-content-breadcrumb__menu__item__link ${item.active ? 'panel-content-breadcrumb__menu__item__link--active' : ''}`}
              to={item.active && item.url}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelContentBreadcrumb;
