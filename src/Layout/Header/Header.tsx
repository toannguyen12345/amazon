import React, { FormEvent, useState } from 'react';
import { useNavigate, createSearchParams, Link } from 'react-router-dom';
import amazonLogo from '@/assets/pngimg.com - amazon_PNG25.png';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { itemCount } = useCart();

  function onSearchSubmit(event: FormEvent) {
    event.preventDefault();
    const searchQuery = query.trim();
    navigate({
      pathname: '/',
      search: searchQuery ? `?${createSearchParams({ q: searchQuery })}` : '',
    });
  }

  return (
    <header className="text-white">
      <div className="px-4 py-2 bg-[#0f1111]">
        <div className="flex items-center max-w-7xl mx-auto">
          <div className="flex items-center mr-4">
            <Link
              to="/"
              className="flex items-center"
              aria-label="Go to homepage"
            >
              <img
                src={amazonLogo}
                alt="Amazon"
                className="h-1 w-auto"
                onLoad={(e) => {
                  e.currentTarget.style.height = '20px';
                  e.currentTarget.style.width = '220px';
                }}
                style={{
                  height: '200px !important',
                  width: '150px',
                }}
              />
            </Link>
          </div>

          <div className="flex items-center text-xs mr-4">
            <div className="text-lg mr-1">📍</div>
            <div>
              <div className="text-gray-300">Deliver to</div>
              <div className="font-semibold">Vietnam</div>
            </div>
          </div>

          <form
            className="flex flex-1 max-w-4xl"
            onSubmit={onSearchSubmit}
            role="search"
          >
            <div className="flex w-full">
              <select
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-l-md border-r border-gray-300 focus:outline-none text-sm"
                aria-label="Select department"
              >
                <option>All</option>
                <option>Deals</option>
              </select>
              <input
                type="search"
                placeholder="Search Amazon"
                className="flex-1 px-4 py-2 border-0 focus:outline-none text-gray-900 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
              />
              <button
                className="bg-[#febd69] hover:bg-[#f3a847] text-gray-900 px-4 py-2 rounded-r-md transition-colors"
                type="submit"
              >
                <span className="text-lg">🔍</span>
              </button>
            </div>
          </form>

          <div className="flex items-start ml-auto mt-2 gap-6 md:gap-8 pr-2 justify-end text-white [&_a]:text-white [&_a:hover]:text-white [&_a:visited]:text-white">
            <div className="flex items-center text-xs">
              <div className="text-lg mr-1">🇺🇸</div>
              <span className="font-semibold text-white text-[12px]">EN</span>
              <span className="ml-1 text-white text-[12px]">▼</span>
            </div>

            <div className="flex items-center text-xs text-white">
              <div>
                <div className="text-white">Hello, sign in</div>
                <div className="font-semibold text-white">Account & Lists</div>
              </div>
              <span className="ml-1 text-white">▼</span>
            </div>

            <div className="text-xs text-white">
              <div>
                <span className="text-white">Returns</span>
                <span className="font-semibold text-white">& Orders</span>
              </div>
            </div>

            <Link
              to="/cart"
              className="flex items-center text-xs text-white visited:text-white hover:text-white"
              aria-label="Go to cart"
            >
              <div className="text-2xl mr-1">🛒</div>
              <div>
                <div className="font-semibold text-white">{itemCount}</div>
                <div className="text-white">Cart</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#232f3e] px-4 py-2 text-white">
        <div className="flex items-center max-w-7xl mx-auto">
          <div className="flex items-center mr-6">
            <div className="text-xl mr-2">☰</div>
            <span className="font-semibold">All</span>
          </div>

          <nav className="flex items-center" style={{ columnGap: '40px' }}>
            <a
              href="#"
              className="text-sm no-underline"
              style={{ color: '#ffffff' }}
            >
              Today's Deals
            </a>
            <a
              href="#"
              className="text-sm no-underline"
              style={{ color: '#ffffff' }}
            >
              Prime Video
            </a>
            <a
              href="#"
              className="text-sm no-underline"
              style={{ color: '#ffffff' }}
            >
              Registry
            </a>
            <a
              href="#"
              className="text-sm no-underline"
              style={{ color: '#ffffff' }}
            >
              Gift Cards
            </a>
            <a
              href="#"
              className="text-sm no-underline"
              style={{ color: '#ffffff' }}
            >
              Customer Service
            </a>
            <a
              href="#"
              className="text-sm no-underline"
              style={{ color: '#ffffff' }}
            >
              Sell
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
