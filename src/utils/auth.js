// src/utils/auth.js
// const BACKEND_URL = "https://sakshyara-backend-1088202356152.asia-south1.run.app";
import config from "../app/env.js";

const BACKEND_URL = config.BACKEND_URL;
export const triggerLogin = (redirectTo = "/") => {
  const encodedRedirect = encodeURIComponent(redirectTo);
  window.location.href = `${BACKEND_URL}/api/v1/auth/google?redirect=${encodedRedirect}`;
};

export const triggerLogout = async () => {
  await fetch(`${BACKEND_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};
