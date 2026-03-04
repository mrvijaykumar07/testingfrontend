import React from "react";
import { Outlet, useParams, useLocation } from "react-router-dom";
import OnboardingTabs from "./OnboardingTabs";

const OnboardingPage = () => {
  const propertyName = "Sakshar Palace"; // Or fetch from API or params

  return (
    <div className="min-h-screen p-4">
      <OnboardingTabs propertyName={propertyName} />
      <div className="mt-6">
        <Outlet /> {/* This renders the step content */}
      </div>
    </div>
  );
};

export default OnboardingPage;
