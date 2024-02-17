// components/Register/LoginForm.tsx

import React, { useState } from "react";
import styles from "../../styles/Register.module.css";
import Link from "next/link";

interface LoginFormProps {
  onLoginSuccess: (email: string, password: string) => void;
  initialEmail?: string;
  onEmailChange: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  initialEmail = "",
  onEmailChange,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/Verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isAuthenticated", "true");
        onLoginSuccess(email, password);
        setError("Success!");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during verification.");
    }
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onEmailChange(newEmail);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleEmailInput}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={`${styles.submitButton} center`}>
          <h3>Login</h3>
        </button>
      </form>
      <div className="break"></div>
      <Link href="/register">
        <p>
          Do not have an account? <span>Register</span>{" "}
        </p>
      </Link>
      <div className="break"></div>
      {/* Google login button, add functionality if intended to use */}
      <button className={`${styles.googleLoginButton} mt-2`}>
        Continue with Google
      </button>
      <div className={styles.break}></div>
    </div>
  );
};

export default LoginForm;
