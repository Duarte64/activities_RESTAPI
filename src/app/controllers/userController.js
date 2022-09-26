const User = require('../models/User');

class UserController {
    async index(req, res) {
        try {
            const users = await User.find();
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(204).json([]);
            }
        } catch (err) {
            res.status(400).json({ message: 'error' });
        }
    }

    async show(req, res) {
        const { _id } = req.params;
        try {
            const users =  await User.findById(_id);
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(204).json({});
            }
        } catch (err) {
            res.status(400).json({ message: 'error' });
        }
    }

    async store(req, res) {
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
            res.status(400).json({ message: 'error' });
        }
    }

    async update(req, res) {
        const { _id } = req.params;
        const updateInfos = { ...req.body };
        try {
            const updatedPatient = await User.updateOne(
                { _id },
                { $set: updateInfos }
            );
            res.status(200).json(updatedPatient);
        } catch (err) {
            res.status(400).json({ message: 'error' });
        }
    }

    // ver no mongoose se tem delete cascade
    async delete(req, res) {
        const { _id } = req.params; 
        try {
            const removedPatient = await User.deleteOne({ _id });
            res.status(200).json(removedPatient);
        } catch (err) {
            res.status(400).json({ message: 'error' });
        }
    }
}

module.exports = new UserController();