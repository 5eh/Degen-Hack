import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import OverviewBoard from '../components/Analytics/OverviewBoard';
import SideNavigation from '../components/Analytics/SideNavigation';
import styles from '../styles/Analytics.module.css'

const Analytics = () => {

    return (
      <>
        <br className="mt-10" />
        <Navbar />
        <div className={`${styles.wrapper} wrapper`}>
          <div className={styles.sideNavigation}>
            <SideNavigation />
          </div>
          <div className={styles.overviewBoard}>
            <OverviewBoard />
          </div>
        </div>
        <Footer />
      </>
    );

};

export default Analytics;
