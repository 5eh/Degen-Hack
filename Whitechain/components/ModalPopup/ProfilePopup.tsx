// components/ModalPopup/ProfilePopup.tsx

import React from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/ViewListingModal.module.css";

interface ProfilePopupProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  children: React.ReactNode;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  isModalVisible,
  onBackdropClick,
  children,
}) => {
  if (!isModalVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modalBackdrop" onClick={onBackdropClick}>
      <div className="modalWrapper" onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default ProfilePopup;
