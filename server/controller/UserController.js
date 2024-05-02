const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

//save user
const saveUser = async (req, res) => {
    const {
        name,
        address,
        nic,
        mobile,
        email,
        password,
        cPassowrd,
        regNo,
        designation
    } = req.body;


    try {
        const salt = await bycrypt.genSalt(10);
        const hashedPass = await bycrypt.hash(password, salt);

        const userDetails = new UserModel({
            name,
            address,
            nic,
            mobile,
            email,
            password: hashedPass,
            cPassowrd,
            regNo,
            designation
        })

        return await userDetails.save().then((value) => {
            return res.status(200).json({ ID: value._id });
        }).catch((err) => {
            return res.status(500).json({ err });
        })
    } catch (err) {
        return res.status(400).json({ error: err.meassage })
    }

}

//login user
const loginUser = async (req, res) => {

    const { userName, password } = req.body;
    const findUser = await UserModel.findOne({ email: userName })
    if (findUser && (await bycrypt.compare(password, findUser.password))) {
        res.status(200).send({ token: genarateToken(findUser._id), user: findUser })
    } else {
        res.send({ user: null, status: "UserName or Password incorrect" })
    }
}

//Get all users
const GetAllUsers = async (req, res) => {
    try {
        const UserDetails = await UserModel.find();
        return res.status(200).json({ UserDetails });
    } catch (err) {
        return res.status(500).send("Server Error");
    }
}

//get user By user ID
const GetUsewrByUserID = async (req, res) => {
    try {
        const id = req.params.updateID;
        const UserDetails = await UserModel.find({ _id: id });
        res.status(200).send({ UserDetails });
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

//Update user detaills
const UpdateUserDetails = async (req, res) => {
    const UpdateID = req.body.updateID;
    const {
        name,
        address,
        nic,
        mobile
    } = req.body;

    try {
        const UpdateDetails = {
            name,
            address,
            nic,
            mobile
        }
        await UserModel.findByIdAndUpdate(UpdateID, UpdateDetails).then(() => {
            res.status(200).send({ status: 'Success', data: UpdateDetails })
        }).catch((err) => {
            res.status(400).send({ status: err });
        })
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

// genarate JWT
const genarateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    )
}

module.exports = {
    saveUser,
    GetAllUsers,
    GetUsewrByUserID,
    UpdateUserDetails,
    loginUser
}