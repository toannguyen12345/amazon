import React, { useState } from 'react';
import mock from '../../data/mock-data.json';
import './CategoryNav.css';

const CategoryNav: React.FC = () => {
  const categories = mock.categories;
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 200;

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
  };

  const scrollRight = () => {
    setScrollPosition(
      Math.min(
        categories.length * 150 - window.innerWidth + 100,
        scrollPosition + scrollAmount
      )
    );
  };

  return (
    <div className="category-nav">
      <div className="category-nav-container">
        <button
          className="nav-arrow nav-arrow-left"
          onClick={scrollLeft}
          disabled={scrollPosition <= 0}
        >
          ‹
        </button>

        <div className="category-scroll-container">
          <div
            className="category-scroll-content"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {categories.map((category, index) => (
              <button key={index} className="category-button">
                {category}
              </button>
            ))}
          </div>
        </div>

        <button className="nav-arrow nav-arrow-right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
};

export default CategoryNav;
