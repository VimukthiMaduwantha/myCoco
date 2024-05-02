const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
require("dotenv").config();
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 8000;
app.use("/Assets", express.static(__dirname + "/Assets"));

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
const url = process.env.MONGODB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB Connected!!");
});

app.listen(port, () => {
    console.log("PORT connected on " + port);
})

//User routes
const user = require('./routes/UserRoutes');
app.use('/User', user);

//Task routes
const task = require('./routes/TaskRoutes');
app.use('/Task', task)

//Plant routes
const plant = require('./routes/PlantRoutes');
app.use('/Plant', plant);

//Medium routes
const medium = require('./routes/MediumRoutes');
app.use('/Medium', medium);




// user name :maduwanthavimukthi pw: joOzKlQGIrSyWqaC
// user name :maduwanthavimukthi pwnew: T3vzNjWCvv21YP5Q