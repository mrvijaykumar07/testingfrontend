import React, { useState, useRef } from "react";
import Header from "./Header";
import AdminMenu from "./AdminMenu";
import MainPropertyContainer from "./MainPropertyContainer";
import BottomNavbar from "../LandingPage/BottomNavbar";

export default function Main_AdminDashboard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const hiddenInputRef = useRef(null);

  const handleInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // only digits

    if (value.length > 4) value = value.slice(0, 4);

    // Split into 4 boxes
    const arr = value.split("");
    while (arr.length < 4) arr.push("");

    setCode(arr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.join("") === "0000") {
      setIsUnlocked(true);
      setError("");
      setCode(["", "", "", ""]);
    } else {
      setError("Incorrect password. Please try again or contact admin.");
    }
  };

  const focusHiddenInput = () => {
    hiddenInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {!isUnlocked ? (
        <div className="flex-1 flex flex-col justify-center items-center p-6 relative">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Enter Admin Access Code
            </h2>

            {/* Hidden Input */}
            <input
              type="text"
              maxLength="4"
              ref={hiddenInputRef}
              value={code.join("")}
              onChange={handleInput}
              className="absolute opacity-0 pointer-events-none"
              inputMode="numeric"
            />

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              {/* Click area so user taps anywhere */}
              <div className="flex justify-between gap-4 mb-6" onClick={focusHiddenInput}>
                {code.map((digit, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-800 flex items-center justify-center"
                  >
                    {digit}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all"
              >
                Unlock Access
              </button>

              {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

              <div className="mt-5 text-center text-gray-600 text-xs">
                <p>If you don’t have the admin code, please contact us:</p>
                <a href="mailto:kumarbijaybehera07@gmail.com" className="text-gray-800 underline">
                  kumarbijaybehera07@gmail.com
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="md:block hidden">
            <AdminMenu />
          </div>
          <MainPropertyContainer />
        </>
      )}

      <BottomNavbar />
    </div>
  );
}
