// components/Index/Card.tsx

import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import styles from "../../styles/IndexGridContainer.module.css";
import BaseModalWrapper from "../ModalPopup/BaseModalWrapper";
import toast, { Toaster } from "react-hot-toast";
import CurrencyDisplay from "../Currency";
import {
  TOAST_BACKGROUND,
  TOAST_BOARDER,
  TOAST_COLOR,
  TOAST_FONTWEIGHT,
  TOAST_PADDING,
} from "../../marketplaceVariables";

const Card = ({
  person,
  title,
  description,
  price,
  photo,
  _id,
  location,
  creator,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const notify = () =>
    toast("Added to your wishlist", {
      style: {
        border: `${TOAST_BOARDER}`,
        background: `${TOAST_BACKGROUND}`,
        color: `${TOAST_COLOR}`,
        padding: `${TOAST_PADDING}`,
        fontWeight: `${TOAST_FONTWEIGHT}`,
      },
    });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleLoadingState = (loading) => {
    setIsLoading(loading);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <div className={styles.card} onClick={toggleModal}>
        <div
          className={styles.cardImageContainer}
          style={{ backgroundImage: `url(${photo})` }}
        >
          <div className={styles.polyglass}>
            <h3 className={styles.cardPerson}>{title}</h3>
            <div className={styles.cardPrice}>
              <p>
                <CurrencyDisplay amount={price} />
              </p>
            </div>
          </div>
          <button
            className={styles.heartButton}
            onClick={(e) => {
              e.stopPropagation();
              notify();
            }}
          >
            <FaRegHeart />
          </button>
          <Toaster position={"bottom-right"} />
        </div>
      </div>
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
    </>
  );
};

export default Card;
