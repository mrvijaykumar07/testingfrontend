import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../features/noteSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3 } from "lucide-react";
import Navbar from "../Pages/LandingPage/Navbar";
import BottomNavbar from "../../src/Pages/LandingPage/BottomNavbar";

const Note = () => {
  const dispatch = useDispatch();
  const { items: notes, status, error } = useSelector((state) => state.notes);
  const [newNoteText, setNewNoteText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(fetchNotes());
  }, [status, dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newNoteText.trim()) {
      dispatch(addNote({ note: newNoteText.trim() }));
      setNewNoteText("");
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setEditText(note.note);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editText.trim() && editingId) {
      dispatch(
        updateNote({ id: editingId, updates: { note: editText.trim() } })
      );
      setEditingId(null);
      setEditText("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-white text-black py-12 px-4 h-screen">
        <div className="w-full backdrop-blur-2xl bg-white text-black p-4">
          <h1 className="text-xl font-bold mb-4">My Notes</h1>

          <form onSubmit={handleAdd} className="flex sm:flex-row gap-2 mb-3">
            <input
              type="text"
              placeholder="Write something..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              className="flex-1 border border-gray-400 p-2 rounded-xl focus:ring-2 focus:ring-indigo-200 outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 rounded-xl hover:bg-indigo-700 flex items-center gap-2"
            >
              <Plus size={18} /> Add
            </button>
          </form>

          {status === "loading" && (
            <p className="text-center py-6">Loading notes...</p>
          )}
          {status === "failed" && (
            <p className="text-red-500 text-center">Error: {error}</p>
          )}

          <h2 className="text-center font-bold border-b mb-3">NOTES</h2>

          <AnimatePresence>
            {notes.map((note) => (
              <motion.li
                key={note._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between p-2 px-3 rounded-2xl shadow-md border border-gray-300 bg-gray-50 mb-2"
              >
                {editingId === note._id ? (
                  <form onSubmit={handleSave} className="flex w-full gap-2">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 border border-gray-400 p-2 rounded-xl"
                      autoFocus
                    />
                    <button className="bg-green-600 text-white px-3 py-1 rounded-xl">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="font-medium text-md text-black">
                      {note.note}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(note)}
                        className="hover:text-yellow-500"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </motion.li>
            ))}
          </AnimatePresence>

          {notes.length === 0 && status === "succeeded" && (
            <p className="text-gray-600 text-center py-10">
              No notes yet — add one!
            </p>
          )}
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Note;
