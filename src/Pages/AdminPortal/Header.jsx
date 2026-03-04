import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/studyNestLogo.png";

const Header = () => {
  const { currentUser, profileImage, isLoggedIn } = useSelector((state) => state.user);

  return (
    <header className="navigation-header h-[72px] flex bg-white shadow-md px-4 items-center">
      {/* Left Section */}
      <div className="flex items-center md:ml-20">
        <Link to="/" className="text-2xl font-extrabold">
          <img src={logo} alt="LOGO" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Center Spacer */}
      <div className="flex-1"></div>

      {/* Right Section */}
      <div className="flex flex-row">
        <Link to="/admin/profile" className="cursor-pointer">
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-sm font-medium">
                  {currentUser?.name || "User"}
                </span>
                <img
                  src={profileImage || "/default-user.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </>
            ) : (
              <>
                <span className="text-sm font-medium">Admin</span>
                <FaUserCircle size={28} className="text-gray-500" />
              </>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
