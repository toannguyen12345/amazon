import React, { useState } from 'react';
import mock from '@/data/mock-data.json';

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
    <div className="bg-white border-b border-[#e7e7e7] py-3">
      <div className="relative flex items-center px-5 max-w-[1500px] mx-auto">
        <button
          className="flex-shrink-0 bg-[#ffffff] border border-[#ddd] rounded-md w-10 h-10 flex items-center justify-center text-[#555] text-[20px] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f7f7f7] shadow-sm"
          onClick={scrollLeft}
          disabled={scrollPosition <= 0}
        >
          ‹
        </button>

        <div className="flex-1 overflow-hidden mx-3">
          <div
            className="flex gap-[5px] transition-transform duration-300 ease-linear"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-[#ffffff] border border-[#d5d9d9] rounded-full px-4 h-[46px] text-[13px] text-[#0f1111] whitespace-nowrap min-w-fit hover:bg-[#f7f7f7] hover:border-[#999] shadow-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <button
          className="flex-shrink-0 bg-[#ffffff] border border-[#ddd] rounded-md w-10 h-10 flex items-center justify-center text-[#555] text-[20px] hover:bg-[#f7f7f7] shadow-sm"
          onClick={scrollRight}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CategoryNav;
