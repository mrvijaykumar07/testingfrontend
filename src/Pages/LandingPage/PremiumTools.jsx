import React from "react";
import {
  FaTasks,
  FaBookOpen,
  FaQuestionCircle,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const icons = [
  { name: "To-Do", icon: FaTasks, path: "/todo" },
  { name: "Notes", icon: FaBookOpen, path: "/note" },
  { name: "Timer", icon: FaClock, path: "/timer" },
  { name: "Planner", icon: FaCalendarAlt, path: "/planner" },
  { name: "Quiz", icon: FaQuestionCircle, path: "/quiz" },
  { name: "Attendance", icon: FaCheckCircle, path: "/attendance" },
];

const PremiumTools = () => {
  return (
    <div className="bg-gray-100 rounded-2xl p-8 m-6 shadow-lg mt-10  border border-gray-200">
  

      <ul className="grid grid-cols-3 gap-y-6 gap-x-3 h-60 rounded-2xl  ">
        {icons.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <li key={index}>
              <Link
                to={tool.path}
                className="flex flex-col items-center justify-center p-4 bg-white hover:bg-gray-100 rounded-xl shadow-lg hover:shadow-md transition-all"
              >
                <Icon size={24} className="text-indigo-950 mb-2" />
                <span className="text-xs font-medium text-gray-700">
                  {tool.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PremiumTools;
