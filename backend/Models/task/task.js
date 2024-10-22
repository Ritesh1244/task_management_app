const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    description: {
        type: String,
        default: "No description",
    },
    dueDate: {
        type: Date,
        required: true, 
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    important: {  // New field to mark important tasks
        type: Boolean,
        default: false,  // Default is not important
    },
    user: {  
        type: Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    }
}, { timestamps: true });

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
