import React from "react";
import { Link } from "react-router-dom";
import { FaGift, FaCoins, FaPhoneAlt, FaUser } from "react-icons/fa";
import {
  MdLanguage,
  MdOutlinePolicy,
  MdContactPhone,
  MdAdminPanelSettings,
} from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import config from "../../app/env.js";

const BACKEND_URL = config.BACKEND_URL;

const MobileSideMenu = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn, profileImage } = useSelector(
    (state) => state.user,
  );

  // ✅ Universal Login redirect (Google OAuth)
  const handleLogin = () => {
    // Works properly on Firefox, Chrome, Edge, Safari
    window.open(`${BACKEND_URL}/api/v1/auth/google`, "_self", "noopener,noreferrer");
  };

  // ✅ Safe Logout (Cross-Browser + Double-Sided Cookie Clear)
  const handleLogout = async () => {
    try {
      // 🔹 Step 1: Call backend to clear httpOnly cookie
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include", // ensures cookie is sent
        headers: {
          "Content-Type": "application/json",
          client_secret: "vijayrequest",
        },
      });

      // 🔹 Step 2: Also clear cookie manually from frontend (some browsers keep cached cookies)
      document.cookie =
        "qpix_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";

      // 🔹 Step 3: Clear Redux, localStorage, sessionStorage
      dispatch(logoutUser());
      localStorage.clear();
      sessionStorage.clear();

      // 🔹 Step 4: Redirect to homepage (avoid window.reload flicker)
      if (res.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed:", res.status);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-4 flex flex-col space-y-6 px-6 w-full h-full text-[#1E1E1E] z-50">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 text-black p-2 z-50"
        aria-label="Go back"
      >
        <FiArrowLeft size={28} />
      </button>

      {/* Profile Card */}
      <div className="relative p-4 mt-8 rounded-xl bg-gradient-to-r from-[#5E4B8B] to-[#00CFC8] text-white shadow-md w-full h-40 flex flex-col items-start">
        {isLoggedIn && (
          <button className="absolute top-6 right-5 text-xs font-semibold underline hover:text-[#1E1E1E]">
            Update Profile
          </button>
        )}

        <div className="w-16 h-16 my-2 bg-white rounded-full flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <FaUser size={34} className="text-black" />
          )}
        </div>

        {isLoggedIn ? (
          <>
            <h2 className="font-semibold text-base">{currentUser?.name}</h2>
            <p className="text-sm">{currentUser?.email}</p>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="text-base font-semibold underline"
          >
            Login / Signup
          </button>
        )}
      </div>

      {/* Menu Links */}
      <div className="mt-4 space-y-5 text-[15px] text-[#1E1E1E]"></div>

      {/* Login / Logout Button */}
      <div className="pt-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-[#5E4B8B] to-[#00CFC8] text-white text-center font-semibold px-10 py-2 rounded-full transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-[#5E4B8B] to-[#00CFC8] text-white text-center font-semibold px-10 py-2 rounded-full transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileSideMenu;
