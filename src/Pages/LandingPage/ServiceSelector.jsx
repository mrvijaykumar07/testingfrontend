import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaBookOpen,
  FaChalkboardTeacher,
  FaBrain,
  FaGraduationCap,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import config from "../../app/env.js";

const services = [
  { name: "Library", icon: <FaBookOpen size={30} />, path: "/libraries", color: "indigo-900" },
  { name: "Coaching", icon: <FaChalkboardTeacher size={30} />, path: "/coachings", color: "indigo-900" },

];

const ServiceSelector = () => {
  const { currentUser, isLoggedIn, profileImage } = useSelector((state) => state.user);

  // const handleLogin = () => {
  //   window.location.href = `https://sakshyara-backend-1088202356152.asia-south1.run.app/auth/google`;
  // };

  const handleLogin = () => {
  window.location.href = `${config.BACKEND_URL}/api/v1/auth/google`;
};

  return (
    <div className="relative flex items-center justify-between px-4 pb-16 h-36 mx-auto max-w-3xl mb-14 rounded-sm shadow-2xl bg-[linear-gradient(to_bottom,var(--secondary-accent),var(--bg-cream))]">
      <div className="flex items-center gap-3">
<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
  {profileImage ? (
    <img
      src={profileImage}
      alt=""
      className="w-full h-full object-cover rounded-full"
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  ) : (
    <FaUser size={18} />
  )}
</div>



        <div className="flex flex-col">
          {isLoggedIn ? (
            <>
              <p className="text-sm font-medium text-[var(--text-dark)]">
                Welcome {currentUser?.name}
              </p>
              <p className="text-xs text-gray-700">{currentUser?.email}</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-[var(--text-dark)]">Welcome Guest</p>
              <button
                onClick={handleLogin}
                className="mt-1 text-xs font-semibold px-3 pt-0.5 pb-1 rounded-full bg-white hover:bg-opacity-90 transition-all"
                style={{ color: "var(--primary-accent)" }}
              >
                Login / Sign-up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Services */}
      <ul className="absolute top-[100px] left-1/2 -translate-x-1/2 flex justify-between gap-5 px-4 z-10">
        {services.map((service) => (
          <li key={service.name} className="w-[130px]">
            <Link
              to={service.path}
              className="flex flex-col items-center px-3 py-2 bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-md hover:scale-105 transition-all duration-300"
            >
              <div className="mb-1 text-indigo-900" style={{ color: service.color }}>
                {service.icon}
              </div>
              <span className="text-xs font-semibold text-center " style={{ color: service.color }}>
                {service.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSelector;
