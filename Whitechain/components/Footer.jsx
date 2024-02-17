// components/Footer.tsx

import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { COMPANY } from '../marketplaceVariables';

const Footer = () => {
  const [language, setLanguage] = useState("English");

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.languageSelector}>
          <select
            name="languages"
            id="languages"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="dropdown"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
            <option value="Italian">Italiano</option>
          </select>
        </div>

        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/marketplace-policy">Marketplace Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/blockchain-policy">Blockchain Policy</Link>
          <Link href="/code-of-ethics">Code of Ethics</Link>
        </div>

        <div className={styles.socialmedia}>
          <div className={styles.socialicon}>
            <FaTwitter />
          </div>
          <div className={styles.socialicon}>
            <FaFacebook />
          </div>
          <div className={styles.socialicon}>
            <FaInstagram />
          </div>
          <div className={styles.socialicon}>
            <FaLinkedin />
          </div>
        </div>

        <div className={styles.legal}>
          <p className="pl-2 pr-2  company-logo-text uppercase">{COMPANY}</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
