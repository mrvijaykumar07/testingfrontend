import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewStep = () => {
  const navigate = useNavigate();
  const { PropertyType, basicInfo, amenities, photos, rules } = useSelector(
    (state) => state.onboarding
  );
  const [agreed, setAgreed] = useState(false);

  const handleFinalSubmit = () => {
    if (!agreed) {
      alert("Please agree to the terms before continuing.");
      return;
    }
    console.log("📦 Submitting All Data:", { PropertyType, basicInfo, amenities, photos, rules });
    navigate("/onboarding/success");   

  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:pt-8 space-y-5 font-[Inter,sans-serif]">
  
      <p className="text-gray-600 text-sm">Please verify all your details before submitting.</p>



      {/* === Basic Info === */}
      <div className="bg-white shadow-sm border rounded-xl p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
           <div><span className="font-medium">Type:</span> {PropertyType || "—"}</div>
          <div><span className="font-medium">Name:</span> {basicInfo.propertyName || "—"}</div>
          <div><span className="font-medium">Phone:</span> {basicInfo.mobile_custom || "—"}</div>
          <div><span className="font-medium">WhatsApp:</span> {basicInfo.whatsapp_custom || "—"}</div>
          <div><span className="font-medium">Email:</span> {basicInfo.email_custom || "—"}</div>
          <div className="sm:col-span-2">
            <span className="font-medium">Location:</span>{" "}
            {`${basicInfo.area_input || ""}, ${basicInfo.city_input || ""}, ${basicInfo.state_input || ""}`.trim() || "—"}
          </div>
        </div>
      </div>

      {/* === Amenities === */}
      <div className="bg-white shadow-sm border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Amenities</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {Array.isArray(amenities)
            ? amenities.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-300">
                  {item}
                </span>
              ))
            : Object.entries(amenities).map(
                ([key, value]) =>
                  value && (
                    <span key={key} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-300">
                      {key}
                    </span>
                  )
              )}
        </div>
      </div>

      {/* === Terms Agreement === */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
        <p className="text-sm text-gray-700 mb-3">
          By proceeding, you confirm that you have read and agreed to our
          <a href="/terms" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">
            Terms & Conditions
          </a>
          and
          <a href="/community-guidelines" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">
            Community Guidelines
          </a>.
        </p>
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-gray-800">I agree to the Terms & Conditions</span>
        </label>
      </div>

      {/* === Submit Button === */}
      <div className="pt-6 text-right">
        <button
          onClick={handleFinalSubmit}
          disabled={!agreed}
          className={`px-6 py-3 text-white font-semibold rounded-full shadow transition-all ${
            agreed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Listing
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
