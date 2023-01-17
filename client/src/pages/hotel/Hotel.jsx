import React from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./hotel.scss";
import List from "../list/List";

const Hotel = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
    </div>
  );
};

export default Hotel;
