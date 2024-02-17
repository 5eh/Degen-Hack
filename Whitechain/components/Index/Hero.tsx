import React from "react";
import styles from "../../styles/Hero.module.css";
import { MARKETPLACE_TYPE, MARKETPLACE_NAME } from '../../marketplaceVariables/index'

const Hero = () => {

  return (
    <>
      <div className={styles.gridcontainer}>
        <div className={`${styles.container} ${styles.containerimage}`}>
          <img src="index.avif" alt="Photo of the week" />
          <div className={styles.textoverlay}>
            <div>
              <p className="primary-font-medium white-500 pl-4">AUSTIN TX</p>
            </div>
            <div>
              <h1 className="primary-font-bold white-900">ARTHUR INDUSTRIES</h1>
            </div>

            <div>
              <p className="secondary-font-light white-200 pr-4">
                4515-2543-3210-3251
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.container} ${styles.containertext}`}>
          <h2 className="marketplace-logo-text white-300 uppercase">
            {MARKETPLACE_NAME}
          </h2>
          <h1 className={styles.boldHeading}>
            THE{" "}
            <span className={`${styles.highlighted} uppercase`}>
              {MARKETPLACE_TYPE}
            </span>{" "}
            WEB3 FRIEND MATCH MAKING
          </h1>
          <div className="mt-10 "></div>
          <h3 className="ml-2 mr-2 white-500 primary-font">
            Find local sweat friends!
          </h3>
          <p className="ml-2 mr-2 white-900 marketplace-logo-text">
            Simply find your ideal sport and find friends, or create your own
            listing, sweat and earn!
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
