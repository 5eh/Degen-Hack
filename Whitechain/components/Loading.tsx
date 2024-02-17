// components/Loading.tsx

import React from "react";
import styles from "../styles/Loader.module.css";

export const CircleLoader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="32"></circle>
      </svg>
    </div>
  );
};

export const SquareLoader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <svg viewBox="0 0 80 80">
        <rect x="8" y="8" width="64" height="64"></rect>
      </svg>
    </div>
  );
};

export const TriangleLoader: React.FC = () => {
  return (
    <div className={`${styles.loader} ${styles.triangle}`}>
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>
  );
};

export const Loader: React.FC = () => {
  return (
    <>
      <CircleLoader />
      <SquareLoader />
      <TriangleLoader />
    </>
  );
};
