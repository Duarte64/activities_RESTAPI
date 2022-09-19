const express = require('express');

const router = express.Router();

const UserController = require('../app/controllers/userController');

router.get('/', UserController.index);

router.get('/:_id', UserController.show);

router.post('/', UserController.store);

router.patch('/:_id', UserController.update);

router.delete('/:_id', UserController.delete);

module.exports = router;