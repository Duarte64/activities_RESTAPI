const express = require('express');

const router = express.Router();

const { 
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/activityController');

router.get('/', (req, res) => {
    getActivities(req, res);
});

router.get('/:_id', async (req, res) => {
    getActivities(req, res);
});

router.post('/', (req, res) => {
    createActivity(req, res);
});

router.patch('/:_id', (req, res) => {
    updateActivity(req, res);
    
});

router.delete('/:_id', async (req, res) => {
    deleteActivity(req, res);
});

module.exports = router;