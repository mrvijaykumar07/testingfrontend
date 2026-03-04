import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../app/env.js";

const API_BASE = config.BACKEND_URL;

// ✅ Fetch planners
export const fetchPlanners = createAsyncThunk("planners/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_BASE}/planner`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Add planner
export const addPlanner = createAsyncThunk("planners/add", async (planner, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE}/planner`, planner, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Update planner
export const updatePlanner = createAsyncThunk("planners/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_BASE}/planner/${id}`, updates, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Delete planner
export const deletePlanner = createAsyncThunk("planners/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE}/planner/${id}`, { withCredentials: true });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Add task
export const addTaskToPlanner = createAsyncThunk("planners/addTask", async ({ plannerId, task }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE}/planner/${plannerId}/tasks`, task, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Update task
export const updateTaskInPlanner = createAsyncThunk("planners/updateTask", async ({ plannerId, taskId, updates }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_BASE}/planner/${plannerId}/tasks/${taskId}`, updates, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ✅ Delete task
export const deleteTaskInPlanner = createAsyncThunk("planners/deleteTask", async ({ plannerId, taskId }, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${API_BASE}/planner/${plannerId}/tasks/${taskId}`, { withCredentials: true });
    return { plannerId, taskId };
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const plannerSlice = createSlice({
  name: "planners",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPlanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addPlanner.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updatePlanner.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deletePlanner.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      })
      .addCase(addTaskToPlanner.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateTaskInPlanner.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTaskInPlanner.fulfilled, (state, action) => {
        const planner = state.items.find((p) => p._id === action.payload.plannerId);
        if (planner)
          planner.tasks = planner.tasks.filter((t) => t._id !== action.payload.taskId);
      });
  },
});

export default plannerSlice.reducer;
