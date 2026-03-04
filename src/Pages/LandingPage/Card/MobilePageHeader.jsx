import React from "react";
import { useNavigate } from "react-router-dom";

const MobilePageHeader = ({ onEditClick }) => {
  const navigate = useNavigate(); // ✅ Initialize navigate here

  const handleBack = () => {
    navigate("/"); // ✅ Now this works
  };

  return (
    <div id="PageHeader" className="w-full px-4 pt-3 mt-8 md:px-36">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={handleBack} // ✅ Move click handler to button
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#2274E0"
              width="24"
              height="24"
              className="text-blue-600"
            >
              <path d="M15.063 7.04H3.624a.962.962 0 0 0 0 1.925h11.44a.962.962 0 0 0 0-1.925zM8.018.21a.964.964 0 0 0-.642.26L.543 6.8a1.608 1.608 0 0 0 0 2.407l6.833 6.33a.963.963 0 1 0 1.27-1.446L3.513 9.257a.168.168 0 0 1 0-.29l6.837-5.083A.964.964 0 0 0 8.018.21z" />
            </svg>
          </button>

          {/* Title & SubHeader */}
          <div>
            <p className="text-lg font-semibold text-gray-900">Bhubaneshwar</p>
            <p className="text-sm text-gray-600">
              from 14 June, 3 months &nbsp;
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={onEditClick}
              >
                Edit
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePageHeader;
