import React from 'react';
import type { Product } from '@/hooks/useProducts';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

function formatVND(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discounted = Math.round(product.price * (1 - product.discount / 100));

  return (
    <div className="pc-card">
      <button
        className="pc-buy"
        aria-label="Buy now"
        onClick={() => {
          let id = localStorage.getItem('cartId');
          if (!id) {
            id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            localStorage.setItem('cartId', id);
          }
          const key = `cart:${id}`;
          let items: Array<any> = [];
          try {
            items = JSON.parse(localStorage.getItem(key) || '[]');
          } catch {
            items = [];
          }
          const found = items.find((l) => l && l.id === product.id);
          if (found) found.qty = Math.min(99, (found.qty || 1) + 1);
          else
            items.push({
              id: product.id,
              name: product.name,
              price: product.price,
              discount: product.discount,
              image: product.image,
              qty: 1,
            });
          localStorage.setItem(key, JSON.stringify(items));
          window.dispatchEvent(new Event('cart:updated'));
        }}
      >
        Buy
      </button>
      <div className="pc-thumb">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="pc-body">
        <div className="pc-brand">{product.brand}</div>
        <div className="pc-name" title={product.name}>
          {product.name}
        </div>
        <div className="pc-prices">
          <span className="pc-price-final">{formatVND(discounted)}</span>
          <span className="pc-price-origin">{formatVND(product.price)}</span>
          <span className="pc-discount">-{product.discount}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
