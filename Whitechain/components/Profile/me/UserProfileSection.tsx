// components/Profile/me/UserProfileSection.tsx

import React, { useState, useEffect } from "react";
import {
  BsBalloon,
  BsBriefcase,
  BsCalendar,
  BsStarFill,
  BsGlobe2,
} from "react-icons/bs";
import { FaGolfBall, FaThumbsUp, FaBrain } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import Purchases from "./purchases";
import styles from "../../../styles/Profile.module.css";
import EditProfile from "./editProfile";
import { EditProfileButton } from "./EditProfileAttribute";
import { SquareLoader } from '../../Loading';
import Link from "next/link";

interface User {
  email: string;
  phone: string;
  name: string;
  amountOfReviews: number;
  rating: number;
  location: string;
  verifications: {
    phone: boolean;
    email: boolean;
    region: boolean;
    passport: boolean;
  };
  profilePicture: string;
  backgroundBanner: string;
  badges: string[];
  bio: string;
  about: {
    born: string;
    hobbies: string[];
    funFact: string;
    raisedIn: string;
    worksAt: string;
    years: number;
  };
  media: {
    mediaLinkOne: string;
    mediaLinkTwo: string;
    mediaLinkThree: string;
  };
}

interface UserProfileSectionProps {
  email: string;
}

interface ContactFieldConfig {
  email: { type: "text"; value: string };
  phone: { type: "text"; value: string };
  name: { type: "text"; value: string };
  location: { type: "text"; value: string };
  bio: { type: "textarea"; value: string };
  born: { type: "text"; value: string };
  hobbies: { type: "text"; value: string[] };
  funFact: { type: "text"; value: string };
  raisedIn: { type: "text"; value: string };
  worksAt: { type: "text"; value: string };
  years: { type: "number"; value: number };
}

