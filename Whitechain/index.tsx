import React from "react";
import MainContainer from "../components/Index/MainContainer";
import GridContainer from "../components/Index/GridContainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RotatingGrid from "../components/Index/RotatingGrid";
import Hero from '../components/Index/Hero';

const Index = () => {
  return (
    <>
      <br className="mt-10" />
      <Navbar />
      <div className="wrapper">
        <Hero />
        <br className="mt-10" />
        <MainContainer />
        <br className="mb-3" />
        <div className="">
          <GridContainer />
        </div>
        <br className="mb-3" />
        <RotatingGrid />
        <br className="mt-10" />
      </div>
      <Footer />
    </>
  );
};

export default Index;
