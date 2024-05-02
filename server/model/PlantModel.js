const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlantModel = new Schema(
    {
        plantID: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        plantDate: {
            type: String,
            required: true
        },
        subCultureDate: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now
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

const Plant = mongoose.model("Plants", PlantModel);
module.exports = Plant;