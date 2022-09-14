const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const patients = await User.find();
        if (patients) {
            res.status(200).json(patients);
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
        const patient = await User.findById(_id);
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(204).json({});
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
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
});

router.patch('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const updatedPatient = await User.updateOne(
            { _id },
            { $set: {...req.body} }
        );
        res.status(200).json(updatedPatient);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params; 
    try {
        const removedPatient = await User.deleteOne({ _id });
        res.status(200).json(removedPatient);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;