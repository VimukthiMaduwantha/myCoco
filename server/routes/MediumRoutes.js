const MediumController = require('../controller/MediumController');
const express = require('express');

const MediumRouter = express.Router();

//save medium
MediumRouter.post('/createMedium', MediumController.SaveMedium);

//get all medium details for user
MediumRouter.get('/getAllMediumForUser/:regNo', MediumController.GetAllMediumDetailsForUser);

//get all medium details
MediumRouter.get('/getAllMedium', MediumController.GetAllMediumDetails);

//get upadet details bu update ID
MediumRouter.get('/getUpdateDetails/:updateID', MediumController.GetUpdatePlantDatils);


//update medium detail
MediumRouter.put('/updateMedium', MediumController.UpdateMedium);

//get all medium detail by date
MediumRouter.get('/getAllMediumByDate/:date', MediumController.GetAllMediumByDate);


module.exports = MediumRouter;