// components/Create/ViewListingModal.tsx

import styles from "../../styles/ViewListingModal.module.css";
import CurrencyDisplay from "../Currency";
import { UseFetchCreatorDataByEmail } from "../APIs/Hooks/UseFetchCreatorData";

const ListingModal = ({
  onBackdropClick,
  title,
  description,
  price,
  photo,
  location,
  _id,
  creator,
}) => {
  const { userData, error, isLoading } = UseFetchCreatorDataByEmail(creator);

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
              <h1>{title}</h1>
              <p>
                <CurrencyDisplay amount={price} />
                <span className="white-400"> [Send Offer]</span>
              </p>
              <p>Professional Service</p>
              <p>
                Located in
                <span className="secondary-900 pointer"> {location}</span>
              </p>
              <p className={styles.description}>{description}</p>

              <div className="break"></div>
              <div>
                <h3 className="white-900">{creator[0].name}</h3>

                <a className="white-900">View Profile</a>

                <div className="flex space-between">
                  <p className="">{creator[0].rating}</p>
                  <p className="secondary-900 pointer">
                    {creator[0].media.mediaLinkOne}
                  </p>
                </div>

                <div className="flex space-between">
                  <p>{creator[0].amountOfReviews} Reviews</p>
                  <p className="secondary-900 pointer">
                    {creator[0].media.mediaLinkTwo}
                  </p>
                </div>

                <div className="flex space-between mb-1">
                  <p className="white-300">
                    {creator[0].listings.length} Other Services
                  </p>
                  <p>{creator[0].email}</p>
                </div>

                <div className="break"></div>

                <button className="functionbutton">Book Now</button>

                <button className="secondaryfunctionbutton"> Message </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
