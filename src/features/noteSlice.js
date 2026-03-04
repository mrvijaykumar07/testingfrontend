import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../app/env.js";

const API_BASE = config.BACKEND_URL;

// ✅ Fetch all notes (for current user)
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_BASE}/notes`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Add new note (owner handled by backend)
export const addNote = createAsyncThunk("notes/addNote", async (noteData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE}/notes`, noteData, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Update note
export const updateNote = createAsyncThunk("notes/updateNote", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_BASE}/notes/${id}`, updates, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Delete note
export const deleteNote = createAsyncThunk("notes/deleteNote", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE}/notes/${id}`, { withCredentials: true });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Slice
const noteSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.status = "succeeded";
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const idx = state.items.findIndex((n) => n._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((n) => n._id !== action.payload);
      });
  },
});

export default noteSlice.reducer;
