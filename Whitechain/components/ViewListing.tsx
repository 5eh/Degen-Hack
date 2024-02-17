// components/ViewListing.tsx

import React, { useState, useEffect } from "react";

interface Listing {
  title: string;
  description: string;
}

const ViewListing: React.FC = () => {
  const [listing, setListing] = useState<Listing | null>(null);
const [isCreator, setIsCreator] = useState<boolean>(false);

  useEffect(() => {
    const fetchListing = setInterval(() => {
      const storedListing = localStorage.getItem("listing");
      if (storedListing) {
        setListing(JSON.parse(storedListing));
      }
    }, 1000);

      
    return () => clearInterval(fetchListing);
  }, []);

    useEffect(() => {
      setIsCreator(!!localStorage.getItem("isCreator"));
    }, []);
    
  const handleAccept = () => {
    localStorage.setItem("isAccepted", "true");
  };

  if (!listing) return <p>No listings available.</p>;

  return (
    <div>
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      {!isCreator && <button onClick={handleAccept}>Accept Listing</button>}
    </div>
  );
};

export default ViewListing;
