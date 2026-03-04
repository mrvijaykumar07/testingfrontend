import React from "react";
import { Link } from "react-router-dom";
import L1 from "../../../assets/images/Libraries/10.jpg";
import L2 from "../../../assets/images/Libraries/3.jpg";
import L3 from "../../../assets/images/Libraries/2.jpg";
import L4 from "../../../assets/images/Libraries/4.jpg";

const ImageCard = () => {
  return (
    <div className="flex flex-col rounded-2xl  overflow-hidden md:w-2xl">
      {/* Left Image Gallery */}

<div className="w-full overflow-hidden">
  <Link to="https://city-central-library-1088202356152.asia-south1.run.app/">
  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 gap-2">
    {[L1, L2, L3, L4, L1,L2,L3,L4].map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Image ${index + 1}`}
        className="min-w-[90%] h-52 object-cover flex-shrink-0 snap-start rounded-lg"
      />
    ))}
  </div>
  </Link>
</div>




      {/* Right Content */}
      <div className="flex flex-col justify-between p-4 md:w-3xl w-full">
        <div className="flex  ">
          <span className="text-sm  text-blue-800 px-1 py-1 rounded">
            Library
          </span>
          <div className="flex  md:w-fit items-center text-[rgb(100,122,151)] bg-gradient-to-b from-[rgb(239,245,251)] to-[rgb(255,255,255)] px-[2px] py-[6px] rounded">
            <div className="text-sm">
              <b>Get ₹100</b> off on <b>Flat 10% off</b>
            </div>
          </div>
        </div>

        <div className="mt-2   md:hidden">
          <h2 className="text-xl font-semibold text-gray-800">
            <a
              href="https://www.goibibo.com/hotels/sm-hives-hotel-in-bhubaneshwar-8300829486532592022/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              City Central Library
            </a>
          </h2>
          <p className="text-gray-600 mt-1">infocity</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
