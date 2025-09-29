import React from 'react';
import Header from '../../Layout/Header/Header';
import DealsNav from '../../components/DealsNav/DealsNav';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import Sidebar from '../../Layout/Sidebar/Sidebar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../Layout/Footer/Footer';
import './Homepage.css';

const Homepage: React.FC = () => {
  const { products } = useProducts();
  const [params] = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();
  const pmin = Number(params.get('pmin')) || 0;
  const pmax = Number(params.get('pmax')) || Number.MAX_SAFE_INTEGER;
  const dmin = params.get('dmin') ? Number(params.get('dmin')) : 0;
  const dmax = params.get('dmax') ? Number(params.get('dmax')) : 100;
  const filtered = products.filter((p) => {
    const byQ = q
      ? p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      : true;
    const byPrice = p.price >= pmin && p.price <= pmax;
    const byDiscount = p.discount >= dmin && p.discount <= dmax;
    return byQ && byPrice && byDiscount;
  });
  const [visible, setVisible] = useState(24);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisible((v) => Math.min(v + 24, filtered.length));
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DealsNav />
      <CategoryNav />
      <main className="flex-1">
        <div className="homepage-layout">
          <Sidebar />
          <div className="main-content">
            <div className="grid grid-cols-6 gap-3">
              {filtered.slice(0, visible).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              {visible < filtered.length && (
                <div
                  ref={loaderRef}
                  style={{ gridColumn: '1 / -1', height: 1 }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
