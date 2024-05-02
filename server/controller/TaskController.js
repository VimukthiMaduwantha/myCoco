const TaskModel = require('../model/TaskModel');

//create task
const SaveTask = async (req, res) => {
    const {
        taskID,
        taskDate,
        taskDetails,
        creaetdByName,
        createByRegNo
    } = req.body;

    try {
        const TaskDetails = new TaskModel({
            taskID,
            taskDate,
            taskDetails,
            creaetdByName,
            createByRegNo
        })

        return await TaskDetails.save().then((value) => {
            return res.status(200).json({ ID: value._id });
        }).catch((err) => {
            return res.status(500).json({ err });
        })
    } catch (error) {
        res.status(400).send({ error: err.message });
    }
}

//get task by date
const GetTaskDetailsByDate = async (req, res) => {
    const date = req.params.date;
    const regNo = req.params.regNo;

    try {
        const TaskDetails = await TaskModel.find({ taskDate: date, createByRegNo: regNo });
        return res.status(200).send({ TaskDetails });
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

//get task details for admin
const GetAllTaskDetails = async (req, res) => {
    const date = req.params.date;

    try {
        const TaskDetails = await TaskModel.find({ taskDate: date });
        return res.status(200).send({ TaskDetails });
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

//get task details bu ID
const GetTaskDetailsByID = async (req, res) => {
    const id = req.params.updateID;

    try {
        const task = await TaskModel.find({ _id: id });
        return res.status(200).send({ task });
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

//update task detail
const UpdatetaskDetail = async (req, res) => {
    const {
        taskDetails
    } = req.body;

    const id = req.body.updateID;

    try {
        const UpdateDetails = {
            taskDetails
        }
        await TaskModel.findByIdAndUpdate(id, UpdateDetails).then(() => {
            res.status(200).send({ status: 'Success', data: UpdateDetails })
        }).catch((err) => {
            res.status(400).send({ status: err });
        })
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = {
    SaveTask,
    GetTaskDetailsByDate,
    GetTaskDetailsByID,
    UpdatetaskDetail,
    GetAllTaskDetails
}