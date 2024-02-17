// components/Profile/me/purchases.tsx

import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/Purchases.module.css";
import Card from "../../Explore/Card";
import BaseModalWrapper from '../../ModalPopup/BaseModalWrapper';
import { useFetchListings } from "../../APIs/Hooks/useFetchListings";
import { SquareLoader } from '../../Loading';
import  Link  from 'next/link';


const Purchases: React.FC = () => {
  const scrollersRef = useRef<HTMLDivElement[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { listingsData, error, isLoading } = useFetchListings();

  const handleCardClick = (purchase: any) => {
    setSelectedPurchase(purchase);
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
    scrollersRef.current.forEach((scroller) => {
      if (scroller) {
        // Toggle the animation pause/play when modal visibility changes
        scroller.classList.toggle(styles.scrollerPaused, !isModalVisible);
      }
    });
  };

  useEffect(() => {
    const addAnimation = () => {
      scrollersRef.current.forEach((scroller) => {
        if (scroller) {
          scroller.setAttribute("data-animated", "true");
          const scrollerInner = scroller.querySelector(
            `.${styles.scrollerInner}`
          ) as HTMLElement;

          if (scrollerInner) {
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
              const duplicatedItem = item.cloneNode(true) as HTMLElement;
              duplicatedItem.setAttribute("aria-hidden", "true");
              scrollerInner.appendChild(duplicatedItem);
            });
          }
        }
      });
    };

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);

  const registerScroller = (el: HTMLDivElement) => {
    if (el && !scrollersRef.current.includes(el)) {
      scrollersRef.current.push(el);
    }
  };

  return (
    <>
      {error && <div>Error fetching listings: {error.message}</div>}
      {listingsData ? (
        <div
          className={`${styles.scroller} scroller`}
          data-speed="veryfast"
          ref={registerScroller}
        >
          <div className={`${styles.scrollerInner}`}>
            {listingsData.map((purchase) => (
              <div onClick={() => handleCardClick(purchase)} key={purchase.id}>
                <Card
                  person={purchase.person}
                  title={purchase.title}
                  description={purchase.description}
                  price={purchase.price}
                  photo={purchase.photo}
                  id={purchase.id}
                  location={purchase.location}
                  features={purchase.features}
                  creator={purchase.creator}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="center mt-5">
          <SquareLoader />
          <div className="mt-2 mb-2" />
          <div className="">
            <Link href="/explore">
              <button className="functionbutton">Explore Listings</button>
            </Link>
          </div>
        </div>
      )}

      {selectedPurchase && (
        <BaseModalWrapper
          isModalVisible={isModalVisible}
          onBackdropClick={toggleModal}
          person={selectedPurchase.person}
          title={selectedPurchase.title}
          location={selectedPurchase.location}
          creator={selectedPurchase.creator}
          description={selectedPurchase.description}
          price={selectedPurchase.price}
          photo={selectedPurchase.photo}
          _id={selectedPurchase.id}
        />
      )}
    </>
  );
};
export default Purchases;
