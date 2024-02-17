// components/Register/RegisterForm.tsx

import React, { useState } from "react";
import styles from "../../styles/Register.module.css";
import { toast } from "react-hot-toast";
import Link from "next/link";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      const data = await response.json();

      if (data.redirectUrl) {
        toast.success("Account created. Please wait for a redirect.");
        setTimeout(() => (window.location.href = data.redirectUrl), 3000); // Redirect after 3 seconds
      } else {
        toast.success("Account created. Redirecting to home.");
        setTimeout(() => (window.location.href = "/"), 3000); // Redirect to home if no specific page is set
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message || "An error occurred during registration.");
    }
  };

  return (
    <div className={styles.wrapper}>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className={`${styles.submitButton} center functionButton`}
          >
            <h1>Submit</h1>
          </button>
        </form>

      <div className="break"></div>
      <Link href="/login">
        <p>Already have an account? Log in instead</p>
      </Link>
      <div className="break"></div>

      <button className={`${styles.googleLoginButton} mt-2`}>
        Continue with Google
      </button>
    </div>
  );
};

export default RegisterForm;
