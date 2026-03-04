import React from "react";
import runnerGif from "../assets/images/boy-running.gif"; // ✅ Make sure path is correct

const LoaderBoyRunning = ({ loaderMsg = "Loading..." }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center mt-56 mb-24">
      <p className="text-center mb-6 text-gray-700 font-semibold tracking-wide text-sm md:text-base">
        {loaderMsg}
      </p>

      <div className="relative w-[90%] max-w-xl h-12 bg-gray-200 rounded-full shadow-inner overflow-hidden">
        <img
          src={runnerGif}
          alt="Loading..."
          className="h-10 animate-runner z-10"
          style={{ position: "absolute", bottom: "2px", left: "-50px" }}
        />
        <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-blue-600 animate-progress-bar rounded-full blur-sm opacity-80" />
      </div>
    </div>
  );
};

export default LoaderBoyRunning;
