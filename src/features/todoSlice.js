import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../app/env.js";

const API_BASE = config.BACKEND_URL;

// ✅ Fetch all todos (for logged-in user)
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_BASE}/todos`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Add todo (owner assigned automatically by backend)
export const addTodo = createAsyncThunk("todos/addTodo", async (todo, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE}/todos`, todo, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_BASE}/todos/${id}`, updates, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE}/todos/${id}`, { withCredentials: true });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteAllByDate = createAsyncThunk("todos/deleteAllByDate", async (date, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${API_BASE}/todos/by-date/${date}`, { withCredentials: true });
    return date;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    selectedDate: new Date().toISOString().split("T")[0],
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    toggleLocalComplete(state, action) {
      const todo = state.items.find((t) => t._id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteAllByDate.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.date !== action.payload);
      });
  },
});

export const { setSelectedDate, toggleLocalComplete } = todoSlice.actions;
export default todoSlice.reducer;
