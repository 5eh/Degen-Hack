import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/CustomError.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Custom404: React.FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="wrapper">
        <div className={styles.gridcontainer}>
          <div className={`${styles.container} ${styles.containerimage}`}>
            <img src="/index.png" alt="Photo of the week" />
            <div className={styles.textoverlay}>
              <div>
                <p className="primary-font-medium white-500 pl-4">AUSTIN TX</p>
              </div>
              <div>
                <h1 className="primary-font-bold white-900">
                  ARTHUR INDUSTRIES
                </h1>
              </div>
              <div>
                <p className="secondary-font-light white-200 pr-4">
                  4515-2543-3210-3251
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.container} ${styles.containertext}`}>
            <span className="primary-font-bold white-500">LOCALE.</span>
            <h1 className={styles.boldHeading}>AN ERROR OCCURED</h1>
            <div className="mt-2 mb-2 gap-4 mt-max">
              <Link
                href={{
                  pathname: "/profile/me",
                }}
              >
                <button className={`${styles.button} functionbutton`}>
                  Head Home
                </button>
              </Link>

              <button
                onClick={goBack}
                className={`${styles.button} functionbutton`}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Custom404;
