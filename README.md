🏫 StudyNest

An advanced property onboarding and student productivity platform

🌐 Live Links

🔹 Frontend (Vercel): https://studynest.vercel.app

🔹 Backend (Render): https://studynest-api.onrender.com

(Cloudflare deployment coming soon)

🧠 About the Project

StudyNest is a full-stack platform that serves two main roles:

Admin Panel (Library/Coaching Owner) —

Onboard and list coaching centers or libraries with details like name, address, contact info, facilities, and pricing plans.

Upload property images, manage plans, and add rules.

Manage listings in a simple, responsive dashboard.

User Portal (Students/Visitors) —

Explore nearby coaching centers and libraries based on area.

View property details, facilities, and pricing.

Contact owners directly via Call or WhatsApp.

Use built-in productivity tools:

✅ To-Do Manager

🗓️ Planner

📒 Notes

🕒 Stopwatch & Timer

🎓 Attendance Tracker

StudyNest aims to simplify academic and learning experiences — for both education providers and students — on a single platform.

⚙️ Tech Stack
💻 Frontend

React (Vite)

Tailwind CSS

Redux Toolkit

Axios

React Router DOM

🛠️ Backend

Node.js & Express.js

MongoDB Atlas (Database)

Cloudinary (Image Storage)

Google OAuth Authentication

JWT-based Auth for Secure Sessions

☁️ Deployment

Frontend: Vercel

Backend: Render

(Next update planned for Cloudflare deployment)

🚀 Features
🧑‍💼 Admin (Property Owner)

Add and manage libraries or coaching centers.

Upload multiple images for each property.

Add pricing plans and facilities.

Update or delete properties anytime.

👨‍🎓 User (Student)

Search for nearby properties by city or area.

View property details including rules, images, facilities, and plans.

Call or WhatsApp property owners directly.

Access built-in study tools:

📋 To-Do List

🗓️ Daily Planner

📖 Notes Section

⏱️ Stopwatch & Timer

🧾 Attendance Tracker

🔐 Authentication

Secure Google Sign-In for both admins and users.

Separate dashboards for Admin and User roles.




StudyNest/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── Components/
│   ├── Context/
│   ├── ExtraFeatures/
│   │   ├── Planner/
│   │   ├── Attendance.jsx
│   │   ├── Note.jsx
│   │   ├── Quiz.jsx
│   │   ├── Timer.jsx
│   │   ├── Todo.jsx
│   │
│   ├── Pages/
│   │   ├── AdminPortal/
│   │   ├── Booking/
│   │   ├── Coaching/
│   │   ├── Course/
│   │   ├── LandingPage/
│   │   ├── Library/
│   │   ├── SearchResult/
│   │   ├── SingleEntityPage/
│   │   ├── Skills/
│   │   ├── QR_DirectEntry/
│   │
│   ├── app/
│   ├── assets/
│   │   └── images/
│   ├── data/
│   ├── features/
│   ├── lib/
│   ├── styles/
│   └── utils/
│
├── .env
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vercel.json
└── vite.config.js


# Frontend .env example
VITE_BASE_URL=vijay
VITE_SECRET_KEY=your_secret_key
VITE_BACKEND_URL=https://studynestbackend.onrender.com
VITE_FRONTEND_ORIGIN=http://localhost:5173
