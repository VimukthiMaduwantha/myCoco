const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediumModel = new Schema(
    {
        note: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        madeDate: {
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

const Medium = mongoose.model("Mediums", MediumModel);
module.exports = Medium;