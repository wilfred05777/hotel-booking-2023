import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./home.scss";
import React from "react";
import Featured from "../../components/featured/Featured";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
      </div>
    </div>
  );
};

export default Home;
