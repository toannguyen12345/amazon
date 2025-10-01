import React, { useMemo } from 'react';
import { formatVND } from '@/utils/currency';
import { useCart } from '@/contexts/CartContext';

const PRODUCT_IMAGE_CLASS =
  'w-[180px] h-[180px] bg-gray-50 border border-gray-200 rounded-3xl flex items-center justify-center flex-shrink-0 overflow-hidden';
const QUANTITY_SELECTOR_CLASS =
  'flex items-center bg-gray-50 border border-gray-300 rounded-2xl overflow-hidden shadow-sm';
const QUANTITY_BUTTON_CLASS =
  'bg-white hover:bg-gray-100 border-none px-3 py-2 cursor-pointer text-base transition-colors';
const ACTION_LINK_CLASS =
  'bg-transparent border-none text-[#007185] cursor-pointer text-sm hover:text-[#c7511f] hover:underline transition-colors';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCart();

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + Math.round(item.price * (1 - item.discount / 100)) * item.qty,
        0
      ),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const handleQuantityChange = (productId: number, delta: number) => {
    const cartItem = items.find((item) => item.id === productId);
    if (cartItem) {
      updateQuantity(productId, cartItem.qty + delta);
    }
  };

  const handleCheckout = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 py-6">
        <h1 className="text-3xl font-normal mb-6 text-[#0f1111]">
          Shopping Cart
        </h1>
        <div className="flex gap-5">
          <div className="flex-1 bg-white rounded-2xl shadow-sm">
            {items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Your cart is empty
              </div>
            ) : (
              items.map((item) => {
                const sale = Math.round(item.price * (1 - item.discount / 100));
                return (
                  <div
                    key={item.id}
                    className="flex gap-5 p-5 border-b border-gray-200 last:border-b-0"
                  >
                    <div className={PRODUCT_IMAGE_CLASS}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain p-3"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-[#0f1111] mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="text-sm text-green-700 font-semibold mb-3">
                        In Stock
                      </div>
                      <div className="flex gap-2 items-center mb-3">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold">
                          {item.discount}% off
                        </span>
                      </div>
                      <div className="text-sm text-[#565959] mb-3 space-y-1">
                        <div>
                          <span className="font-medium">Color:</span>{' '}
                          <span>Blue Stripe</span>
                        </div>
                        <div>
                          <span className="font-medium">Size:</span>{' '}
                          <span>Medium</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 items-center mt-4">
                        <div className={QUANTITY_SELECTOR_CLASS}>
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className={QUANTITY_BUTTON_CLASS}
                          >
                            −
                          </button>
                          <span className="px-5 py-2 bg-white font-medium min-w-[50px] text-center border-x border-gray-200">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className={QUANTITY_BUTTON_CLASS}
                          >
                            ＋
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={ACTION_LINK_CLASS}
                        >
                          Delete
                        </button>
                        <button className={ACTION_LINK_CLASS}>
                          Save for later
                        </button>
                        <button className={ACTION_LINK_CLASS}>Compare</button>
                        <button className={ACTION_LINK_CLASS}>Share</button>
                      </div>
                    </div>
                    <div className="text-right w-[120px] flex-shrink-0">
                      <div className="text-2xl font-bold text-[#0f1111]">
                        {formatVND(sale)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="w-[320px] flex-shrink-0 self-end mb-8">
            <div className="bg-white border border-gray-300 rounded-[12px] shadow-sm p-5 overflow-hidden">
              <div className="mb-5">
                <div className="text-lg text-[#0f1111] mb-4">
                  <span className="font-normal">
                    Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}
                    ):{' '}
                  </span>
                  <strong className="font-bold">{formatVND(subtotal)}</strong>
                </div>
              </div>
              <button
                className="w-full bg-[#ffd814] border border-[#fcd200] text-[#0f1111] font-normal px-5 py-2.5 rounded-[8px] cursor-pointer hover:bg-[#f7ca00] transition-colors text-sm"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
