import React from "react";
import {Link } from 'react-router-dom'
import { Line, Pie } from "react-chartjs-2";
import L1 from "../../assets/images/Libraries/10.jpg";
import L2 from "../../assets/images/Libraries/2.jpg";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import MyPropertiesComponent from "./MyPropertiesComponent";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const MainDashboard = () => {
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Page Visits",
        data: [120, 200, 180, 220, 260, 310, 280],
        fill: true,
        backgroundColor: "rgba(59,130,246,0.1)",
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ["Mobile", "Desktop"],
    datasets: [
      {
        data: [72, 28],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 md:p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}

 
          <Link
            to="/onboarding"
            className="px-4 py-2 rounded-md text-white font-medium transition bg-gradient-to-r from-[var(--primary-accent)] to-[var(--success-accent)] hover:opacity-90 inline-flex items-center gap-2 justify-center"
          >
            <span className="text-xl"> + </span> <span> List New Property</span>
          </Link>
    </div>
  );
};

export default MainDashboard;
