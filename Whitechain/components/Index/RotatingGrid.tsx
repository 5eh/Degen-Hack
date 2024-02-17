// components/Index/RotatingGrid.tsx

import React from "react";
import styles from "../../styles/RotatingGrid.module.css";

// Eventually add an infinite slide loop to this file, to make it rotate continuously and endlessly.
// Add a few more slides as well


const RotatingGrid = () => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.Left}></div>
      <div className={styles.TopLeft}></div>
      <div className={styles.Center}></div>

      <div className={styles.TopRight}>
        <h1>125</h1>
        <p className="primary-font-semibold white-900">ACTIVE GROUPS</p>
      </div>

      <div className={styles.BottomLeft}>
        <h1 className="">30+</h1>
        <p className="primary-font-semibold white-900">CATEGORIES</p>
      </div>
      <div className={styles.BottomRight}></div>
      <div className={styles.Right}></div>
    </div>
  );
};

export default RotatingGrid;
