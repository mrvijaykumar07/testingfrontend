import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  logoutUser,
  setProfileImage,
} from "../features/user/userSlice";
import config from "../app/env.js";


const BACKEND_URL = config.BACKEND_URL;
const secret_key = config.SECRET_KEY;

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  // Always fetch user on load
  useEffect(() => {
    fetchUser();
  }, []);

  // If logged in, always fetch profile image on load
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserImage();
    }
  }, [isLoggedIn]);

  const fetchUser = async () => {
    try {
      const res = await  axios.get(`${BACKEND_URL}/api/v1/auth/profile`,  {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          client_secret: secret_key,
        },
      });



      const user = res.data.data.user;
      dispatch(
        setUser({
          name: user.name,
          email: user.email,
        })
      );
    } catch (err) {
      dispatch(logoutUser());
      console.warn("❌ Auth failed or session expired.", err);
    }
  };

  const fetchUserImage = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/users/photo`, {
        credentials: "include",
        headers: {
          Accept: "image/*",
          client_secret: secret_key,
        },
      });

      if (res.ok) {
        const blob = await res.blob();

        // ✅ Convert blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(setProfileImage(reader.result)); // base64 string
        };
        reader.readAsDataURL(blob);
      } else {
        console.warn("❌ Failed to fetch profile image:", res.status);
      }
    } catch (err) {
      console.error("❌ Error fetching image:", err);
    }
  };

  return children;
};

export default AuthProvider;
