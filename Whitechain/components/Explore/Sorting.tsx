// components/Explore/Sorting.tsx

import React from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from '../../styles/Sorting.module.css';
import Link from 'next/link';
import PriceRange from './PriceRange';

const Sorting = ({ formData, setFormData, activeService, setActiveService, services, onPriceFilter, defaultService }) => {

  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={formData}
              onChange={handleInputChange}
              className={styles.search}
              placeholder={
                activeService === defaultService || activeService === ""
                  ? "Search in all categories"
                  : `Custom ${activeService} search`
              }
            />
            <BsSearch className={styles.searchIcon} />
          </div>
        </form>
        <ul className={styles.list}>
          {[defaultService, ...services].map((service, index) => (
            <li
              key={index}
              className={`${styles.listitem} ${
                service === (activeService || defaultService)
                  ? styles.listitemactive
                  : ""
              }`}
              onClick={() =>
                setActiveService(service === defaultService ? "" : service)
              }
            >
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link href={"create"}>
          <button className="functionbutton">CREATE LISTING</button>
        </Link>
        <Link href={"profile/me"}>
          <button className="functionbutton">VIEW PROFILE</button>
        </Link>
      </div>
      <div className="break"></div>
      <div className={styles.areacontainer}>
        <div className={styles.region}>
          <h4>REGION</h4>
          <p>AUSTIN TX</p>
        </div>
        <div className={styles.distance}>
          <h4>DISTANCE</h4>
          <p>16 M</p>
        </div>
      </div>
      <div className="break"></div>
      <div className={styles.areacontainer}>
        <div className={styles.region}>
          <h4>PRICE</h4>
          <PriceRange onFilter={onPriceFilter} />
        </div>
      </div>
    </>
  );
};

export default Sorting;
