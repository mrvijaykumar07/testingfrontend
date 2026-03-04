// PlannerPage.jsx
import React from "react";
import Planner from "./Planner";


import Navbar from "../../Pages/LandingPage/Navbar";
import BottomNavbar from "../../Pages/LandingPage/BottomNavbar";

const PlannerPage = () => {
  return (
    <>
      <Navbar/>
      <Planner />
      <BottomNavbar/>
    </>
  );
};

export default PlannerPage;
