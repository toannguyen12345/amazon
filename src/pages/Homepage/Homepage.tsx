import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/Layout/Header/Header';
import DealsNav from '@/components/DealsNav/DealsNav';
import CategoryNav from '@/components/CategoryNav/CategoryNav';
import Sidebar from '@/Layout/Sidebar/Sidebar';
import ProductCard from '@/components/ProductCard/ProductCard';
import Footer from '@/Layout/Footer/Footer';
import { useProducts } from '@/hooks/useProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const Homepage: React.FC = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();

  const getParam = (key: string, defaultVal: number = 0) =>
    searchParams.has(key) ? Number(searchParams.get(key)) : defaultVal;

  const searchQuery = (searchParams.get('q') || '').toLowerCase();
  const [pMin, pMax] = [
    getParam('pmin'),
    getParam('pmax', Number.MAX_SAFE_INTEGER),
  ];
  const [dMin, dMax] = [getParam('dmin'), getParam('dmax', 100)];

  const filtered = products.filter(
    ({ name, brand, category, price, discount }) => {
      const matchesSearch =
        !searchQuery ||
        [name, brand, category].some((f) =>
          f.toLowerCase().includes(searchQuery)
        );
      const matchesPrice =
        (!searchParams.has('pmin') && !searchParams.has('pmax')) ||
        (price >= pMin && price <= pMax);
      const matchesDiscount =
        (!searchParams.has('dmin') && !searchParams.has('dmax')) ||
        (discount >= dMin && discount <= dMax);
      return matchesSearch && matchesPrice && matchesDiscount;
    }
  );

  const { visibleCount, loaderRef, hasMoreItems } = useInfiniteScroll({
    initialVisibleCount: 24,
    loadMoreCount: 24,
    totalItemsCount: filtered.length,
    rootMargin: '200px',
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DealsNav />
      <div className="mt-[20px]">
        <CategoryNav />
      </div>
      <main className="flex-1">
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '256px',
              flexShrink: 0,
              position: 'sticky',
              top: 0,
              height: 'fit-content',
              backgroundColor: 'white',
            }}
          >
            <Sidebar />
          </div>
          <div style={{ flex: 1, padding: '20px', backgroundColor: 'white' }}>
            <div className="grid grid-cols-6 gap-[5px]">
              {filtered.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {hasMoreItems && (
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
