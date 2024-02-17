// components/Index/MainContainer.tsx

import React from "react";
import styles from "../../styles/MainContainer.module.css";

const MainContainer = () => {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.smallcontainer}>
        <img src="./BlueIcon.png" alt="Blue Icon" />
        <p className="mt-1 button-900">26+</p>
        <h3 className="primary-font-medium white-800">REGIONS</h3>
      </div>

      <div className={styles.smallcontainer}>
        <img src="./PurpleIcon.png" alt="Purple Icon" />
        <p className="mt-1 button-900">21</p>
        <h3 className="primary-font-medium white-800">PREMIUM EVENTS</h3>
      </div>

      <div className={styles.smallcontainer}>
        <img src="./CyanIcon.png" alt="Cyan Icon" />
        <p className="mt-1 button-900">$2.50</p>
        <h3 className="primary-font-medium white-800">AVG. COST</h3>
      </div>

      <div className={styles.smallcontainer}>
        <img src="./RedIcon.png" alt="Red Icon" />
        <p className="mt-1 button-900">600+</p>
        <h3 className="primary-font-medium white-800">LISTINGS</h3>
      </div>
    </div>
  );
};

export default MainContainer;
