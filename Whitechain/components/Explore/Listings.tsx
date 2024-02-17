// components/Explore/Listings.tsx

import React, { useState, useEffect } from "react";
import Card from "./Card";
import styles from "../../styles/Listings.module.css";



const Listings = ({ listingsData, isLoading, selectedservice }) => {
  const filterListingsByservice = (listings, service) => {
    return service
      ? listings.filter((listing) => listing.service === service)
      : listings;
  };

  const filteredListings = filterListingsByservice(
    listingsData,
    selectedservice
  );

  const renderCards = () => {
    if (isLoading) {
      return (
        <div className={styles.gridContainer}>
          <Card title="Loading" description="Loading" price="Loading" person='Loading' />
        </div>
      );
    }

    const safeListingsData = listingsData || [];

    const filteredListings = selectedservice
      ? safeListingsData.filter(
          (listing) => listing.service === selectedservice
        )
      : safeListingsData;

    if (filteredListings.length === 0) {
      return (
        <div className={styles.noListings}>
          <p className="center">
            There are no listings in this service... Create one here:
          </p>
        </div>
      );
    }

    return filteredListings.map((listing, index) => (
      <Card
        key={index}
        person={listing.company || listing.owner}
        title={listing.title}
        description={listing.description}
        price={listing.price}
        photo={listing.photo}
        _id={listing._id}
        location={listing.location}
        features={listing.features}
        creator={listing.creator}
      />
    ));
  };

  const containerStyle =
    listingsData.length === 0
      ? styles.noListingsContainer
      : styles.gridContainer;

  return <div className={containerStyle}>{renderCards()}</div>;
};

export default Listings;
