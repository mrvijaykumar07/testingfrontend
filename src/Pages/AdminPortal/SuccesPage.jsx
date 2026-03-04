import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center animate-fade-in">
        <CheckCircle2 size={70} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Success!</h1>
        <p className="text-gray-600 text-md mb-8">
          Your property listing has been submitted successfully. We’ll review it and get back to you soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/admin")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/onboarding")}
            className="border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium px-5 py-2 rounded-full transition"
          >
            Add Another Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
