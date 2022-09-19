const express = require('express');

const router = express.Router();

const ActivityController = require('../app/controllers/activityController');

router.get('/', ActivityController.index);

router.get('/:_id', ActivityController.show);

router.post('/', ActivityController.store);

router.patch('/:_id', ActivityController.update);

router.delete('/:_id', ActivityController.delete);

module.exports = router;