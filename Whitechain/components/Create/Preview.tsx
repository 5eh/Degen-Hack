// components/Create/Preview.tsx

import React, { useEffect, useState } from "react";
import styles from "../../styles/BookNowByService.module.css";
import { useRouter } from "next/router";
import Card from "../Create/Card";
import { UseFetchCreatorDataByEmail } from "../APIs/Hooks/UseFetchCreatorData";

const Preview = ({
  title,
  price,
  description,
  location,
  upcharges,
  photo,
  addFeatures,
  creator,
}) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { userData, error, isLoading } = UseFetchCreatorDataByEmail();
  const id = useRouter().query.id;


  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setIsUserAuthenticated(!!userEmail);
  }, []);


  return (
    <div className={styles.container}>
      <Card
        title={title}
        price={price}
        description={description}
        location={location}
        photo={photo}
        addFeatures={addFeatures}
        upcharges={upcharges}
        creator={creator}
      />
    </div>
  );
};

export default Preview;
