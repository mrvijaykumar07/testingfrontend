import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskInPlanner } from "../../features/plannerSlice";
import { X, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const PlanDetails = ({ plan, onClose }) => {
  const dispatch = useDispatch();
  const total = plan.tasks?.length || 0;
  const done = plan.tasks?.filter((t) => t.completed).length || 0;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTaskInPlanner({ plannerId: plan._id, taskId }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 w-full max-w-2xl bg-white text-black rounded-2xl p-5 shadow-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{plan.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-gray-600 mb-3">{plan.description}</p>
        <div className="text-sm text-gray-700 mb-4">
          <strong>Progress:</strong> {progress}% ({done}/{total})
        </div>

        {/* Task List */}
        <ul className="space-y-2 max-h-72 overflow-y-auto">
          {plan.tasks?.length === 0 ? (
            <li className="text-gray-600 italic">No tasks yet</li>
          ) : (
            plan.tasks.map((task) => (
              <li
                key={task._id}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  task.completed
                    ? "bg-green-50 text-gray-500 line-through"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                  <span>{task.title}</span>
                </div>

                {/* ✅ Delete task button */}
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="p-2 rounded-xl hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 border"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlanDetails;
