import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../services/Api";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
};

// Thunks para el CRUD
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await Api.get("/tasks");
});

export const createTask = createAsyncThunk("tasks/createTask", async (data: any) => {
  return await Api.post("/tasks", data);
});

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, data }: { id: number; data: any }) => {
  return await Api.put(`/tasks/${id}`, data);
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: number) => {
  return await Api.delete(`/tasks/${id}`);
});

// Slice
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
      });
  },
});
