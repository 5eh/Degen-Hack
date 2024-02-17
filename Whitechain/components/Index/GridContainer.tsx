// components/Index/GridContainer.tsx

import React, { useState, useEffect } from "react";
import Card from "./Card";
import styles from "../../styles/IndexGridContainer.module.css";

type ListingData = {
  company: string;
  username: string;
  title: string;
  description: string;
  price: string;
  photo: string;
  id: string;
  location: string;
  features: string;
  creator: string;
};

const GridContainer: React.FC = () => {
  const [listingData, setListingData] = useState<ListingData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listings/listings");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setListingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchListings();
  }, []);

  console.log(listingData);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const GridListings = () => {
    return listingData.map((listing: ListingData) => (
      <Card
        key={`${listing.id}`}
        person={listing.company || listing.username}
        title={listing.title}
        description={listing.description}
        price={listing.price}
        photo={listing.photo}
        id={listing.id}
        location={listing.location}
        features={listing.features}
        creator={listing.creator}
        onClick={toggleModal}
      />
    ));
  };

  return <div className={`${styles.gridContainer} flex`}>{GridListings()}</div>;
};

export default GridContainer;
