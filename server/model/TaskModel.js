const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskModel = new Schema(
    {
        taskDetails: {
            type: String,
            required: true
        },
        taskDate: {
            type: String,
            required: true
        },
        taskID: {
            type: String,
            required: true
        },
        creaetdByName: {
            type: String,
            required: true
        },
        createByRegNo: {
            type: String,
            required: true
        },
    }
)

const Task = mongoose.model("Tasks", TaskModel);
module.exports = Task;