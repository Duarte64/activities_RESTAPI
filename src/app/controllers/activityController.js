const Activity = require('../models/Activity');

class ActivityController {
    async index(req, res) {
        // Listar todas atividades
        try {
            const activities = await Activity.find().populate("user");
            if (activities) {
                res.status(200).json(activities);
            } else {
                res.status(204).json({});
            }
        } catch (err) {
            res.status(400).json({ message: 'error' });
        }
    }

    async show(req, res) {
        // Listar uma atividade
        const { _id } = req.params;
        try {
            const activity = await Activity.findById(_id);
            if (activity) {
                res.status(200).json(activity);
            } else {
                res.status(204).json({});
            }
        } catch (error) {
            res.status(500).json({ message: 'error' });
        }
    }

    async store(req, res) {
        // Criar uma atividade
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
            res.status(400).json({ message: 'error' });
        }
    }

    async update(req, res) {
        // Atualizar uma atividade
        const { _id } = req.params;
        try {
            const updatedActivity = await Activity.updateOne(
                {_id}, 
                {$set: { ...req.body } }
            );
            res.status(200).json(updatedActivity);
        } catch (err) {
            res.status(400).json({ message: 'error' });
        }
    }

    async delete(req, res) {
        // Deletar uma atividade
        const { _id } = req.params;
        try {
            const deletedActivity = await Activity.deleteOne({ _id });
            res.status(200).json(deletedActivity);
        } catch (err) {
            res.status(400).json({ message: 'error' });
        }
    }

    async deleteActivitiesWithUser(user) {
        try {
            const deletedsActivity = await Activity.deleteMany({ user });
            return deletedsActivity;
        } catch (err) {
            return [];
        }
    } 
}

// Singleton
module.exports = new ActivityController();