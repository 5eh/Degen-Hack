import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Settings.module.css";
import Link from "next/link";

const DisplayOptions = [
  {
    title: "Account & Privacy",
    icon: "",
    description: "Change your account settings and edit your profile",
    id: "account-privacy",
    options: [
      { title: "Edit Profile", id: "edit-profile", form: "text" },
      { title: "Change Password", id: "change-password", form: "password" },
      { title: "Privacy Settings", id: "privacy-settings", form: "checkbox" },
    ],
  },
  {
    title: "Safety & Security",
    icon: "",
    description: "Secure your account with 2FA and other security features",
    id: "safety-security",
    options: [
      { title: "Enable 2FA", id: "enable-2fa", form: "toggle" },
      { title: "Security Alerts", id: "security-alerts", form: "checkbox" },
      { title: "Login History", id: "login-history", form: "text-display" },
    ],
  },
  {
    title: "Policies & Reporting",
    icon: "",
    description: "Report violations and access our policies",
    id: "policies-reporting",
    options: [
      {
        title: "Report a Violation",
        id: "report-violation",
        form: "text-area",
      },
      { title: "View Policies", id: "view-policies", form: "link" },
    ],
  },
  {
    title: "Messaging System",
    icon: "",
    description: "Moderate your messages and change your settings",
    id: "messaging-system",
    options: [
      { title: "Inbox Settings", id: "inbox-settings", form: "dropdown" },
      { title: "Message Filtering", id: "message-filtering", form: "toggle" },
      { title: "Auto-Reply Setup", id: "auto-reply", form: "text-area" },
    ],
  },
  {
    title: "Accessibility",
    icon: "",
    description: "Adjust your accessibility settings and preferences",
    id: "accessibility",
    options: [
      { title: "Font Size", id: "font-size", form: "slider" },
      { title: "Contrast Mode", id: "contrast-mode", form: "toggle" },
      { title: "Screen Reader Options", id: "screen-reader", form: "radio" },
    ],
  },
  {
    title: "Notifications",
    icon: "",
    description: "Change your notification settings",
    id: "notifications",
    options: [
      {
        title: "Email Notifications",
        id: "email-notifications",
        form: "checkbox",
      },
      {
        title: "Push Notifications",
        id: "push-notifications",
        form: "checkbox",
      },
      {
        title: "Customize Notification Sound",
        id: "notification-sound",
        form: "dropdown",
      },
    ],
  },
  {
    title: "Trust & Verification",
    icon: "",
    description: "Verify your account and adjust trust options",
    id: "trust-verification",
    options: [
      {
        title: "Account Verification",
        id: "account-verification",
        form: "button",
      },
      { title: "Trusted Devices", id: "trusted-devices", form: "list" },
      {
        title: "Login Verification Methods",
        id: "login-verification",
        form: "radio",
      },
    ],
  },
];
const Settings = () => {
  // Connect useUser from MongoDB

  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    // Convert hex color to RGB
    const rgbColor = hexToRGB(newColor);
    // Update CSS variable
    document.documentElement.style.setProperty("--button-color", rgbColor);
    // Save to local storage
    localStorage.setItem("buttonColor", rgbColor);
  };

  const hexToRGB = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  useEffect(() => {
    const storedColor = localStorage.getItem("buttonColor");
    if (storedColor) {
      document.documentElement.style.setProperty("--button-color", storedColor);
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value.toLowerCase());

    const foundOption = DisplayOptions.find(
      (option) =>
        option.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        (option.options &&
          option.options.some((subOption) =>
            subOption.title.toLowerCase().includes(e.target.value.toLowerCase())
          ))
    );

    setSelectedOption(foundOption || null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Navbar />
      <div
        className="wrapper"
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}
      >
        <div>
          {DisplayOptions.map((option) => (
            <li key={option.id} onClick={() => handleOptionClick(option)}>
              <div className={styles.container}>
                <ul className={styles.title}>{option.title}</ul>
                <ul className={`${styles.description} white-300`}>
                  {option.description}
                </ul>
              </div>
            </li>
          ))}
          <div className="break"></div>
          <div className="center">
            <Link href="/api/auth/logout" className="center">
              Log Out
            </Link>
          </div>
          <div className="break"></div>
          <div className="center">
            Set system color
            <input
              type="color"
              className="center"
              onChange={handleColorChange}
            />
          </div>
          <div className="break"></div>
        </div>
        <div>
          <div className={styles.selected}>
            <input
              type="text"
              placeholder="Search settings"
              value={inputValue}
              onChange={handleInputChange}
              className={styles.input}
            />
            {selectedOption && (
              <>
                <h2 className="white-700">{selectedOption.description}</h2>
                <p className="white-500">
                  Adjust your <span className="">{selectedOption.title}</span>
                </p>
                {selectedOption.options &&
                  selectedOption.options.map((option) => (
                    <li key={option.id}>
                      <div className={styles.option}>
                        <ul className={styles.title}>{option.title}</ul>
                        <ul className={`${styles.description} white-900`}>
                          <h1>{option.description}</h1>
                        </ul>
                      </div>
                    </li>
                  ))}
                <div className="center">
                  <p className="mt-3">Was this helpful?</p>
                  <div className="flex gap-2 mt-1">
                    <button className="secondaryfunctionbutton" type="submit">
                      Helpful
                    </button>
                    <button className="functionbutton" type="submit">
                      Not Helpful
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

};

export default Settings;
