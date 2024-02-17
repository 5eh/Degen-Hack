// components/ModalPopup/AddToWishlistModal.tsx

import styles from "../../styles/ViewListingModal.module.css";

interface ModalProps {
  onBackdropClick: () => void;
}


const AddToWishListModal: React.FC<ModalProps> = ({
  onBackdropClick,
}: any) => {
  return (
    <div className="modalBackdrop" onClick={onBackdropClick}>
      <div className="modalWrapper" onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalBody}>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default AddToWishListModal;
