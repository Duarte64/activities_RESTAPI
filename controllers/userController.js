const User = require('../models/User');

const { deleteActivitiesWithUser } = require('./activityController')

const getUsers = async (req, res) => {
    let users;
    const { _id } = req.params;
    try {
        if (_id) {
            users =  await User.findById(_id);
        } else {
            users = await User.find();
        }
    } catch (err) {
        res.json({ message: err });
    }
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(204).json([]);
    }
}

const createUser = async (req, res) => {
    const { name, birthdate, email, observations } = req.body;
    const user = new User({
        name,
        birthdate,
        email,
        observations
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
}

const updateUser = async (req, res) => {
    const { _id } = req.params;
    const updateInfos = { ...req.body };
    try {
        const updatedPatient = await User.updateOne(
            { _id },
            { $set: updateInfos }
        );
        res.status(200).json(updatedPatient);
    } catch (err) {
        res.json({ message: err });
    }
}

const deleteUser = async (req, res) => {
    const { _id } = req.params; 
    try {
        const removedPatient = await User.deleteOne({ _id });
        const removedActivities = await deleteActivitiesWithUser(_id);
        res.status(200).json(removedPatient);
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}