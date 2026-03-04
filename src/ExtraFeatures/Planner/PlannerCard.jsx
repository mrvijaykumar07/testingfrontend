import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePlanner, deletePlanner } from "../../features/plannerSlice";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";

const PlannerCard = ({ planner }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const updated = { ...planner, tasks: [...planner.tasks, { title: newTask }] };
    dispatch(updatePlanner(updated));
    setNewTask("");
  };

  const handleDeletePlanner = () => {
    if (window.confirm("Delete this planner?")) dispatch(deletePlanner(planner._id));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{planner.title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddTask}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
          >
            + Add Task
          </button>
          <button
            onClick={handleDeletePlanner}
            className="text-gray-500 hover:text-red-500"
            title="Delete Planner"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Sample Tasks */}
      <ul className="space-y-1 mb-2">
        {planner.tasks.length === 0 && (
          <li className="text-gray-400 text-sm italic">No tasks yet</li>
        )}
        {planner.tasks.slice(0, 2).map((task, index) => (
          <li
            key={index}
            className="text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-1 border"
          >
            • {task.title}
          </li>
        ))}
      </ul>

      {/* Expand/Collapse */}
      {planner.tasks.length > 2 && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 text-sm flex items-center gap-1"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Show More <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}

      {/* Expanded Tasks */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 space-y-1"
          >
            {planner.tasks.slice(2).map((task, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm"
              >
                <span>{task.title}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Input */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="New task..."
          className="border rounded-md px-2 py-1 flex-1 text-sm"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-md hover:bg-indigo-700"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default PlannerCard;
