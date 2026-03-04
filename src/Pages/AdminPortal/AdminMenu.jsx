import React from "react";
import { Link } from "react-router-dom";
import {
  FaGift,
  FaCoins,
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaBell,
  FaPlusCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { MdLanguage, MdOutlinePolicy } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import config from "../../app/env.js";

const BACKEND_URL = config.BACKEND_URL;

const AdminMenu = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn, profileImage } = useSelector(
    (state) => state.user
  );

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/v1/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          client_secret: "vijayrequest",
        },
      });
      dispatch(logoutUser());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="fixed top-0 right-0 h-full w-full lg:w-[320px] bg-white shadow-xl z-50 overflow-y-auto border-l border-gray-300 pt-10">
      {/* Back button for mobile only */}
      <div className="lg:hidden my-3">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 text-black p-2 z-50"
          aria-label="Go back"
        >
          <FiArrowLeft size={28} />
        </button>
      </div>

      {/* Main container */}
      <div className="pt-6 md:pt-1 px-6 pb-10 text-[#1E1E1E]">
        {/* Profile Section */}
        <div className="relative p-4 mt-8 rounded-xl bg-gradient-to-r from-[#5E4B8B] to-[#00CFC8] text-white shadow-md flex flex-col items-start">
          {isLoggedIn && (
            <Link
              to="/admin/update-profile"
              className="absolute top-6 right-5 text-xs font-semibold underline hover:text-[#1E1E1E]"
            >
              Update Profile
            </Link>
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

        {/* Admin Menu Links */}
        <div className="mt-6 space-y-5 text-[15px]">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 hover:text-[#5E4B8B]"
          >
            <FaTachometerAlt size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/my-properties"
            className="flex items-center gap-3 hover:text-[#5E4B8B]"
          >
            <FaHome size={18} />
            My Properties
          </Link>

          <Link
            to="/onboarding"
            className="flex items-center gap-3 hover:text-[#5E4B8B]"
          >
            <FaPlusCircle size={18} />
            Add New Library
          </Link>

          <div
            
            className="flex items-center gap-3 hover:text-[#5E4B8B]"
          >
            <FaBell size={18} />
            Notifications
          </div>

          <div
            
            className="flex items-center gap-3 hover:text-[#5E4B8B]"
          >
            <FaCoins size={18} />
            Revenue Dashboard
          </div>

          <div
            
            className="flex items-center gap-3 hover:text-[#5E4B8B]"
          >
            <FaGift size={18} />
            Manage Promotions
          </div>
        </div>

        {/* Login / Logout Button */}
        <div className="pt-8">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-[#5E4B8B] to-[#00CFC8] text-white font-semibold px-10 py-2 rounded-full transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#5E4B8B] to-[#00CFC8] text-white font-semibold px-10 py-2 rounded-full transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminMenu;
