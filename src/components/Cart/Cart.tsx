import React, { useEffect, useMemo, useState } from 'react';
import './Cart.css';

interface CartLine {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  qty: number;
}

const formatUSD = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(v);

const CART_ID_KEY = 'cartId';
const ensureCartId = (): string => {
  let id = localStorage.getItem(CART_ID_KEY);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(CART_ID_KEY, id);
  }
  return id;
};

const cartKey = (id: string) => `cart:${id}`;

const loadCart = (): CartLine[] => {
  const raw = localStorage.getItem(cartKey(ensureCartId()));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCart = (lines: CartLine[]) =>
  localStorage.setItem(cartKey(ensureCartId()), JSON.stringify(lines));

const Cart: React.FC = () => {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(loadCart());
  }, []);

  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, l) =>
          sum + Math.round(l.price / 23000) * (1 - l.discount / 100) * l.qty,
        0
      ),
    [lines]
  );

  const updateQty = (id: number, delta: 1 | -1) =>
    setLines((arr) => {
      const next = arr.map((l) =>
        l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l
      );
      saveCart(next);
      return next;
    });
  const inc = (id: number) => updateQty(id, 1);
  const dec = (id: number) => updateQty(id, -1);
  function remove(id: number) {
    setLines((arr) => {
      const next = arr.filter((l) => l.id !== id);
      saveCart(next);
      return next;
    });
  }

  const checkout = () => {
    localStorage.removeItem(cartKey(ensureCartId()));
    setLines([]);
    window.dispatchEvent(new Event('cart:updated'));
  };

  return (
    <div className="cart">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-table">
        <div className="cart-header">
          <div className="cart-col cart-col__item">Item</div>
          <div className="cart-col cart-col__price">Price</div>
        </div>
        {lines.map((l) => {
          const priceUsd = Math.round(l.price / 23000);
          const sale = priceUsd * (1 - l.discount / 100);
          return (
            <div key={l.id} className="cart-row">
              <div className="cart-item">
                <div className="cart-thumb">
                  <img src={l.image} alt={l.name} />
                </div>
                <div className="cart-info">
                  <div className="cart-name">{l.name}</div>
                  <div className="cart-meta">
                    <span className="badge badge--deal">{l.discount}% off</span>
                    <span className="instock">In Stock</span>
                  </div>
                  <div className="cart-actions">
                    <div className="qty">
                      <button onClick={() => dec(l.id)} className="qty-btn">
                        −
                      </button>
                      <span className="qty-val">{l.qty}</span>
                      <button onClick={() => inc(l.id)} className="qty-btn">
                        ＋
                      </button>
                    </div>
                    <button onClick={() => remove(l.id)} className="link">
                      Delete
                    </button>
                    <button className="link">Save for later</button>
                    <button className="link">Compare with similar items</button>
                    <button className="link">Share</button>
                  </div>
                </div>
              </div>
              <div className="cart-price">
                <div className="price-final">{formatUSD(sale)}</div>
                <div className="price-typical">
                  <span className="typical-label">Typical price:</span>
                  <span className="price-line">{formatUSD(priceUsd)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <span>Subtotal ({lines.reduce((s, l) => s + l.qty, 0)} item):</span>
        <strong>{formatUSD(subtotal)}</strong>
      </div>

      <div className="cart-actions-bottom">
        <button className="btn-checkout" onClick={checkout}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
