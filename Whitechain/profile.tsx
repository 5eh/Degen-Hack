import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Profile.module.css";
import { BsCheck, BsStarFill } from "react-icons/bs";
import Image from 'next/image';

const Profile = () => {  

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className={styles.banner}>
          <Image
            className={styles.profilepicture}
            alt="Profile Picture"
            src={userData.profilePicture}
          />
        </div>

        <div className="center mt-2">{/* <h1>{user.name}</h1> */}</div>
        <div className={`${styles.grid}`}>
          <div className={`${styles.badges}`}>
            <div className="flex">
              <p className={`${styles.badge}`}>
                4.84 {""}
                <BsStarFill size="0.75em" /> RATING
              </p>

              <p className={`${styles.badge}`}>2 YEARS</p>
              <p className={`${styles.badge}`}>2 YEARS</p>
            </div>
            <div className={styles.verifications}>
              <p className="mb-1">
                {/* <span>{user.name}</span> has verified their */}
              </p>
              <div className="flex">
                <BsCheck size={"2em"} className={styles.tickIcon} />
                <p> PHONE NUMBER</p>
              </div>
              <div className="flex">
                <BsCheck size={"2em"} className={styles.tickIcon} />
                <p> EMAIL ADDRESS</p>
              </div>
              <div className="flex">
                <BsCheck size={"2em"} className={styles.tickIcon} />
                <p> REGION OF WORK</p>
              </div>
              <div className="flex mb-1">
                <BsCheck size={"2em"} className={styles.tickIcon} />
                <p> PASSPORT INFO</p>
              </div>
            </div>
          </div>
          <div className={styles.reviews}>Reviews</div>
          <div className={styles.about}>
            <div className={`${styles.biocontainer} ${styles.div4}`}>
              <p className="mt-1">{/* About <span>{user.name}</span> */}</p>

              <div className={styles.grid2}>
                <div className="flex">
                  <BsCheck size={"2em"} className={styles.tickIcon} />
                  <p>Born in the 90s</p>
                </div>
                <div className="flex">
                  <BsCheck size={"2em"} className={styles.tickIcon} />
                  <p>Favorite hobby:</p>
                </div>
                <div className="flex">
                  <BsCheck size={"2em"} className={styles.tickIcon} />
                  <p>Favorite hobby:</p>
                </div>
                <div className="flex">
                  <BsCheck size={"2em"} className={styles.tickIcon} />
                  <p>Favorite hobby:</p>
                </div>
                <div className="flex">
                  <BsCheck size={"2em"} className={styles.tickIcon} />
                  <p>Favorite hobby:</p>
                </div>
                <div className="flex">
                  <BsCheck size={"2em"} className={styles.tickIcon} />
                  <p>Favorite hobby:</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p>View Services available in a row</p>
      </div>
      <div>
        <p>View Purchase History in a row</p>
      </div>
      <Footer />
    </>
  );
};

//   return (
//     <>
//       <br className="mt-10" />
//       <Navbar />
//       <div className="wrapper">
//         <Login />
//       </div>
//       <Footer />
//     </>
//   );
// };

export default Profile;
