import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlanners,
  addPlanner,
  deletePlanner,
  updatePlanner,
  addTaskToPlanner,
  updateTaskInPlanner,
  deleteTaskInPlanner,
} from "../../features/plannerSlice.js";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Edit3,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Planner = () => {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((state) => state.planners || {});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [taskInputs, setTaskInputs] = useState({});
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    dispatch(fetchPlanners());
  }, [dispatch]);

  const handleAddPlan = () => {
    if (!title.trim()) return;
    const payload = {
      owner: "69033e4e11c40c1cf8928a4f",
      title,
      description,
      tasks: [],
    };
    dispatch(addPlanner(payload));
    setTitle("");
    setDescription("");
  };

  const toggleExpand = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const handleAddTask = (planId) => {
    const taskTitle = taskInputs[planId]?.trim();
    if (!taskTitle) return;
    dispatch(
      addTaskToPlanner({
        plannerId: planId,
        task: { title: taskTitle, completed: false },
      })
    );
    setTaskInputs({ ...taskInputs, [planId]: "" });
  };

  const handleToggleComplete = (planId, task) => {
    dispatch(
      updateTaskInPlanner({
        plannerId: planId,
        taskId: task._id,
        updates: { completed: !task.completed },
      })
    );
  };

  const handleDeleteTask = (planId, taskId) => {
    dispatch(deleteTaskInPlanner({ plannerId: planId, taskId }));
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm("Delete this entire plan?")) {
      dispatch(deletePlanner(planId));
    }
  };

  const startEditPlan = (plan) => {
    setEditingPlanId(plan._id);
    setEditTitle(plan.title);
    setEditDescription(plan.description || "");
  };

  const saveEditPlan = (planId) => {
    dispatch(
      updatePlanner({
        id: planId,
        updates: { title: editTitle, description: editDescription },
      })
    );
    setEditingPlanId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black py-16 px-4">
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">Planner</h1>
        </div>

        {/* Add Plan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          <input
            className="col-span-2 border border-gray-400 p-3 rounded-xl text-xs outline-none"
            type="text"
            placeholder="Plan title (e.g., Math Syllabus / Week Plan)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-3 border border-gray-400 p-2 rounded-xl"
          />
        </div>

        <button
          onClick={handleAddPlan}
          className="bg-white text-indigo-900 w-full font-semibold px-5 py-2 border rounded-xl hover:bg-indigo-700 hover:text-white transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Create Plan
        </button>

        <h2 className="text-center font-bold pt-5 mb-2 border-b border-gray-300">
          Your Plans
        </h2>

        {/* Plans */}
        {status === "loading" ? (
          <p className="text-center py-8">Loading plans...</p>
        ) : items.length === 0 ? (
          <p className="text-center py-8 text-gray-600">
            No plans yet — add one!
          </p>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence>
              {items.map((plan) => {
                const total = plan.tasks?.length || 0;
                const done = plan.tasks?.filter((t) => t.completed).length || 0;
                const progress =
                  total === 0 ? 0 : Math.round((done / total) * 100);

                return (
                  <motion.li
                    key={plan._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="border border-gray-200 rounded-2xl shadow-sm bg-white p-4 transition hover:shadow-md"
                  >
                    {/* Header */}
                    {editingPlanId === plan._id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full border p-2 rounded-xl outline-none"
                        />
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full border p-2 rounded-xl outline-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => saveEditPlan(plan._id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPlanId(null)}
                            className="border px-4 py-2 rounded-xl hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleExpand(plan._id)}
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-black">
                            {plan.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-3 w-full">
                      {/* Progress section — still right aligned */}
                      <div className="text-xs text-gray-600 text-right">
                        <div className="font-medium">{progress}%</div>
                        <div className="text-[10px]">
                          ({done}/{total})
                        </div>
                      </div>

                      {/* Edit/Delete Buttons */}
                      {editingPlanId !== plan._id && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditPlan(plan);
                            }}
                            className="p-2 rounded-xl hover:bg-yellow-50"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePlan(plan._id);
                            }}
                            className="p-2 rounded-xl hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}

                      {/* Expand/Collapse Arrow — last item */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(plan._id);
                        }}
                        className="p-2 rounded-xl hover:bg-gray-100 transition"
                      >
                        {expandedPlan === plan._id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </div>

                    {/* Expanded Section */}
                    <AnimatePresence>
                      {expandedPlan === plan._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 border-t border-gray-200 pt-3"
                        >
                          {/* Task List */}
                          <ul className="space-y-2 mb-3">
                            {plan.tasks?.length === 0 ? (
                              <li className="text-gray-500 italic">
                                No tasks yet
                              </li>
                            ) : (
                              plan.tasks.map((task) => (
                                <li
                                  key={task._id}
                                  className={`flex items-center justify-between p-2 rounded-xl border ${
                                    task.completed
                                      ? "bg-green-50 text-gray-500 line-through"
                                      : "bg-white"
                                  }`}
                                >
                                  <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() =>
                                      handleToggleComplete(plan._id, task)
                                    }
                                  >
                                    {task.completed ? (
                                      <CheckCircle2 size={18} />
                                    ) : (
                                      <Circle size={18} />
                                    )}
                                    <span>{task.title}</span>
                                  </div>

                                  <button
                                    onClick={() =>
                                      handleDeleteTask(plan._id, task._id)
                                    }
                                    className="p-2 rounded-xl hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </li>
                              ))
                            )}
                          </ul>

                          {/* Add Task */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Add new task..."
                              value={taskInputs[plan._id] || ""}
                              onChange={(e) =>
                                setTaskInputs({
                                  ...taskInputs,
                                  [plan._id]: e.target.value,
                                })
                              }
                              className="flex-1 border border-gray-300 p-2 rounded-xl outline-none"
                            />
                            <button
                              onClick={() => handleAddTask(plan._id)}
                              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 active:scale-95 flex items-center gap-1"
                            >
                              <Plus size={16} /> Add
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}

        {/* ⚠️ How To Use Section */}
        <div className="mt-10 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-xl p-4 flex items-start gap-3 text-sm">
          <Info className="mt-0.5" size={18} />
          <div>
            <p className="font-semibold mb-1">How to use the Planner:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Create a <strong>Plan</strong> (e.g., “Math Exam”)
              </li>
              <li>
                Click the plan (or arrow) to <strong>view details</strong>
              </li>
              <li>
                Add / Delete <strong>Tasks</strong> inside the plan
              </li>
              <li>Mark tasks as done ✅ to track progress</li>
              <li>Edit or delete any plan from the top right icons</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
