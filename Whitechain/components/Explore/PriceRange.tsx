// components/Explore/PriceRange.tsx

import React, { useState, useEffect } from "react";
import styles from "../../styles/Sorting.module.css";

interface PriceRangeProps {
  onFilter: (minPrice: number, maxPrice: number) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    onFilter(Number(minPrice) || 0, Number(maxPrice) || Infinity);
  }, [minPrice, maxPrice, onFilter]);

  return (
    <div className={styles.priceRangeContainer}>
      <div className={styles.priceField}>
        <p className={styles.minPrice}>MINIMUM</p>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          min="0"
          className={styles.minInput}
        />
      </div>
      <div className={styles.priceField}>
        <p className={styles.maxPrice}>MAXIMUM</p>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min="0"
          className={styles.maxInput}
        />
      </div>
    </div>
  );
};

export default PriceRange;
