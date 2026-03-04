import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllByDate,
  setSelectedDate,
  toggleLocalComplete,
} from "../features/todoSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Circle,
  CalendarDays,
} from "lucide-react";
import Navbar from "../Pages/LandingPage/Navbar";
import BottomNavbar from "../../src/Pages/LandingPage/BottomNavbar";

const Todo = () => {
  const dispatch = useDispatch();
  const { items, selectedDate } = useSelector((state) => state.todos);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todosForDate = Array.isArray(items)
    ? items.filter((t) => t.date === selectedDate)
    : [];

  const handleAdd = () => {
    if (!title.trim() || !time.trim()) return;
    const dbTime = time;
    const newTodo = { title, time: dbTime, date: selectedDate };
    dispatch(addTodo(newTodo));
    setTitle("");
    setTime("");
  };

  const formatToAMPM = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const handleToggle = (id) => {
    dispatch(toggleLocalComplete(id));
    dispatch(
      updateTodo({
        id,
        updates: { completed: !items.find((t) => t._id === id)?.completed },
      })
    );
  };

  const handleEdit = (todo) => {
    const newTitle = prompt("Edit task:", todo.title);
    if (newTitle && newTitle.trim() !== "") {
      dispatch(updateTodo({ id: todo._id, updates: { title: newTitle } }));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Delete all tasks for this date?")) {
      dispatch(deleteAllByDate(selectedDate));
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-white text-black py-12 px-4 h-screen">
        <div className="w-full backdrop-blur-2xl bg-white text-black p-4">
          {/* Header */}
          <div className="flex mb-4 justify-between gap-4 items-center">
            <h1 className="text-md font-bold text-black tracking-tight ml-2 mt-1">
              {formatDate(selectedDate)}
            </h1>

            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => dispatch(setSelectedDate(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="flex items-center justify-center bg-white text-indigo-900 hover:bg-indigo-50 border border-gray-300 rounded-lg p-3 mt-1 shadow-sm transition-all duration-200"
              >
                <CalendarDays className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Add Task */}
          <div className="flex sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Add your next mission..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 text-black placeholder-black border border-black p-2 rounded-xl focus:ring-2 focus:ring-white outline-none"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-black border border-black p-2 rounded-xl focus:ring-2 focus:ring-white outline-none"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-white w-full text-indigo-900 font-bold px-5 py-1 mb-1 rounded-xl hover:bg-indigo-100 transition active:scale-95 flex items-center justify-center gap-2 border"
          >
            <Plus size={18} /> Add
          </button>

          <h2 className="text-center font-bold pt-3 mb-2 w-full border-b-1">
            TO-DO
          </h2>

          {/* Todo list */}
          {todosForDate.length === 0 ? (
            <p className="text-black text-center italic py-10 text-lg">
              No tasks for{" "}
              <span className="font-semibold">{formatDate(selectedDate)}</span>
            </p>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence>
                {todosForDate.map((todo) => (
                  <motion.li
                    key={todo._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center justify-between p-2 px-3 rounded-2xl shadow-md border border-gray-300 backdrop-blur-xl ${
                      todo.completed
                        ? "bg-white/10 text-black line-through"
                        : "bg-white/20 text-black"
                    }`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => handleToggle(todo._id)}
                    >
                      {todo.completed ? (
                        <CheckCircle2 size={22} className="text-green-400" />
                      ) : (
                        <Circle size={22} className="text-black" />
                      )}
                      <span className="font-medium text-md text-black">
                        {todo.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-black">{formatToAMPM(todo.time)}</span>

                      <button
                        onClick={() => handleEdit(todo)}
                        className="hover:text-yellow-300 transition"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => dispatch(deleteTodo(todo._id))}
                        className="hover:text-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {todosForDate.length > 0 && (
            <div className="mt-14 text-center">
              <button
                onClick={handleDeleteAll}
                className="px-6 py-3 font-semibold rounded-xl hover:bg-red-600/90 transition bg-white active:scale-95 flex items-center text-xs justify-center gap-2 mx-auto shadow-gray-300 shadow-xl border border-gray-300"
              >
                <Trash2 size={18} />
                {formatDate(selectedDate)} Plans
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Todo;
