import {

  FaUser,
 
} from "react-icons/fa";

import { Link } from "react-router-dom";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-[0_-2px_20px_rgba(0,0,0,0.1)] mx-auto max-w-3xl md:rounded-4xl bg-white">
      <div className="flex justify-around items-center h-12 w-full md:rounded-4xl text-xs text-black mx-2">
   

    



        <Link
          to="/user"
          className="flex flex-col items-center hover:opacity-90 transition-all duration-300"
        >
          <FaUser size={20} />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
