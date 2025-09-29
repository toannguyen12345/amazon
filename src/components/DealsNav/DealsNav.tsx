import React from 'react';
import './DealsNav.css';

const DealsNav: React.FC = () => {
  return (
    <div className="deals-nav">
      <div className="deals-nav-container">
        <nav className="deals-nav-links">
          <a href="#" className="deals-nav-link active">
            Today's Deals
          </a>
          <a href="#" className="deals-nav-link">
            Coupons
          </a>
          <a href="#" className="deals-nav-link">
            Renewed Deals
          </a>
          <a href="#" className="deals-nav-link">
            Outlet
          </a>
          <a href="#" className="deals-nav-link">
            Amazon Resale
          </a>
          <a href="#" className="deals-nav-link">
            Grocery Deals
          </a>
        </nav>
      </div>
    </div>
  );
};

export default DealsNav;
