import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTax } from '@/hooks/useTax';
import mock from '@/data/mock-data.json';
import Stars from '@/components/Stars/Stars';

interface ISidebarProps {
  className?: string;
}

const INITIAL_VISIBLE = 4;

const FILTER_ITEM_CLASS =
  'flex items-center gap-2 px-1.5 py-0.5 border border-transparent rounded cursor-pointer hover:border-blue-700 hover:bg-blue-700/[0.06] focus-within:border-blue-700 focus-within:bg-blue-700/[0.06]';
const LINK_CLASS =
  'text-[#007185] underline bg-transparent border-none p-0 cursor-pointer';
const RANGE_INPUT_CLASS =
  'absolute left-0 right-0 top-0 w-full h-7 bg-transparent appearance-none m-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-700 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-[22px] [&::-moz-range-thumb]:h-[22px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-700 [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:bg-transparent focus:outline-none';

const Sidebar: React.FC<ISidebarProps> = () => {
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
  const [params, setParams] = useSearchParams();
  const initialPrice: [number, number] = [
    Number(params.get('pmin')) || minProductPrice,
    Number(params.get('pmax')) || maxProductPrice,
  ];
  const initialDiscount: [number, number] = [
    params.get('dmin') ? Number(params.get('dmin')) : 0,
    params.get('dmax') ? Number(params.get('dmax')) : 100,
  ];
  const [price, setPrice] = useState<[number, number]>(initialPrice);
  const [discount, setDiscount] = useState<[number, number]>(initialDiscount);

  useEffect(() => {
    const next = new URLSearchParams(params);
    next.set('pmin', String(price[0]));
    next.set('pmax', String(price[1]));
    next.set('dmin', String(discount[0]));
    next.set('dmax', String(discount[1]));
    setParams(next, { replace: true });
  }, [price, discount]);

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
    <aside style={{ width: '100%', padding: '0 20px', position: 'static' }}>
      <section className="mb-6 mt-5">
        <h3
          className="text-lg font-semibold mb-[2px]"
          style={{ color: '#0f1111' }}
        >
          Department
        </h3>
        <div className="space-y-[2px] text-[#0f1111] text-sm leading-5">
          <label className={FILTER_ITEM_CLASS}>
            <input
              name="dept"
              type="radio"
              defaultChecked
              className="accent-blue-600"
            />
            <span>All</span>
          </label>
          {visibleCategories.map((c) => (
            <label key={c} className={FILTER_ITEM_CLASS}>
              <input name="dept" type="radio" className="accent-blue-600" />
              <span>{c}</span>
            </label>
          ))}
          <button
            type="button"
            className={LINK_CLASS}
            onClick={() => setShowAllCategories((v) => !v)}
          >
            {showAllCategories ? 'See less' : 'See more'}
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h3
          className="text-lg font-semibold mb-[2px]"
          style={{ color: '#0f1111' }}
        >
          Brands
        </h3>
        <div className="space-y-[2px] text-[#0f1111] text-sm leading-5">
          {visibleBrands.map((b) => (
            <label key={b} className={FILTER_ITEM_CLASS}>
              <input type="checkbox" className="accent-blue-600" />
              <span>{b}</span>
            </label>
          ))}
          <button
            type="button"
            className={LINK_CLASS}
            onClick={() => setShowAllBrands((v) => !v)}
          >
            {showAllBrands ? 'See less' : 'See more'}
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h3
          className="text-lg font-semibold mb-[2px]"
          style={{ color: '#0f1111' }}
        >
          Customer Reviews
        </h3>
        <div className="space-y-[2px] text-[#0f1111] text-sm leading-5">
          <label className={FILTER_ITEM_CLASS}>
            <input
              name="rating"
              type="radio"
              defaultChecked
              className="accent-blue-600"
            />
            <span>All</span>
          </label>
          <label className={FILTER_ITEM_CLASS}>
            <input name="rating" type="radio" className="accent-blue-600" />
            <span className="flex items-center gap-1">
              <Stars value={4} />
              <span className="text-gray-700">&amp; up</span>
            </span>
          </label>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-[2px]">Price</h3>
        <div className="text-sm font-medium mb-[2px]">
          {formatVND(price[0])} – {formatVND(price[1])}
        </div>
        <div className="relative h-7">
          <div className="absolute top-1/2 left-0 right-0 h-2 rounded-full -translate-y-1/2 bg-gray-200" />
          <div
            className="absolute top-1/2 h-2 rounded-full -translate-y-1/2 bg-blue-700"
            style={{
              left: `${((price[0] - minProductPrice) / (maxProductPrice - minProductPrice)) * 100}%`,
              width: `${((price[1] - price[0]) / (maxProductPrice - minProductPrice)) * 100}%`,
            }}
          />
          <input
            className={RANGE_INPUT_CLASS}
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
            className={RANGE_INPUT_CLASS}
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

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-[2px]">Discount</h3>
        <div className="text-sm font-medium mb-[2px]">
          {discount[0]}% – {discount[1]}%
        </div>
        <div className="relative h-7">
          <div className="absolute top-1/2 left-0 right-0 h-2 rounded-full -translate-y-1/2 bg-gray-200" />
          <div
            className="absolute top-1/2 h-2 rounded-full -translate-y-1/2 bg-blue-700"
            style={{
              left: `${discount[0]}%`,
              width: `${discount[1] - discount[0]}%`,
            }}
          />
          <input
            className={RANGE_INPUT_CLASS}
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
            className={RANGE_INPUT_CLASS}
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
