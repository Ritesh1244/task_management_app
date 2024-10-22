const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Taskmodel = require("../../Models/task/task");

// Create task
const moment = require("moment");

const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, dueDate, status, priority, important } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required!" });
        }

        if (!description || description.trim() === "") {
            return res.status(400).json({ message: "Description is required!" });
        }

        if (!dueDate) {
            return res.status(400).json({ message: "Due date is required!" });
        }

        // Parse the dueDate using moment
        const parsedDueDate = moment(dueDate, "DD/MM/YYYY").toDate();

        if (isNaN(parsedDueDate.getTime())) {
            return res.status(400).json({ message: "Invalid due date format!" });
        }

        // Create task object
        const task = new Taskmodel({
            title,
            description,
            dueDate: parsedDueDate, // Use the parsed date
            status,
            priority,
            important: important || false,
            user: req.user._id,
        });

        // Save task to database
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error while creating task.", error: error.message });
    }
});

// Get tasks
const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Taskmodel.find({ user: req.user._id });
        if (tasks.length > 0) {
            return res.status(200).json({ length: tasks.length, tasks });
        } else {
            return res.status(404).json({ message: "No tasks found for this user." });
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Server error while fetching tasks." });
    }
});

// Single task
const singleTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const task = await Taskmodel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.user.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to view this task!" });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, completed, important } = req.body; // Add important field here

        console.log("Task ID:", id);
        console.log("Update Request Body:", req.body);

        const task = await Taskmodel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        if (!task.user.equals(req.user._id)) {
            return res.status(401).json({ message: "Not authorized!" });
        }

        // Check if dueDate is provided and parse it
        let parsedDueDate = task.dueDate;
        if (dueDate) {
            if (!moment(dueDate, "DD/MM/YYYY", true).isValid()) {
                return res.status(400).json({ message: "Invalid due date format!" });
            }
            parsedDueDate = moment(dueDate, "DD/MM/YYYY").toDate(); // Parse dueDate string to Date object
            console.log("Parsed Due Date:", parsedDueDate);
        }

        // Update task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = parsedDueDate;  // Use parsed date
        task.priority = priority || task.priority;
        task.completed = completed !== undefined ? completed : task.completed;
        task.important = important !== undefined ? important : task.important; // Add this line

        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


// Delete task
const deleteTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Taskmodel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        if (!task.user.equals(req.user._id)) {
            return res.status(401).json({ message: "Not authorized!" });
        }

        await Taskmodel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// important task
const getImportantTasks = asyncHandler(async (req, res) => {
    try {
        // Fetch only important tasks for the authenticated user
        const importantTasks = await Taskmodel.find({ user: req.user._id, important: true });

        // Check if any important tasks were found
        if (importantTasks.length > 0) {
            return res.status(200).json({ length: importantTasks.length, tasks: importantTasks });
        } else {
            return res.status(404).json({ message: "No important tasks found for this user." });
        }
    } catch (error) {
        console.error("Error fetching important tasks:", error);
        return res.status(500).json({ message: "Server error while fetching important tasks." });
    }
});



// Export the functions
module.exports = {
    createTask,
    getTasks,
    singleTask,
    updateTask,
    deleteTask,
    getImportantTasks,
};
