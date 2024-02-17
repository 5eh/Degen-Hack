// components/ModalPopup/BaseModalWrapper.tsx

import * as React from "react";
import ListingModal from "./ViewListingModal";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  person: string;
  title: string;
  description: string;
  price: string;
  photo: string;
  _id: string;
  location: string;
  creator: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
  person,
  title,
  description,
  price,
  photo,
  _id,
  username,
  location,
  creator,
}: any) => {
  if (!isModalVisible) return null;

  return (
    <ListingModal
      onBackdropClick={onBackdropClick}
      description={description}
      username={username}
      location={location}
      person={person}
      title={title}
      price={price}
      photo={photo}
      _id={_id}
      creator={creator}
    />
  );
};

export default BaseModalWrapper;
