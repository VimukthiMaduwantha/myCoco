const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        nic: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        cPassowrd: {
            type: String,
            required: true
        },
        regNo: {
            type: String,
            required: true
        },
        designation: {
            type: Number,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now
        }

    }
)

const User = mongoose.model("Users", UserModel);
module.exports = User;