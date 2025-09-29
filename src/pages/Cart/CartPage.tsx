import React from 'react';
import Header from '@/Layout/Header/Header';
import Footer from '@/Layout/Footer/Footer';
import Cart from '@/components/Cart/Cart';

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Cart />
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
