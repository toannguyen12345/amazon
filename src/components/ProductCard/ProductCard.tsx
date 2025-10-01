import React from 'react';
import type { Product } from '@/hooks/useProducts';
import { formatVND } from '@/utils/currency';
import { useCart } from '@/contexts/CartContext';

interface IProductCardProps {
  product: Product;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const discounted = Math.round(product.price * (1 - product.discount / 100));

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.image,
    });
  };

  return (
    <div className="bg-white border border-transparent rounded-lg flex flex-col relative min-w-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative rounded-t-lg">
        <div className="h-[200px] bg-gray-50 flex items-center justify-center border-b border-gray-200 p-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <button
          className="absolute top-2 right-2 bg-[#ff9900] hover:bg-[#e8890a] border border-[#ff9900] hover:border-[#e8890a] text-gray-900 font-bold text-xs px-2.5 py-1.5 rounded-md cursor-pointer transition-colors z-20"
          aria-label="Buy now"
          onClick={handleAddToCart}
        >
          Buy
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1">
        <div className="text-xs text-gray-500">{product.brand}</div>
        <div
          className="text-sm text-gray-900 font-medium leading-tight line-clamp-2 min-h-[40px]"
          title={product.name}
        >
          {product.name}
        </div>
        <div className="flex items-baseline gap-2 mt-1 flex-wrap">
          <span className="text-[#b12704] font-bold text-base">
            {formatVND(discounted)}
          </span>
          <span className="text-gray-500 line-through text-xs">
            {formatVND(product.price)}
          </span>
          <span className="text-sky-500 text-xs font-semibold">
            -{product.discount}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
