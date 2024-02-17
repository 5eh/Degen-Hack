import React from "react";
import styles from "../styles/Register.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/Register/RegisterForm";


const Register = () => {
  return (
    <>
      <br className="mt-10" />
      <Navbar />
      <div className="wrapper">
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
};

export default Register;
