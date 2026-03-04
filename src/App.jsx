import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import MobileSideMenu from "./Pages/LandingPage/MobileSideMenu";

import Main_Landing from "./Pages/LandingPage/Main_Landing";

import AuthProvider from "./Components/AuthProvider";


// ✅ Layout and QR page import
import UserLayout from "./Components/Layout/UserLayout";








import config from "./app/env.js";

function App() {
  // ✅ Wake Render backend when website opens
  useEffect(() => {
    fetch(`${config.BACKEND_URL}/ping`)
      .then(() => console.log("✅ Backend wake-up ping sent!"))
      .catch(() => console.log("⚠️ Backend wake-up failed (maybe sleeping)."));
  }, []);

  return (
    <AuthProvider>
      <Routes>
      
        <Route
          path="/"
          element={
            <UserLayout>
              <Main_Landing />
            </UserLayout>
          }
        />
        <Route
          path="/user"
          element={
            <UserLayout>
              <MobileSideMenu />
            </UserLayout>
          }
        />
  
  






   





      </Routes>
    </AuthProvider>
  );
}

export default App;
