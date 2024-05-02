const TaskController = require('../controller/TaskController');
const express = require('express');

const TaskRouter = express.Router();

//save task
TaskRouter.post('/createTask', TaskController.SaveTask);

//get task details by date
TaskRouter.get('/getAllTasks/:date/:regNo', TaskController.GetTaskDetailsByDate);

//get task details by ID
TaskRouter.get('/getTaskDetailsByID/:updateID', TaskController.GetTaskDetailsByID);

//get all task details for admin
TaskRouter.get('/getAllTaskDetails/:date', TaskController.GetAllTaskDetails);

//update tsk details
TaskRouter.put('/updateTask', TaskController.UpdatetaskDetail);

module.exports = TaskRouter;