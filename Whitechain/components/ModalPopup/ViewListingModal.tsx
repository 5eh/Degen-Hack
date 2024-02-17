// components/ModalPopup/ViewListingModal.tsx

import { useState } from "react";
import styles from "../../styles/ViewListingModal.module.css";
import Link from "next/link";
import CurrencyDisplay from "../Currency";
import { UseFetchCreatorData } from "../APIs/Hooks/UseFetchCreatorData";

interface ModalProps {
  onBackdropClick: boolean;
  isCreatingNew?: boolean;
  formData?: any;
  person: string;
  title: string;
  description: string;
  price: string;
  photo: string;
  _id: string;
  location: string;
  username: string;
  creator: string;
}

const ListingModal: React.FC<ModalProps> = ({
  onBackdropClick,
  title,
  description,
  price,
  photo,
  _id,
  creator,
}: any) => {
  const [displayData, setDisplayData] = useState<any>({});
  const { userData, error, isLoading } = UseFetchCreatorData(creator);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <p>Error loading user data</p>;
  }


  return (
    <div className="modalBackdrop" onClick={onBackdropClick}>
      <div className="modalWrapper" onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalBody}>
          <div className={styles.grid}>
            <div
              className={styles.photoContainer}
              style={{ backgroundImage: `url(${photo})` }}
            ></div>
            <div>
              {userData.map((user: any, index) => {
                return (
                  <>
                    <h1>{title}</h1>
                    <p>
                      <CurrencyDisplay amount={price} />

                      <span className="white-400"> [Send Offer]</span>
                    </p>
                    <p>Professional Service</p>
                    <p>
                      Located in
                      <span className="secondary-900 pointer"> {user.location}</span>
                    </p>
                    <p className={styles.description}>{description}</p>

                    <div className="break"></div>
                    <div>
                      <h3 className="white-900">{user.name}</h3>

                      <Link
                        href={{
                          pathname: "/profile/[id]",
                          query: { id: [user._id] },
                        }}
                        className={styles.linkDecoration}
                      >

                      <p className="white-900">View Profile</p>
                        </Link>
                        
                      <div className="flex space-between">
                        <p className="">{user.rating}</p>
                        <p className="secondary-900 pointer">{user.media.mediaLinkOne}</p>
                      </div>

                      <div className="flex space-between">
                        <p>{user.amountOfReviews} Reviews</p>
                        <p className="secondary-900 pointer">{user.media.mediaLinkTwo}</p>
                      </div>

                      <div className="flex space-between mb-1">
                        <p className="white-300">{user.listings.length} Other Services</p>
                        <p>{user.email}</p>
                      </div>

                      <div className="break"></div>

                      <Link
                        href={{
                          pathname: `/schedule/${_id}`,
                          query: { id: [_id] },
                        }}
                        className={styles.linkDecoration}
                      >
                        <button className="functionbutton">Book Now</button>
                      </Link>

                      <Link
                        href={{
                          pathname: "/message/[...username]",
                          query: { username: [creator] },
                        }}
                        className={styles.linkDecoration}
                      >
                        <button className="secondaryfunctionbutton">
                          {" "}
                          Message{" "}
                        </button>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
