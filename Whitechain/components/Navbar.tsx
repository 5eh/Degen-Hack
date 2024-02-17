// components/Navbar.tsx

import React from "react";
import Link from "next/link";
import { SlHome, SlMagnifier, SlBubbles, SlPlus, SlSettings, SlUser, SlGraph } from "react-icons/sl";
import styles from "../styles/Navbar.module.css";
import { MARKETPLACE_NAME } from '../marketplaceVariables';

const Navbar = () => {


  return (
    <div id={styles.wrapper}>
      <div id={styles.logo}>
        <h1 className="marketplace-logo-text uppercase">{MARKETPLACE_NAME}</h1>
      </div>
      <div id={styles.polyglass}>
        <div>
          <ul className="flex gap-3 space-between">
            <li>
              <Link href="/">
                <SlHome id={styles.icon} />
              </Link>
            </li>

            <li>
              <Link href="/explore">
                <SlMagnifier id={styles.icon} />
              </Link>
            </li>
            <li>
              <Link href="/create">
                <SlPlus id={styles.icon} />
              </Link>
            </li>
            <li>
              <Link href="/messages">
                <SlBubbles id={styles.icon} />
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/profile/me",
                }}
              >
                <SlUser id={styles.icon} />
              </Link>
            </li>
            {/* <li>
              <Link href="/analytics">
                <SlGraph id={styles.icon} />
              </Link>
            </li> */}
            <li>
              <Link href="/settings">
                <SlSettings id={styles.icon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
