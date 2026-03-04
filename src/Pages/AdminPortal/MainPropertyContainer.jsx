import React from "react";
import MyPropertiesComponent from "./MyPropertiesComponent";


const MainPropertyContainer = () => {
  // Change this to true or false manually to test
  const hasProperties = true; // set true to show MainDashboard

  return (
    <div className="w-full px-4 py-6 md:px-4 lg:px-10 max-w-5xl">
      <MyPropertiesComponent />
      
    </div>
  );
};

export default MainPropertyContainer;
