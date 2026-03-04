import React from "react";
import FullCard2 from "./Card/DemoCards/FullCard2";
import FullCard3 from "./Card/DemoCards/FullCard3";
import FullCard from "./Card/FullCard";
import FullCard4 from "./Card/DemoCards/FullCard4";
import FullCard5 from "./Card/DemoCards/FullCard5";

const PopularLibraries = () => {
  return (
    <>
      <div className="  items-center justify-between py-12 gap-2 pt-10 z-0 md:px-20">
    <h2 className="md:text-2xl text-xl font-bold text-center mb-10 text-gray-700">
  Explore Bhubaneswar's Best Libraries
</h2>

        <FullCard/>
       <FullCard2/>
       <FullCard3/>
       <FullCard4/>
       <FullCard5/>
 
      {" "}
      </div>
    </>
  );
};

export default PopularLibraries;
