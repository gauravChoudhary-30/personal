import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar title="EzyFee" showMenuIcon={true} />
      <Footer />
    </>
  );
};


export default Home;
