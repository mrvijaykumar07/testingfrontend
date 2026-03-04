import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Todo from "../../assets/images/icons/tools/todo.png";
import Notes from "../../assets/images/icons/tools/quiz.png";
import Quiz from "../../assets/images/icons/tools/timer.png";
import Planner from "../../assets/images/icons/tools/timer.png";
import Attendance from "../../assets/images/icons/tools/quiz.png";

const tools = [
  {
    name: "To-Do",
    image: Todo,
    desc: "Add your tasks with deadlines and mark them done",
    path: "/todo",
  },
  {
    name: "Notes",
    image: Notes,
    desc: "Save class notes, summaries and reminders",
    path: "/note",
  },
  {
    name: "Quiz",
    image: Quiz,
    desc: "Practice quizzes to boost your memory",
    path: "/quiz",
  },
  {
    name: "Planner",
    image: Planner,
    desc: "Plan your day, week, and goals efficiently",
    path: "/planner",
  },
  {
    name: "Attendance",
    image: Attendance,
    desc: "Track your attendance in all subjects",
    path: "/attendance",
  },
];

const ToolsVertical = () => {
  return (
    <div className="p-6 rounded-3xl shadow-xl max-w-3xl mx-auto bg-[linear-gradient(to_bottom,_rgba(0,255,160,0.08)_1%,_rgba(0,255,160,0.15)_100%)]">
      {/* ⬇️ Increased spacing between cards */}
      <div className="space-y-4">
        {tools.map((tool, index) => {
          const isEven = index % 2 === 0;

          return (
            <Link to={tool.path} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`flex items-center justify-between gap-6 bg-[var(--card-bg)] bg-opacity-70 backdrop-blur-sm rounded-xl px-5 py-4  my-4 shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform duration-300 cursor-pointer ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <motion.img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-contain object-center"
                    animate={{ rotate: [0, 8, 0, -8, 0] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Text */}
                <div className="text-left max-w-xs">
                  <h3 className="text-base font-bold mb-1 text-[var(--text-dark)]">
                    {tool.name}
                  </h3>
                  <p className="text-sm leading-tight text-[var(--text-light)]">
                    {tool.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsVertical;
