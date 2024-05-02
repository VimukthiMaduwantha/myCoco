const PlantController = require('../controller/PlantController');
const express = require('express');
const { protect } = require('../middleware/userAuth');

const PlantRouter = express.Router();

//save plant details
PlantRouter.post('/createPlant', PlantController.SavePlantDetails);

//get all plant details
// PlantRouter.get('/getAllPlantDetails', protect, PlantController.GetAllPlantDetails);
PlantRouter.get('/getAllPlantDetails', PlantController.GetAllPlantDetails);

//get all plant details bu user
// PlantRouter.get('/getAllPlantDetails', protect, PlantController.GetAllPlantDetails);
PlantRouter.get('/getAllPlantDetailsByUser/:regNo', PlantController.getAllPlantDetailsByUser);

//get update plant details
PlantRouter.get('/getPlantUpdateDetails/:updateID', PlantController.GetUpdatePlantDatils);

//update plant details
PlantRouter.put('/updatePlant', PlantController.UpdatePlantDetails);




module.exports = PlantRouter;