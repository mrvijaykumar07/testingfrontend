import React from "react";



import ServiceSelector from "./ServiceSelector";

import PremiumTools from "./PremiumTools";

import ToolsVertical from "./ToolsVertical";
import Navbar from "./Navbar";
import BottomNavbar from "./BottomNavbar";


const Main_Landing = () => {
  return (
    <>
      <div className=" md:h-dvh items-center justify-between py-12 gap-2 pt-10 z-0 md:px-20 max-w-4xl mx-auto">
        <Navbar/>
        
        {/* <DownloadAppBanner /> */}

        <ServiceSelector />
        <PremiumTools />
        <ToolsVertical />
        <footer/>
        <BottomNavbar/>
      </div>
    </>
  );
};

export default Main_Landing;
