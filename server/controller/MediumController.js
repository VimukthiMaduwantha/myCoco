const MediumModel = require('../model/MediumModel');

//save medium
const SaveMedium = async (req, res) => {
    const {
        note,
        quantity,
        madeDate,
        creaetdByName,
        createByRegNo
    } = req.body;
    const image = req.files.files;

    try {
        const imageNameStore = new Date().getTime();
        await image.mv("Assets/MediumImages/" + `${imageNameStore}.jpg`, (err) => {
            console.log("An error occured in file ", err);
        })

        const MediumDetails = new MediumModel({
            note,
            quantity,
            madeDate,
            creaetdByName,
            createByRegNo,
            image: `${imageNameStore}.jpg`
        })

        return await MediumDetails.save().then((value) => {
            res.status(200).json({ ID: value._id })
        }).catch((err) => {
            res.status(500).json({ err })
        })
    } catch (err) {
        res.status(400).json({ error: err.meassage })
    }
}

//get all medium details fro user
const GetAllMediumDetailsForUser = async (req, res) => {
    const regNo = req.params.regNo;

    try {
        const MediumDetails = await MediumModel.find({ createByRegNo: regNo });
        return res.status(200).send({ MediumDetails });
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

//get all medium details
const GetAllMediumDetails = async (req, res) => {
    try {
        const MediumDetails = await MediumModel.find();
        return res.status(200).send({ MediumDetails });
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

//get detail by update ID
const GetUpdatePlantDatils = async (req, res) => {
    const id = req.params.updateID;
    try {
        const medium = await MediumModel.find({ _id: id });
        return res.status(200).send({ medium });
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

//update medium details
const UpdateMedium = async (req, res) => {
    const {
        quantity,
        madeDate,
        note
    } = req.body;

    const id = req.body.updateID;

    try {
        const UpdateDetails = {
            quantity,
            madeDate,
            note
        }
        await MediumModel.findByIdAndUpdate(id, UpdateDetails).then(() => {
            res.status(200).send({ status: 'Success', data: UpdateDetails })
        }).catch((err) => {
            res.status(400).send({ status: err });
        })
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

//get medium detail by date
const GetAllMediumByDate = async (req, res) => {
    const date = req.params.date;
    try {
        const medium = await MediumModel.find({ madeDate: date });
        return res.status(200).send({ medium });
    } catch (error) {
        return res.status(500).send("Server error")
    }
}

module.exports = {
    SaveMedium,
    GetAllMediumDetails,
    GetUpdatePlantDatils,
    UpdateMedium,
    GetAllMediumByDate,
    GetAllMediumDetailsForUser
}
