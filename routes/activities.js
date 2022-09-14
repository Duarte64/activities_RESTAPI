const express = require('express');
const Activity = require('../models/activity');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find().populate("user");
        if (activities) {
            res.status(200).json(activities);
        } else {
            res.status(204).json([]);
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const activity = await Activity.findById(_id).populate("user");
        if (activity) {
            res.status(200).json(activity);
        } else {
            res.status(204).json({});
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
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
});

router.patch('/:_id', async (req, res) => {
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
});

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedActivity = await Activity.deleteOne({ _id });
        res.status(200).json(deletedActivity);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;