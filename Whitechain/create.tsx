// pages/create.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Create.module.css";
import {

  FaCamera,
  FaCameraRetro,
  FaChartLine,
  FaCog,
  FaGlassCheers,
  FaHeart,
  FaLightbulb,
  FaLock,
  FaMagic,
  FaMask,
  FaPaintBrush,
  FaPallet,
  FaPencilRuler,
  FaRegHandshake,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";

export const servicesData = [
  {
    title: "PHYSICAL SERVICES",
    items: [
      {
        icon: <FaRegHandshake className="maskIcon" />,
        text: "Team Strength Training",
      },
      {
        icon: <FaChartLine className="additionalIcon" />,
        text: "Group High-Intensity Interval Training (HIIT)",
      },
      { icon: <FaLightbulb className="dateIcon" />, text: "Idea Illumination" },
    ],
    id: "Nontraditional concepts",
  },
  {
    title: "CREATIVE WORKOUTS",
    items: [
      {
        icon: <FaMagic className="maskIcon" />,
        text: "Fun and Creative Workouts",
      },
      {
        icon: <FaPaintBrush className="additionalIcon" />,
        text: "Designed Visions",
      },
      {
        icon: <FaPencilRuler className="dateIcon" />,
        text: "Idea Illumination",
      },
    ],
    id: "creative",
  },
  {
    title: "STUDIO SESSIONS",
    items: [
      {
        icon: <FaCameraRetro className="maskIcon" />,
        text: "Bespoke Fitness Programs",
      },
      {
        icon: <FaPallet className="additionalIcon" />,
        text: "Yoga and Mindfulness Sessions",
      },
      { icon: <FaCog className="dateIcon" />, text: "Technical Services" },
    ],
    id: "studio",
  },
  {
    title: "PRIVATE ACTIVITIES",
    items: [
      {
        icon: <FaUserShield className="maskIcon" />,
        text: "Bespoke Fitness Programs",
      },
      {
        icon: <FaHeart className="additionalIcon" />,
        text: "Passionate Projects",
      },
      { icon: <FaLock className="dateIcon" />, text: "Secure Moments" },
    ],
    id: "private",
  },
  {
    title: "EVENT SERVICES",
    items: [
      {
        icon: <FaCamera className="maskIcon" />,
        text: "Fitness Event Hosting",
      },
      {
        icon: <FaUsers className="additionalIcon" />,
        text: "Community Workout Events",
      },
      {
        icon: <FaGlassCheers className="dateIcon" />,
        text: "Celebratory Snapshots",
      },
    ],
    id: "event",
  },
];


const Create = () => {
  const [customListing, setCustomListing] = useState("");


 const handleInputChange = (event) => {
   setCustomListing(event.target.value);
 };


  return (
    <>
      <br className="mt-10" />
      <Navbar />
      <div className="wrapper">
        <p>Choose your type of listing:</p>
        <div className={styles.grid}>
          {servicesData.map((service, id) => (
            <div className={styles.gridItem} key={service.title}>
              <h3>{service.title}</h3>
              <ul>
                {service.items.map((item, index) => (
                  <div className={styles.listItem} key={index}>
                    {item.icon}
                    <li>{item.text}</li>
                  </div>
                ))}
              </ul>
              <div className={styles.buttonbottom}>
                <Link
                  href={{
                    pathname: "/create/[...id]",
                    query: { id: [service.id] },
                  }}
                >
                  <button className="functionbutton" onClick={() => {}}>
                    Choose Service
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <legend>Specific Listing</legend>
          <input
            className={styles.input}
            value={customListing}
            onChange={handleInputChange}
          />
          <Link
            href={{
              pathname: `create/${customListing}`,
            }}
          >
            <button type="submit" className="functionbutton mt-1">
              {" "}
              Submit
            </button>
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Create;
