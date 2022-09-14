const Activity = require('../models/Activity');

const getActivities = async (req, res) => {
    let activities;
    const { _id } = req.params;
    try {
        if (_id) {
            activities = await Activity.findById(_id);
        } else {
            activities = await Activity.find().populate("user");
        }
    } catch (err) {
        res.json({ message: err });
    }
    if (activities) {
        res.status(200).json(activities);
    } else {
        if (_id) {
            res.status(204).json({});
        } else {
            res.status(204).json([]);
        }
    }
}

const createActivity = async (req, res) => {
    const { user, title, duration, date } = req.body;
    const activity = new Activity({
        user,
        title,
        duration,
        date
    });
    try {
        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (err) {
        res.json({ message: err });
    }
}

const updateActivity = async (req, res) => {
    const { _id } = req.params;
    try {
        const updatedActivity = await Activity.updateOne(
            {_id}, 
            {$set: { ...req.body } }
        );
        res.status(200).json(updatedActivity);
    } catch (err) {
        res.json({message: err.message})
    }
}

const deleteActivity = async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedActivity = await Activity.deleteOne({ _id });
        res.status(200).json(deletedActivity);
    } catch (err) {
        res.json({ message: err });
    }
}

const deleteActivitiesWithUser = async (user) => {
    try {
        const deletedsActivity = await Activity.deleteMany({ user });
        return deletedsActivity;
    } catch (err) {
        return [];
    }
} 

module.exports = {
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    deleteActivitiesWithUser
}