// src/Components/Layout/UserLayout.jsx
import { useSelector } from "react-redux";
import BottomNavbar from "../../Pages/LandingPage/BottomNavbar";
import Navbar from "../../Pages/LandingPage/Navbar";

const UserLayout = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="min-h-screen">
     
      {/* shared user layout */}
      <div className="pt-4 pb-16">{children}</div>
      <BottomNavbar />
    </div>
  );
};

export default UserLayout;
