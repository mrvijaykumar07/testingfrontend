// Pages/AdminPortal/steps/Facilities.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ✅ Correct action import
import { saveFacilities } from "../../../features/onboarding/onboardingSlice";

const allFacilities = [
  "Wi-Fi",
  "Air Conditioning",
  "Drinking Water",
  "Parking",
  "Library",
  "Cafeteria",
  "Restrooms",
  "Study Rooms",
  "Security",
];

const Facilities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Load from Redux for back navigation
  const storedFacilities = useSelector(
    (state) => state?.onboarding?.facilities || []
  );

  // ✅ Set initial selected state from Redux
  const [selectedFacilities, setSelectedFacilities] = useState(storedFacilities);

  const handleToggle = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((a) => a !== facility)
        : [...prev, facility]
    );
  };

  const handleContinue = () => {
    dispatch(saveFacilities(selectedFacilities)); // ✅ Save to Redux
    navigate("/onboarding/nearby"); // ✅ Next page
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Select Facilities</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {allFacilities.map((facility) => (
          <label key={facility} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFacilities.includes(facility)}
              onChange={() => handleToggle(facility)}
              className="accent-blue-500"
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Facilities;
