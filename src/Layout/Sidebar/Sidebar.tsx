import React, { useMemo, useState } from 'react';
import { useTax } from '@/hooks/useTax';
import mock from '@/data/mock-data.json';
import './Sidebar.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface SidebarProps {
  className?: string;
}

const INITIAL_VISIBLE = 4;

function Stars({ value }: { value: number }) {
  const stars = useMemo(
    () => Array.from({ length: 5 }, (_, i) => i < value),
    [value]
  );
  const gold = '#f1a41a';
  return (
    <span aria-hidden="true" className="inline-flex items-center">
      {stars.map((filled, idx) => {
        const isLast = idx === 4;
        if (filled) {
          return <FaStar key={idx} size={16} color={gold} className="mr-0.5" />;
        }
        return (
          <FaRegStar
            key={idx}
            size={16}
            color={isLast ? gold : '#d1d5db'}
            className="mr-0.5"
          />
        );
      })}
    </span>
  );
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { brands, categories } = useTax();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const productPrices = useMemo(() => mock.products.map((p) => p.price), []);
  const minProductPrice = useMemo(
    () => Math.min(...productPrices),
    [productPrices]
  );
  const maxProductPrice = useMemo(
    () => Math.max(...productPrices),
    [productPrices]
  );
  const [price, setPrice] = useState<[number, number]>([
    minProductPrice,
    maxProductPrice,
  ]);
  const [discount, setDiscount] = useState<[number, number]>([0, 100]);

  function formatVND(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value);
  }

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, INITIAL_VISIBLE);
  const visibleBrands = showAllBrands
    ? brands
    : brands.slice(0, INITIAL_VISIBLE);

  return (
    <aside className={['w-64 shrink-0', className].filter(Boolean).join(' ')}>
      {/* Department */}
      <section className="mb-3">
        <h3
          className="text-lg font-semibold mb-[2px]"
          style={{ color: '#0f1111' }}
        >
          Department
        </h3>
        <div className="space-y-[2px] sb-text">
          <label className="sb-item">
            <input
              name="dept"
              type="radio"
              defaultChecked
              className="accent-blue-600"
            />
            <span>All</span>
          </label>
          {visibleCategories.map((c) => (
            <label key={c} className="sb-item">
              <input name="dept" type="radio" className="accent-blue-600" />
              <span>{c}</span>
            </label>
          ))}
          <button
            type="button"
            className="sb-link"
            onClick={() => setShowAllCategories((v) => !v)}
          >
            {showAllCategories ? 'See less' : 'See more'}
          </button>
        </div>
      </section>

      {/* Brands */}
      <section className="mb-3">
        <h3
          className="text-lg font-semibold mb-[2px]"
          style={{ color: '#0f1111' }}
        >
          Brands
        </h3>
        <div className="space-y-[2px] sb-text">
          {visibleBrands.map((b) => (
            <label key={b} className="sb-item">
              <input type="checkbox" className="accent-blue-600" />
              <span>{b}</span>
            </label>
          ))}
          <button
            type="button"
            className="sb-link"
            onClick={() => setShowAllBrands((v) => !v)}
          >
            {showAllBrands ? 'See less' : 'See more'}
          </button>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="mb-3">
        <h3
          className="text-lg font-semibold mb-[2px]"
          style={{ color: '#0f1111' }}
        >
          Customer Reviews
        </h3>
        <div className="space-y-[2px] sb-text">
          <label className="sb-item">
            <input
              name="rating"
              type="radio"
              defaultChecked
              className="accent-blue-600"
            />
            <span>All</span>
          </label>
          <label className="sb-item">
            <input name="rating" type="radio" className="accent-blue-600" />
            <span className="flex items-center gap-1">
              <Stars value={4} />
              <span className="text-gray-700">&amp; up</span>
            </span>
          </label>
        </div>
      </section>

      {/* Price */}
      <section className="mb-3">
        <h3 className="text-lg font-semibold mb-[2px]">Price</h3>
        <div className="text-sm font-medium mb-[2px]">
          {formatVND(price[0])} – {formatVND(price[1])}
        </div>
        <div className="range-container">
          <div className="range-track-base" />
          <div
            className="range-track-selected"
            style={{
              left: `${((price[0] - minProductPrice) / (maxProductPrice - minProductPrice)) * 100}%`,
              right: `${(1 - (price[1] - minProductPrice) / (maxProductPrice - minProductPrice)) * 100}%`,
            }}
          />
          <input
            className="range-input"
            type="range"
            min={minProductPrice}
            max={maxProductPrice}
            step={100000}
            value={price[0]}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), price[1]);
              setPrice([v, price[1]]);
            }}
          />
          <input
            className="range-input"
            type="range"
            min={minProductPrice}
            max={maxProductPrice}
            step={100000}
            value={price[1]}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), price[0]);
              setPrice([price[0], v]);
            }}
          />
        </div>
      </section>

      {/* Discount */}
      <section className="mb-3">
        <h3 className="text-lg font-semibold mb-[2px]">Discount</h3>
        <div className="text-sm font-medium mb-[2px]">
          {discount[0]}% – {discount[1]}%
        </div>
        <div className="range-container">
          <div className="range-track-base" />
          <div
            className="range-track-selected"
            style={{
              left: `${discount[0]}%`,
              right: `${100 - discount[1]}%`,
            }}
          />
          <input
            className="range-input"
            type="range"
            min={0}
            max={100}
            value={discount[0]}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), discount[1]);
              setDiscount([v, discount[1]]);
            }}
          />
          <input
            className="range-input"
            type="range"
            min={0}
            max={100}
            value={discount[1]}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), discount[0]);
              setDiscount([discount[0], v]);
            }}
          />
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
