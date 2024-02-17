// components/Profile/me/editProfile.tsx

import React from "react";
import styles from "../../../styles/Profile.module.css";


const EditProfile = (onBackdropClick) => {


  const testFunction = () => {
    alert("Hello")
    return (
      <div className="modalBackdrop" onClick={onBackdropClick}>
        <p>Hello</p>
      </div>
    );
  };

  return (
    <button className={styles.option} onClick={testFunction}>
      MANAGE PROFILE
    </button>
  );
};


export default EditProfile;
