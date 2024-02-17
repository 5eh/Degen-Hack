// pages/explore.tsx

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sorting from "../components/Explore/Sorting";
import Listings from "../components/Explore/Listings";
import styles from "../styles/Explore.module.css";
import { servicesData } from "./create";
import Footer from '../components/Footer';

const Index = () => {
  const [formData, setFormData] = useState("");
  const [activeService, setActiveService] = useState("");
  const [listingsData, setListingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetch("/api/listings/listings")
      .then((response) => response.json())
      .then((data) => {
        setListingsData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  const filteredListings = listingsData.filter((listing) => {
    return (
      (!formData ||
        listing.title.toLowerCase().includes(formData.toLowerCase())) &&
      (!activeService || listing.service === activeService) &&
      listing.price >= minPrice &&
      listing.price <= maxPrice
    );
  });

  return (
    <>
      <div>
      <br className="mt-10" />
      <Navbar />
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.sorting}>
          <Sorting
          formData={formData}
          setFormData={setFormData}
          activeService={activeService}
          setActiveService={setActiveService}
          services={servicesData.map((service) => service.id)}
          onPriceFilter={(newMinPrice, newMaxPrice) => {
            setMinPrice(newMinPrice);
            setMaxPrice(newMaxPrice);
          }}
          defaultService="Browse All Services"
          />
        </div>
        <div className={styles.listings}>
            <Listings selectedservice={""} listingsData={filteredListings} isLoading={isLoading}
            />
        </div>

      </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
