import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
   { id: 1, label: "Property", path: "type" },
  { id: 2, label: "Basic Info", path: "basic-info" },
  { id: 3, label: "Amenities", path: "amenities" },
  { id: 4, label: "Photos", path: "photos" },
  { id: 5, label: "Final ", path: "review" },
];

const OnboardingTabs = ({ propertyName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepIndex = steps.findIndex((step) =>
      location.pathname.includes(step.path)
    );
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, [location.pathname]);

  const handleStepChange = (index) => {
    setCurrentStep(index);
    navigate(`/onboarding/${steps[index].path}`);
  };

  return (
    <div className="bg-white shadow px-4 py-4 rounded-md">
  

      <div className="relative flex justify-between items-center overflow-x-auto pb-2">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 z-0" />

        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10 flex-1 text-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStepChange(index)}
              className={`w-10 h-10 rounded-full border-1 text-sm font-semibold transition-colors duration-300 ${
                index === currentStep
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {step.id}
            </motion.button>
            <div className="mt-1 text-xs sm:text-sm font-medium text-gray-700">
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingTabs;
