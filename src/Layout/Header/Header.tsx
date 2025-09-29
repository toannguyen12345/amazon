import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, createSearchParams, Link } from 'react-router-dom';
import amazonLogo from '../../assets/pngimg.com - amazon_PNG25.png';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  function getCartCount(): number {
    try {
      const id = localStorage.getItem('cartId');
      if (!id) return 0;
      const raw = localStorage.getItem(`cart:${id}`);
      if (!raw) return 0;
      const arr = JSON.parse(raw) as Array<{ qty?: number }>;
      return Array.isArray(arr)
        ? arr.reduce((s, l) => s + (typeof l.qty === 'number' ? l.qty : 1), 0)
        : 0;
    } catch {
      return 0;
    }
  }

  useEffect(() => {
    setCartCount(getCartCount());
    const onStorage = () => setCartCount(getCartCount());
    const onPing = () => setCartCount(getCartCount());
    window.addEventListener('storage', onStorage);
    window.addEventListener('cart:updated', onPing as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart:updated', onPing as EventListener);
    };
  }, []);

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    navigate({
      pathname: '/',
      search: q ? `?${createSearchParams({ q })}` : '',
    });
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-container">
          <div className="logo-section">
            <Link to="/" className="amazon-logo" aria-label="Go to homepage">
              <img src={amazonLogo} alt="Amazon" className="logo-image" />
            </Link>
          </div>

          {/* Delivery Location */}
          <div className="delivery-section">
            <div className="location-icon">📍</div>
            <div className="delivery-text">
              <span className="delivery-label">Deliver to</span>
              <span className="delivery-location">Vietnam</span>
            </div>
          </div>

          <form
            className="search-section"
            onSubmit={onSearchSubmit}
            role="search"
          >
            <div className="search-dropdown">
              <select className="search-select" aria-label="Select department">
                <option>All</option>
                <option>Deals</option>
              </select>
            </div>
            <input
              type="search"
              placeholder="Search Amazon"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <button className="search-button" type="submit">
              <span className="search-icon">🔍</span>
            </button>
          </form>

          {/* Language/Country */}
          <div className="language-section">
            <div className="flag-icon">🇺🇸</div>
            <span className="language-text">EN</span>
            <span className="dropdown-arrow">▼</span>
          </div>

          <div className="account-section">
            <div className="account-text">
              <span className="greeting">Hello, sign in</span>
              <span className="account-label">Account & Lists</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </div>

          <div className="orders-section">
            <div className="orders-text">
              <span className="returns-label">Returns</span>
              <span className="orders-label">& Orders</span>
            </div>
          </div>

          <Link to="/cart" className="cart-section" aria-label="Go to cart">
            <div className="cart-icon">🛒</div>
            <div className="cart-text">
              <span className="cart-count">{cartCount}</span>
              <span className="cart-label">Cart</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="header-bottom">
        <div className="header-container">
          <div className="all-menu">
            <div className="hamburger-icon">☰</div>
            <span className="all-text">All</span>
          </div>

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