const UserProfileSection: React.FC<UserProfileSectionProps> = () => {
  const [selectedOption, setSelectedOption] = useState("Purchases");
  const [userData, setUserData] = useState<User | null>(null);
  const [contactFieldConfig, setContactFieldConfig] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const fetchUserData = async () => {
    if (!email) return;

    try {
      const url = `/api/auth/RetrieveLoggedInUserData?email=${encodeURIComponent(
        email
      )}`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      if (response.ok) {
        setUserData(data.user);
      } else {
        throw new Error(data.message || "Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = async (formData) => {
    try {
      const response = await fetch("/api/data/editProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || userData.email,
          phone: formData.phone || userData.phone,
          name: formData.name || userData.name,
          location: formData.location || userData.location,
          bio: formData.bio || userData.bio,
          born: formData.born || userData.about.born,
          hobbies: formData.hobbies || userData.about.hobbies,
          funFact: formData.funFact || userData.about.funFact,
          raisedIn: formData.raisedIn || userData.about.raisedIn,
          worksAt: formData.worksAt || userData.about.worksAt,
          years: formData.years || userData.about.years,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await fetchUserData();
    } catch (error) {
      console.error(
        "Error:",
        error.message || "An error occurred while updating the profile"
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email]);

  useEffect(() => {
    if (userData) {
      const newFieldConfig = {
        email: { type: "text", value: userData.email },
        phone: { type: "number", value: userData.phone },
        name: { type: "text", value: userData.name },
        location: { type: "text", value: userData.location },
        bio: { type: "textarea", value: userData.bio },
        born: { type: "text", value: userData.about.born },
        hobbies: { type: "text", value: userData.about.hobbies.join(", ") },
        funFact: { type: "text", value: userData.about.funFact },
        raisedIn: { type: "text", value: userData.about.raisedIn },
        worksAt: { type: "text", value: userData.about.worksAt },
        years: { type: "number", value: userData.about.years },
      };
      setContactFieldConfig(newFieldConfig);
    }
  }, [userData]);

  const handlePurchasesClick = () => {
    setSelectedOption("Purchases");
  };

  const handleSellingClick = () => {
    setSelectedOption("Selling");
  };

  const testFunction = () => {
    alert("Hello");
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (userData) {
    return (
      <div className="wrapper">
        {userData ? (
          <>
            <div className="flex">
              <button
                className={`${styles.option} center ${
                  selectedOption === "Purchases" ? styles.purchases : ""
                }`}
                onClick={handlePurchasesClick}
              >
                Purchases
              </button>
              <button
                className={`${styles.option} center ${
                  selectedOption === "Selling" ? styles.selling : ""
                }`}
                onClick={handleSellingClick}
              >
                Services
              </button>
            </div>

            <div
              className={styles.banner}
              style={{ backgroundImage: `url(${userData.backgroundBanner})` }}
            >
              <div className={styles.center}>
                <img
                  className={styles.profilepicture}
                  src={userData.profilePicture}
                  alt="Profile Picture"
                />
              </div>
            </div>

            <div className={`${styles.gap} flex`}>
              <div className={styles.left}>
                <button className={styles.option} onClick={testFunction}>
                  VIEW PROFILE
                </button>
                <button className={styles.option} onClick={testFunction}>
                  MANAGE ACCOUNT
                </button>
                <button className={styles.option} onClick={testFunction}>
                  CREATE PAGES
                </button>
                <EditProfile />
              </div>

              <div className={styles.right}>
                <EditProfileButton
                  title="CONTACT"
                  onSave={handleSave}
                  fieldConfig={{
                    email: { type: "text", value: userData.email },
                    phone: { type: "number", value: userData.phone },
                  }}
                />
                <EditProfileButton
                  title="PROFILE"
                  onSave={handleSave}
                  fieldConfig={{
                    profilePicture: {
                      type: "file",
                      value: userData.profilePicture,
                    },
                  }}
                />
                <EditProfileButton
                  title="BIOGRAPHY"
                  onSave={handleSave}
                  fieldConfig={{
                    bio: { type: "text", value: userData.bio },
                  }}
                />
              </div>
            </div>

            <div className="center mt-2">
              <h1 className="primary-font-extralight white-700">
                {userData.name}
              </h1>
              <h4 className="primary-font-extralight white-900">
                {userData.rating} <BsStarFill />
              </h4>
              <h4 className="primary-font-extralight white-500">
                {userData.location}
              </h4>

              <div className="flex center">
                {userData.badges?.length > 0 && (
                  <>
                    <button className={`badge`}>{userData.badges[0]}</button>
                    {userData.badges[1] && (
                      <button className={`badge`}>{userData.badges[1]}</button>
                    )}
                    {userData.badges[2] && (
                      <button className={`badge`}>{userData.badges[2]}</button>
                    )}
                  </>
                )}
              </div>
              <div className="break"></div>
              <p className="mt-1 mb-1 primary-font-light white-900">
                {userData.bio ?? "Bio not available"}
              </p>
            </div>

            <div className="mt-5">
              {selectedOption === "Purchases" && (
                <div>
                  <Purchases />
                  <div>
                    <p>What pals say about you:</p>
                    <div className="flex ">
                      <div
                        className={`${styles.container} center space-evenly`}
                      >
                        <FaThumbsUp
                          size={"1em"}
                          className="ml-1 mr-1 aboutIcon"
                        />
                        <p className="mt-1 mb-1">Motivational</p>
                        <span>Pals think you're a team lifter</span>
                      </div>
                      <div
                        className={`${styles.container} center space-evenly`}
                      >
                        <BsCalendar
                          size={"1em"}
                          className="ml-1 mr-1 aboutIcon"
                        />
                        <p className="mt-1 mb-1">Top Rated Player</p>
                        <span>Youre rated highly by 95% of your groups</span>
                      </div>
                      <div
                        className={`${styles.container} center space-evenly`}
                      >
                        <FaBrain size={"1em"} className="ml-1 mr-1 aboutIcon" />
                        <p className="mt-1 mb-1">Passionate</p>
                        <span>People think youre very passionaite about your hobbies</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedOption === "Selling" && (
                <div className={`${styles.container} center space-evenly`}>
                  <p>FEATURED LISTINGS</p>
                  <p>Services available</p>
                  <p>OTHER PRODUCTS</p>
                  <p>What guests say: * Value * Top-rated * Flexible</p>
                </div>
              )}
            </div>
            <div className="pr-2 pl-2 mt-2">
              <h3 className="primary-font-light">
                About{" "}
                <span className="primary-font-bold"> {userData.name}</span>
              </h3>
              <div className="flex">
                <div className={`mt-2`}>
                  <div className={`${styles.container} flex align-center`}>
                    <span className="mr-1">
                      <BsBalloon size={"2em"} className="aboutIcon" />
                    </span>
                    <p className="left">
                      Born in the{" "}
                      {userData.about?.born ?? "Enter year you're born"}
                    </p>
                  </div>
                  <div className={`${styles.container} flex align-center`}>
                    <span className="mr-1">
                      <BsBriefcase size={"2em"} className="aboutIcon" />
                    </span>
                    <p className="left">
                      Works at{" "}
                      {userData.about?.worksAt ?? "Where do you work at?"}
                    </p>
                  </div>
                  <div className={`${styles.container} flex align-center`}>
                    <span className="mr-1">
                      <GoLightBulb size={"2em"} className="aboutIcon" />
                    </span>
                    <p className="left">
                      Fun Fact {userData.about ? userData.about.funFact : ""}
                    </p>
                  </div>
                  <div className={`${styles.container} flex align-center`}>
                    <span className="mr-1">
                      <BsGlobe2 size={"2em"} className="aboutIcon" />
                    </span>
                    <p className="left">
                      Raised in {userData.about ? userData.about.raisedIn : ""}
                    </p>
                  </div>
                  <div className={`${styles.container} flex align-center`}>
                    <span className="mr-1">
                      <FaGolfBall size={"2em"} className="aboutIcon" />
                    </span>
                    <p className="left">
                      Hobbies include{" "}
                      {userData.about ? userData.about.hobbies : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
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
      </div>
    );
  };
};
export default UserProfileSection;
