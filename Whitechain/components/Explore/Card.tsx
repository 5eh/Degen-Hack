// component/Explore/Card.tsx

import styles from "../../styles/Listings.module.css";
import { FaMask, FaExclamationCircle, FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import BaseModalWrapper from "../ModalPopup/BaseModalWrapper";
import CurrencyDisplay from "../Currency";
import {useFetchListings} from "../APIs/Hooks/useFetchListings";

const Card = ({
  person,
  title,
  description,
  price,
  photo,
  _id,
  location,
  features,
  creator,
}: any) => {
  const { listingsData, error, isLoading } = useFetchListings();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.cardImageContainer}
        style={{ backgroundImage: `url(${photo})` }}
      >
        <div className={styles.polyglass}>
          <h1 className={styles.cardPerson}>{title}</h1>
          <div className={styles.cardPrice}>
            <p>
              <CurrencyDisplay amount={price} />
            </p>
          </div>
        </div>
        <button className={styles.infoButton}>
          <FaExclamationCircle />
        </button>
      </div>

      <div className={styles.cardContentContainer}>
        <div className="listingFeature">
          <FaMask className="maskIcon" />
          <p className="listingFeatureText">
            {features || "" ? features : "Props included"}
          </p>
        </div>
        <div className="listingFeature">
          <FaRegCalendarAlt className="dateIcon" />
          {features || "" ? features : "At your convenience"}
        </div>

        <button className="functionbutton" onClick={toggleModal}>
          {person || "" ? person : "Book Now"}
        </button>
        <BaseModalWrapper
          isModalVisible={isModalVisible}
          onBackdropClick={toggleModal}
          person={person}
          title={title}
          description={description}
          price={price}
          photo={photo}
          _id={_id}
          location={location}
          creator={creator}
        />
      </div>
    </div>
  );
};

export default Card;
