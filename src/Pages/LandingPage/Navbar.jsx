import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/studyNestLogo.png";


const Navbar = () => {

  const navigate = useNavigate();

  return (
    <header className="fixed mx-auto max-w-3xl top-0 left-0 right-0 md:rounded-4xl shadow-gray-400   bg-white shadow-sm z-50 px-4  text-[var(--text-dark)]">
      <div className="fixed bottom-0 left-0 right-0 z-50 shadow-[0_-2px_20px_rgba(0,0,0,0.1)] mx-auto max-w-3xl "></div>
      <div className="flex items-center justify-between py-2">
 

        {/* Logo */}
        <Link to="/" className="text-4xl font-extrabold ml-2 ">
          <img src={logo} alt="LOGO" className="h-10 w-auto" />
        </Link>

 <Link
  to="/help"
  className="mr-1 flex h-12 w-12 items-center justify-center rounded-full 
             bg-gray-100 text-gray-700 "
>
  <span className="text-3xl font-medium">ⓘ</span>
</Link>

      </div>
    </header>
  );
};

export default Navbar;
