import React, { Fragment } from "react";
import Card from "../components/Card";
import NavBar from "../components/navbar";

import { useState } from "react";
// const screenfull = require("screenfull");

const HomePage = () => {
  return (
    <Fragment>
      <NavBar />
      {/* <div className="bg-white py-4 px-5 " style={{ minHeight: "90vh" }}> */}
      <Card />
      {/* </div> */}
    </Fragment>
  );
};

export default HomePage;
