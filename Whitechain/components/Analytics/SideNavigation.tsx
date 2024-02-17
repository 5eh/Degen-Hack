// components/Analytics/SideNavigation.tsx

import React from "react";
import styles from "../../styles/AnalyticsSideNavigation.module.css";

const SideNavigationOptions = [
  {
    title: "Overview",
    icon: "",
    id: "overview",
  },
  {
    title: "Sales",
    icon: "",
    id: "sales",
  },
  {
    title: "Messaging",
    icon: "",
    id: "messaging",
  },
  {
    title: "Trends",
    icon: "",
    id: "trends",
  },
  {
    title: "Marketing Effectiveness",
    icon: "",
    id: "marketing-effectiveness",
  },
  {
    title: "User Engagement",
    icon: "",
    id: "user-engagement",
  },
  {
    title: "Competitor Analysis",
    icon: "",
    id: "competitor-analysis",
  },
  {
    title: "Compliance and Legal",
    icon: "",
    id: "compliance-legal",
  },
  {
    title: "Alerts and Notification",
    icon: "",
    id: "alerts-notifications",
  },
];

const SideNavigation = () => {
  return (
    <div>
      {SideNavigationOptions.map((option, id) => (
        <div key={id} className={styles.container}>
          <ul className={styles.title}>{option.title}</ul>
        </div>
      ))}
    </div>
  );
};

export default SideNavigation;
