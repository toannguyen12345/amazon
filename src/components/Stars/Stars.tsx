import React, { useMemo } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface IStarsProps {
  value: number;
}

const Stars: React.FC<IStarsProps> = ({ value }) => {
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
};

export default Stars;
