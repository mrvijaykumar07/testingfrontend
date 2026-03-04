// File: src/app/env.js

const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL || "vijay",
  SECRET_KEY: import.meta.env.VITE_SECRET_KEY || "vgfytuftyfcftycgfhc",
  BACKEND_URL:
    import.meta.env.VITE_BACKEND_URL ||
    "https://qpix-backend-service-v2-be-928486661285.asia-south1.run.app",



  FRONTEND_ORIGIN:
    import.meta.env.VITE_FRONTEND_ORIGIN || "http://localhost:5173",
  NODE_ENV: import.meta.env.MODE || "development",
  port: 5000,
};

export default config;
