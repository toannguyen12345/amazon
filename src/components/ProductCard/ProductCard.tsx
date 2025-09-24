import React from 'react';
import './ProductCard.css';

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  discountPercent?: number; // e.g. 30
  limitedDeal?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  discountPercent,
  limitedDeal,
  className,
}) => {
  const priceVnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div
      className={['pc-card bg-white rounded-lg', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="pc-image-wrap">
        <img src={image} alt={name} className="pc-image" />
      </div>

      {(discountPercent || limitedDeal) && (
        <div className="pc-badges">
          {typeof discountPercent === 'number' && (
            <span className="pc-badge pc-badge--deal">
              {discountPercent}% off
            </span>
          )}
          {limitedDeal && (
            <span className="pc-badge pc-badge--time">Limited time deal</span>
          )}
        </div>
      )}

      <div className="pc-title">{name}</div>

      <div className="pc-price">{priceVnd}</div>
    </div>
  );
};

export default ProductCard;
