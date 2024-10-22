import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const getToken = () => localStorage.getItem("token");


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('https://task-management-app-eta.vercel.app/task/alltasks', {
        headers: { authorization: getToken() },
    });
    return response.data.tasks; 
});


export const ImportantTask = createAsyncThunk('tasks/fetchImportantTasks', async () => {
    const response = await axios.get('https://task-management-app-eta.vercel.app/task/important', {
        headers: { authorization: getToken() },
    });
    return response.data.tasks; 
});

// Async thunk to create a new task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { dispatch }) => {
    const response = await axios.post('https://task-management-app-eta.vercel.app/task/create', taskData, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); 
    return response.data; 
});


export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, updates }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`https://task-management-app-eta.vercel.app/task/${taskId}`, updates, {
            headers: { authorization: getToken() },
        });
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.response.data); // Handle error and return it
    }
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { dispatch }) => {
    await axios.delete(`https://task-management-app-eta.vercel.app/task/${taskId}`, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); // Refetch tasks after deletion
});

// Async thunk to toggle task importance
export const toggleImportant = createAsyncThunk('tasks/toggleImportant', async (taskId, { getState, dispatch }) => {
    const task = getState().tasks.taskList.find(t => t._id === taskId);
    const updates = { important: !task.important };
    await axios.patch(`https://task-management-app-eta.vercel.app/task/${taskId}`, updates, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); // Refetch tasks after update
});

// Async thunk to toggle task completion
export const toggleCompletion = createAsyncThunk('tasks/toggleCompletion', async (taskId, { getState, dispatch }) => {
    const task = getState().tasks.taskList.find(t => t._id === taskId);
    const updates = { completed: !task.completed };
    await axios.patch(`https://task-management-app-eta.vercel.app/task/${taskId}`, updates, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); // Refetch tasks after update
});

// Task slice definition
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        taskList: [],
        importantTasks: [], // Separate state for important tasks
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Fetch all tasks
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading'; // Set loading status
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.taskList = action.payload; // Update task list
                state.status = 'succeeded'; // Set succeeded status
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed'; // Set failed status
                state.error = action.error.message; // Capture error message
            })
            // Fetch important tasks
            .addCase(ImportantTask.pending, (state) => {
                state.status = 'loading'; // Set loading status
            })
            .addCase(ImportantTask.fulfilled, (state, action) => {
                state.importantTasks = action.payload; // Update important tasks
                state.status = 'succeeded'; // Set succeeded status
            })
            .addCase(ImportantTask.rejected, (state, action) => {
                state.status = 'failed'; // Set failed status
                state.error = action.error.message; // Capture error message
            })
            // Update an existing task
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload; // Get updated task
                const taskIndex = state.taskList.findIndex(task => task._id === updatedTask._id);
                if (taskIndex !== -1) {
                    state.taskList[taskIndex] = updatedTask; // Update the task in the state
                }
            })
            // Delete a task (handled through refetch)
            .addCase(deleteTask.fulfilled, (state, action) => {
                // Refetch will handle state update
            });
    },
});


export default taskSlice.reducer;
