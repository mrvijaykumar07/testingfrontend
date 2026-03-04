import React from "react";
import L1 from "../../../../assets/images/Libraries/10.jpg";
import L2 from "../../../../assets/images/Libraries/1.jpg";
import L3 from "../../../../assets/images/Libraries/2.jpg";
import L4 from "../../../../assets/images/Libraries/3.jpg";
import { MdLibraryBooks, MdWifi, MdBolt } from "react-icons/md";

const FullCard5 = () => {
  return (
    <div className=" max-w-3xl m-auto rounded-2xl shadow-xl flex flex-col md:flex-row md:mx-32 mx-3 my-5  ">
      <div className="flex flex-col rounded-2xl  overflow-hidden md:w-2xl">
        {/* Left Image Gallery */}

        <div className="w-full overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 gap-2">
            {[L1, L2, L3, L4, L1, L2, L3, L4].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                className="min-w-[90%] h-52 object-cover flex-shrink-0 snap-start rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-between p-4 md:w-3xl w-full">
          <div className="flex  ">
            <span className="text-sm  text-blue-800 px-1 py-1 rounded">
              Library
            </span>
            <div className="flex  md:w-fit items-center text-[rgb(100,122,151)] bg-gradient-to-b from-[rgb(239,245,251)] to-[rgb(255,255,255)] px-[2px] py-[6px] rounded">
              <div className="text-sm">
                <b>Get ₹500</b> off on <b>Flat 10% off</b>
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
                Swaraj Library
              </a>
            </h2>
            <p className="text-gray-600 mt-1">Master Canteen</p>
          </div>
        </div>
      </div>

      <div className="flex md:flex-col  overflow-hidden w-full max-w-5xl mx-auto rounded-2xl ">
        <div className="mt-2 px-4  hidden md:block">
          <h2 className="text-xl font-semibold text-gray-800">
            <a
              href="https://www.goibibo.com/hotels/sm-hives-hotel-in-bhubaneshwar-8300829486532592022/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              Swaraj Library
            </a>
          </h2>
          <p className="text-gray-600 mt-1">Master Canteen</p>
        </div>

        {/* Left Side - 60% */}
        <div className="flex ">
          <div className="w-[60%] p-4 space-y-2">
            {/* Rating Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1 text-xl font-bold text-white bg-green-700 px-3 py-1 rounded-lg   ">
                <span>4.9</span>
                <p className=" text-sm">/5</p>
              </div>
              <div className="text-sm text-gray-600">9,108 Reviews</div>
            </div>

            {/* Library Features */}
            <div className="flex flex-col gap-1 mt-2">
              {/* Quiet Study Area */}
              <div className="flex items-center gap-2">
                <MdLibraryBooks className="w-6 h-6 text-blue-700" />
                <span className="text-sm text-black">
                  Quiet Study Area
                  <span className="hidden md:inline"> Individual Seating</span>
                </span>
              </div>

              {/* Free Wi-Fi */}
              <div className="flex items-center gap-2">
                <MdWifi className="w-6 h-6 text-gray-700" />
                <span className="text-sm text-gray-700">
                  Free Wi-Fi Available
                </span>
              </div>

              {/* AC & Power Backup */}
              <div className="flex items-center gap-2">
                <MdBolt className="w-6 h-6 text-yellow-600" />
                <span className="text-sm text-gray-700">
                  AC & Power Backup
                  <span className="hidden md:inline"> for All Study Hours</span>
                </span>
              </div>

              {/* Open Hours - Only Desktop */}
              <div className="hidden md:flex items-center gap-2">
                <span className="px-1 text-sm text-blue-600">
                  Open 7AM - 8PM
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - 40% */}
          <div className="w-[50%] p-4 text-right space-y-2 ">
            <p className="text-gray-500 line-through text-sm">₹5000/month</p>
            <p className="text-xl font-semibold text-green-700">₹3000/month</p>
            <p className="text-sm text-gray-600">+ 299 Registration Fees</p>
            <div className="hidden md:flex justify-end items-center text-xs text-gray-400 gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 ">
                🔒 Secure Payment
              </span>
            </div>

            <div className="inline-flex items-center px-3 py-1 border border-amber-700 text-amber-600 rounded-xl  hover:bg-amber-600 hover:text-white">
              <span>Join Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCard5;
