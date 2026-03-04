// File: src/app/env.js

const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL || "vijay",
  SECRET_KEY: import.meta.env.VITE_SECRET_KEY || "vgfytuftyfcftycgfhc",
  BACKEND_URL:
    import.meta.env.VITE_BACKEND_URL ||
    "https://studynestbackend.onrender.com",
  FRONTEND_ORIGIN:
    import.meta.env.VITE_FRONTEND_ORIGIN || "http://localhost:5173",
  NODE_ENV: import.meta.env.MODE || "development",
  port: 5000,
};

export default config;
