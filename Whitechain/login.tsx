import React, { useState } from "react";
import LoginForm from "../components/Register/LoginForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LoginFormProps {
  onLoginSuccess: (email: string, password: string) => void;
  initialEmail?: string;
  onEmailChange: (email: string) => void;
}

const Login = () => {
  const [userEmail, setUserEmail] = useState("");


  const handleLoginSuccess = (email) => {
    setUserEmail(email);
  };

  console.log(userEmail)

  return (
    <>
      <br className="mt-10" />
      <Navbar />
      <div className="wrapper">
        <LoginForm
          onEmailChange={setUserEmail}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
      <Footer />
    </>
  );
};

export default Login;
