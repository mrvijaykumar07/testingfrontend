import React from "react";
import Logo from "../../assets/images/fabicon.png";
import { Link } from "react-router-dom";
const DownloadAppBanner = () => {
  return (
    <>
      {/* Add keyframes directly */}
      <style>
        {`
          @keyframes shine {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

      <div className="relative mx-auto max-w-3xl md:rounded-4xl mt-4 md:my-5 md:mt-10 px-4 py-3 bg-[#FAF7F0] shadow-lg flex items-center justify-between overflow-hidden">
        {/* Glass Shine Background */}
     <div
  className="absolute top-0 left-[-50%] w-[150%] h-full bg-gradient-to-r from-transparent via-[#00CFC8] to-[#FCE38A] opacity-30 pointer-events-none"
  style={{ animation: "shine 2.8s infinite linear" }}
></div>


        {/* Text Section */}

<Link  to="/admin">
        <div className="flex flex-col justify-center items-center z-20">
          <p className="text-sm font-semibold text-[#1E1E1E]">
            Discover better choices with StudyNest app!
          </p>

     

          <div className="flex items-center gap-2 text-xs text-gray-600 mt-0.5">
            <span>⭐ 4.2</span>
            <span className="text-gray-400">|</span>
            <span>Download app</span>
          </div>
        </div>
</Link>
        {/* Icon Section */}
        {/* <div className="z-10 ml-2 cursor-pointer hover:opacity-90 transition-all">
          <div className="w-10 h-10 pt-1 flex items-center justify-center bg-white rounded-lg shadow">
            <img
              alt="App Logo"
              src={Logo}
              className="w-8 h-8 object-contain"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DownloadAppBanner;
