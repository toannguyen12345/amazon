import React from 'react';
import amazonLogo from '../../assets/pngimg.com - amazon_PNG25.png';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Top Navigation Bar */}
      <div className="header-top">
        <div className="header-container">
          {/* Logo */}
          <div className="logo-section">
            <div className="amazon-logo">
              <img src={amazonLogo} alt="Amazon" className="logo-image" />
            </div>
          </div>

          {/* Delivery Location */}
          <div className="delivery-section">
            <div className="location-icon">📍</div>
            <div className="delivery-text">
              <span className="delivery-label">Deliver to</span>
              <span className="delivery-location">Vietnam</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-dropdown">
              <select className="search-select">
                <option>All</option>
                <option>Deals</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search Amazon"
              className="search-input"
            />
            <button className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>

          {/* Language/Country */}
          <div className="language-section">
            <div className="flag-icon">🇺🇸</div>
            <span className="language-text">EN</span>
            <span className="dropdown-arrow">▼</span>
          </div>

          {/* Account & Lists */}
          <div className="account-section">
            <div className="account-text">
              <span className="greeting">Hello, sign in</span>
              <span className="account-label">Account & Lists</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </div>

          {/* Returns & Orders */}
          <div className="orders-section">
            <div className="orders-text">
              <span className="returns-label">Returns</span>
              <span className="orders-label">& Orders</span>
            </div>
          </div>

          {/* Cart */}
          <div className="cart-section">
            <div className="cart-icon">🛒</div>
            <div className="cart-text">
              <span className="cart-count">0</span>
              <span className="cart-label">Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="header-bottom">
        <div className="header-container">
          {/* All Menu */}
          <div className="all-menu">
            <div className="hamburger-icon">☰</div>
            <span className="all-text">All</span>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <a href="#" className="nav-link">
              Today's Deals
            </a>
            <a href="#" className="nav-link">
              Prime Video
            </a>
            <a href="#" className="nav-link">
              Registry
            </a>
            <a href="#" className="nav-link">
              Gift Cards
            </a>
            <a href="#" className="nav-link">
              Customer Service
            </a>
            <a href="#" className="nav-link">
              Sell
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
